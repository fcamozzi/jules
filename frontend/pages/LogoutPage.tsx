import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const LogoutPage: React.FC = () => {
    const { logout } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            logout();
        }, 2500); // Wait 2.5 seconds

        return () => clearTimeout(timer);
    }, [logout]);

    return (
        <div className="flex items-center justify-center h-full bg-slate-50">
            <div className="text-center p-8">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-slate-800">Sessão encerrada com sucesso!</h1>
                <p className="text-lg text-slate-600 mt-2">Obrigado por utilizar o Projeto Águas Claras.</p>
                <p className="text-sm text-slate-500 mt-8">Você será redirecionado para a tela de login em breve...</p>
            </div>
        </div>
    );
};

export default LogoutPage;