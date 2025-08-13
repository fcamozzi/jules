import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ClientForm from '../components/ClientForm'; // Importar o formulário

const ClientListPage = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useCallback para evitar recriar a função em cada renderização
    const fetchClients = useCallback(() => {
        setLoading(true);
        axios.get('/api/clients/')
            .then(response => {
                setClients(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the clients!", error);
                setError("Não foi possível carregar os clientes. O backend está rodando?");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    if (loading && clients.length === 0) { // Mostra o carregamento inicial
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div>
            <h1>Gestão de Clientes</h1>

            {/* Formulário para adicionar novos clientes */}
            <ClientForm onSuccess={fetchClients} />

            <hr style={{ margin: '2rem 0' }} />

            <h2>Lista de Clientes</h2>
            {clients.length === 0 && !loading ? (
                <p>Nenhum cliente cadastrado ainda.</p>
            ) : (
                <ul>
                    {clients.map(client => (
                        <li key={client.id}>
                            <strong>{client.name}</strong> ({client.email})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ClientListPage;
