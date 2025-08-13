import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ContractForm from '../components/ContractForm';

const ContractListPage = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchContracts = useCallback(() => {
        setLoading(true);
        axios.get('/api/contracts/')
            .then(response => {
                setContracts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the contracts!", error);
                setError("Não foi possível carregar os contratos.");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchContracts();
    }, [fetchContracts]);

    if (loading && contracts.length === 0) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div>
            <h1>Gestão de Contratos</h1>
            <ContractForm onSuccess={fetchContracts} />
            <hr style={{ margin: '2rem 0' }} />
            <h2>Lista de Contratos</h2>
            {contracts.length === 0 && !loading ? (
                <p>Nenhum contrato cadastrado ainda.</p>
            ) : (
                <ul>
                    {contracts.map(contract => (
                        <li key={contract.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                            <strong>{contract.title}</strong>
                            <br />
                            <small>Cliente: {contract.client ? contract.client.name : 'N/A'}</small>
                            <br />
                            <small>Valor: R$ {contract.value}</small>
                            <br/>
                            <small>Vigência: {contract.start_date} até {contract.end_date || 'indefinido'}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ContractListPage;
