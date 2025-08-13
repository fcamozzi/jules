import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContractForm = ({ onSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [clientId, setClientId] = useState('');

    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Carrega a lista de clientes para o dropdown
        axios.get('/api/clients/')
            .then(response => {
                setClients(response.data);
            })
            .catch(error => {
                console.error("Failed to load clients for the form", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        if (!clientId) {
            setError("Por favor, selecione um cliente.");
            return;
        }

        const contractData = {
            title, description, value,
            start_date: startDate,
            end_date: endDate || null, // Permite final de contrato nulo
            client_id: clientId
        };

        axios.post('/api/contracts/', contractData)
            .then(() => {
                // Limpa o formulário
                setTitle('');
                setDescription('');
                setValue('');
                setStartDate('');
                setEndDate('');
                setClientId('');

                if (onSuccess) {
                    onSuccess();
                }
            })
            .catch(error => {
                console.error("There was an error creating the contract!", error);
                setError("Não foi possível criar o contrato. Verifique os dados.");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Adicionar Novo Contrato</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <label>Cliente:</label>
                <select value={clientId} onChange={e => setClientId(e.target.value)} required>
                    <option value="">Selecione um cliente</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Título do Contrato:</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>

            <div>
                <label>Valor:</label>
                <input type="number" step="0.01" value={value} onChange={e => setValue(e.target.value)} required />
            </div>

            <div>
                <label>Data de Início:</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            </div>

            <div>
                <label>Data de Fim (opcional):</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>

            <div>
                <label>Descrição:</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} required />
            </div>

            <button type="submit">Salvar Contrato</button>
        </form>
    );
};

export default ContractForm;
