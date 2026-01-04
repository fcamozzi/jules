from flask import Flask, request, jsonify, redirect, url_for, session
from models import db, User, ConnectedAccount
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from google_auth_oauthlib.flow import Flow
import os
from agent import delete_old_emails
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

db.init_app(app)
bcrypt = Bcrypt(app)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

with app.app_context():
    db.create_all()

@app.route('/status')
def status():
    return {'status': 'ok'}

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        return jsonify({'message': 'Logged in successfully'}), 200

    return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

def _get_google_flow():
    """Helper function to create a Google OAuth flow."""
    client_config = {
        "web": {
            "client_id": os.getenv("GOOGLE_CLIENT_ID"),
            "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "redirect_uris": [url_for('google_callback', _external=True)],
        }
    }
    return Flow.from_client_config(
        client_config,
        scopes=['https://www.googleapis.com/auth/gmail.modify'],
        redirect_uri=url_for('google_callback', _external=True)
    )

@app.route('/google/auth')
@login_required
def google_auth():
    flow = _get_google_flow()
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true'
    )
    session['state'] = state
    return redirect(authorization_url)

@app.route('/google/callback')
@login_required
def google_callback():
    state = session['state']
    flow = _get_google_flow()
    flow.fetch_token(authorization_response=request.url)

    credentials = flow.credentials
    # Check if account already exists
    account = ConnectedAccount.query.filter_by(user_id=current_user.id, provider='google').first()
    if account:
        account.token = credentials.to_json()
    else:
        account = ConnectedAccount(user_id=current_user.id, provider='google', token=credentials.to_json())
        db.session.add(account)
    db.session.commit()

    frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
    return redirect(f"{frontend_url}/dashboard")

@app.route('/google/erase', methods=['POST'])
@login_required
def google_erase():
    # In a real app, this would be a background job
    result = delete_old_emails(current_user.id)
    if result['status'] == 'success':
        return jsonify({'message': result['message']}), 200
    else:
        return jsonify({'error': result['message']}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5001)
