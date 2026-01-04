import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [message, setMessage] = useState('');

    const handleConnectGoogle = () => {
        window.location.href = '/google/auth';
    };

    const handleEraseEmails = async () => {
        try {
            const response = await axios.post('/google/erase');
            setMessage(response.data.message);
        } catch (error) {
            setMessage('An error occurred while trying to erase emails.');
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleConnectGoogle}>Connect Google Account</button>
            <button onClick={handleEraseEmails}>Erase Old Emails</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Dashboard;
