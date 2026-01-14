import React, { useState, useCallback } from 'react';
import { useData } from '../contexts/DataContext';

const DataUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const { loadData, isLoading } = useData();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleSubmit = async () => {
        if (file) {
            try {
                await loadData(file);
            } catch (error) {
                console.error("Falha ao carregar dados:", error);
                // Error is already handled with an alert in loadData context
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 font-sans">
            <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-800">Análise de Faturas</h1>
                    <p className="mt-2 text-slate-600">Para começar, carregue o arquivo .csv com os dados de faturamento.</p>
                </div>

                <div
                    className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-200 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400'}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => document.getElementById('file-upload')?.click()}
                >
                    <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                    <div className="flex justify-center mb-4">
                        <svg className="w-12 h-12 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </div>
                    <p className="font-semibold text-slate-700">Arraste e solte o arquivo aqui</p>
                    <p className="text-sm text-slate-500">ou clique para selecionar</p>
                    {file && <p className="mt-4 text-sm font-medium text-green-600 bg-green-50 p-2 rounded-md">Arquivo selecionado: {file.name}</p>}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={!file || isLoading}
                    className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-200"
                >
                    {isLoading ? 'Processando...' : 'Analisar Arquivo'}
                </button>
            </div>
        </div>
    );
};

export default DataUploader;