import json
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from models import ConnectedAccount
from datetime import datetime, timedelta

def delete_old_emails(user_id):
    """
    Deletes emails older than 30 days from the user's Gmail account.
    Returns a dictionary with status and message.
    """
    account = ConnectedAccount.query.filter_by(user_id=user_id, provider='google').first()
    if not account:
        return {'status': 'error', 'message': f"No Google account connected for user {user_id}"}

    try:
        creds = Credentials.from_authorized_user_info(info=json.loads(account.token))
        service = build('gmail', 'v1', credentials=creds)

        # Search for emails older than 30 days
        query = f"before:{(datetime.now() - timedelta(days=30)).strftime('%Y/%m/%d')}"
        results = service.users().messages().list(userId='me', q=query).execute()
        messages = results.get('messages', [])

        if not messages:
            return {'status': 'success', 'message': 'No old emails found to delete.'}

        # Batch delete the emails
        message_ids = [message['id'] for message in messages]
        service.users().messages().batchDelete(
            userId='me',
            body={'ids': message_ids}
        ).execute()

        return {'status': 'success', 'message': f"Deleted {len(message_ids)} old emails."}
    except Exception as e:
        return {'status': 'error', 'message': f"An error occurred: {e}"}
