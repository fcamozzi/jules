
import React from 'react';
import Card from '../components/Card';
import { useData } from '../contexts/DataContext';
import { NavLink } from 'react-router-dom';

const KPICard: React.FC<{ title: string; value: string; description?: string; colorClass?: string; valueSize?: string; titleSize?: string }> = ({ title, value, description, colorClass = 'text-slate-800', valueSize = 'text-4xl', titleSize = 'text-base' }) => (
    <div className="bg-slate-800 rounded-xl shadow-lg flex flex-col text-center items-center justify-center p-6 h-full">
        <h3 className={`${titleSize} font-medium text-slate-400`}>{title}</h3>
        <p className={`${valueSize} font-bold my-2 ${colorClass}`}>{value}</p>
        {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
    </div>
);


const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);


const formatCurrency = (value: number | undefined) => {
    if (typeof value !== 'number') return 'R$ 0,00';
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const Overview: React.FC = () => {
    const { kpiData } = useData();

    return (
        <div className="space-y-6">
            <header className="text-center">
                <h1 className="text-3xl font-bold text-slate-800">O Cenário do Problema</h1>
                <p className="text-lg text-slate-600 mt-1">Visão geral do impacto financeiro total da cobrança indevida no período de 2021-2024.</p>
            </header>

            <div className="bg-slate-800 text-white rounded-xl shadow-lg p-6 border-t-4 border-red-500">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-slate-400">Valor Cobrado em Excesso</h3>
                    <p className="text-5xl font-bold my-2 text-red-400">{formatCurrency(kpiData?.totalOvercharge)}</p>
                    <p className="text-sm text-slate-400">Diferença entre faturamento real e o teto regulatório.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard
                    title="Total Faturado"
                    value={formatCurrency(kpiData?.totalBilled)}
                    colorClass="text-blue-400"
                    valueSize="text-3xl"
                    titleSize="text-sm"
                />
                <KPICard
                    title="Total Devido (Regulatório)"
                    value={formatCurrency(kpiData?.totalRegulatory)}
                    colorClass="text-green-400"
                    valueSize="text-3xl"
                    titleSize="text-sm"
                />
                <KPICard
                    title="Empresas Impactadas"
                    value={String(kpiData?.companyCount ?? 0)}
                    description="Universo de empresas em nossa base de análise."
                    colorClass="text-yellow-400"
                    valueSize="text-5xl"
                    titleSize="text-sm"
                />
            </div>

            <div className="pt-8 text-center">
                <NavLink
                    to="/historical-analysis"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                    Avançar para Análise Histórica <ArrowRightIcon className="w-5 h-5" />
                </NavLink>
            </div>

        </div>
    );
};

export default Overview;