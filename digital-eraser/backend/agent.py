from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from models import ConnectedAccount
from datetime import datetime, timedelta

def delete_old_emails(user_id):
    """
    Deletes emails older than 30 days from the user's Gmail account.
    """
    account = ConnectedAccount.query.filter_by(user_id=user_id, provider='google').first()
    if not account:
        print(f"No Google account connected for user {user_id}")
        return False

    creds = Credentials.from_authorized_user_info(info=eval(account.token))
    service = build('gmail', 'v1', credentials=creds)

    # Search for emails older than 30 days
    query = f"before:{(datetime.now() - timedelta(days=30)).strftime('%Y/%m/%d')}"
    results = service.users().messages().list(userId='me', q=query).execute()
    messages = results.get('messages', [])

    if not messages:
        print("No old emails found to delete.")
        return True

    # Batch delete the emails
    message_ids = [message['id'] for message in messages]
    service.users().messages().batchDelete(
        userId='me',
        body={'ids': message_ids}
    ).execute()

    print(f"Deleted {len(message_ids)} old emails for user {user_id}.")
    return True
