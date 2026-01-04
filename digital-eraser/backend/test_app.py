import pytest
from app import app as flask_app, db, User
from unittest.mock import patch

@pytest.fixture
def client():
    flask_app.config['TESTING'] = True
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    flask_app.config['SECRET_KEY'] = 'test-secret-key'
    with flask_app.test_client() as client:
        with flask_app.app_context():
            db.create_all()
        yield client
        with flask_app.app_context():
            db.drop_all()

def test_status(client):
    """Test the status endpoint."""
    rv = client.get('/status')
    assert rv.status_code == 200
    assert rv.get_json() == {'status': 'ok'}

def test_register(client):
    """Test user registration."""
    rv = client.post('/register', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    assert rv.status_code == 201
    assert rv.get_json() == {'message': 'User registered successfully'}

def test_register_duplicate_user(client):
    """Test registering a duplicate user."""
    client.post('/register', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    rv = client.post('/register', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    assert rv.status_code == 400
    assert rv.get_json() == {'error': 'Username already exists'}

def test_login(client):
    """Test user login."""
    client.post('/register', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    rv = client.post('/login', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    assert rv.status_code == 200
    assert rv.get_json() == {'message': 'Logged in successfully'}

def test_login_invalid_credentials(client):
    """Test login with invalid credentials."""
    rv = client.post('/login', json={
        'username': 'wronguser',
        'password': 'wrongpassword'
    })
    assert rv.status_code == 401
    assert rv.get_json() == {'error': 'Invalid username or password'}

@patch('app.delete_old_emails')
def test_google_erase(mock_delete_old_emails, client):
    """Test the /google/erase endpoint."""
    # Register and log in a user
    client.post('/register', json={'username': 'testuser', 'password': 'testpassword'})
    client.post('/login', json={'username': 'testuser', 'password': 'testpassword'})

    # Mock the delete_old_emails function to return True
    mock_delete_old_emails.return_value = True

    # Call the /google/erase endpoint
    rv = client.post('/google/erase')

    # Assert that the endpoint returns the correct message
    assert rv.status_code == 200
    assert rv.get_json() == {'message': 'Email deletion process started.'}

    # Assert that the delete_old_emails function was called once with the correct user ID
    mock_delete_old_emails.assert_called_once_with(1)
