import React, { useState } from 'react';
import axios from 'axios';

const ClientForm = ({ onSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        const clientData = { name, email, phone, address };

        axios.post('/api/clients/', clientData)
            .then(response => {
                // Limpa o formulário
                setName('');
                setEmail('');
                setPhone('');
                setAddress('');

                // Notifica o componente pai sobre o sucesso
                if (onSuccess) {
                    onSuccess();
                }
            })
            .catch(error => {
                console.error("There was an error creating the client!", error);
                setError("Não foi possível criar o cliente. Verifique os dados.");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Adicionar Novo Cliente</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Nome:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Telefone:</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div>
                <label>Endereço:</label>
                <textarea value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <button type="submit">Salvar Cliente</button>
        </form>
    );
};

export default ClientForm;
