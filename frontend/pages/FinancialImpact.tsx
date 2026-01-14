import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Card from '../components/Card';
import { useData } from '../contexts/DataContext';
import { NavLink } from 'react-router-dom';

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

const FinancialImpact: React.FC = () => {
    const { tariffData, companyData } = useData();

    if (!tariffData || !companyData) {
        return <div>Carregando dados...</div>;
    }

    const dataWithDiscrepancy = tariffData.map(item => ({
        ...item,
        discrepancy: item.observedTariff > 0 ? (((item.calculatedRegulatoryTariff / item.observedTariff) - 1) * 100).toFixed(1) + '%' : 'N/A'
    }));

    const districtAnalysisData = useMemo(() => {
        const byDistrict: { [key: string]: { totalDifference: number; companyCount: number } } = {};
        companyData.forEach(company => {
            const district = company.distrito || 'Não especificado';
            if (!byDistrict[district]) {
                byDistrict[district] = { totalDifference: 0, companyCount: 0 };
            }
            byDistrict[district].totalDifference += company.totalDifference;
            byDistrict[district].companyCount += 1;
        });

        return Object.entries(byDistrict)
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.totalDifference - a.totalDifference);
    }, [companyData]);

    const formatCurrency = (value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const formatBRL = (value: number) => `R$ ${value.toFixed(2)}/m³`;

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-800">Impacto Financeiro</h1>
                <p className="text-lg text-slate-600 mt-1">Comparação entre tarifas pagas e tarifas regulatórias, por ano e por distrito.</p>
            </header>

            <Card>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Discrepância Tarifária Anual</h2>
                 <p className="text-sm text-slate-500 mb-6">A linha vermelha, representando a tarifa paga, esteve consistentemente acima da linha azul, a tarifa regulatória correta.</p>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={tariffData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `R$ ${value.toFixed(0)}`} />
                        <Tooltip formatter={(value: number) => [formatBRL(value), '']} />
                        <Legend />
                        <Line type="monotone" dataKey="observedTariff" name="Tarifa Média Paga" stroke="#ef4444" strokeWidth={2} />
                        <Line type="monotone" dataKey="calculatedRegulatoryTariff" name="Tarifa Regulatória Correta" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
                 <div className="overflow-x-auto mt-6">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ano</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tarifa Paga</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tarifa Regulatória</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Discrepância</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Volume (M m³)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {dataWithDiscrepancy.map((item) => (
                                <tr key={item.year}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.year}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatBRL(item.observedTariff)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{formatBRL(item.calculatedRegulatoryTariff)}</td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${item.discrepancy.startsWith('-') ? 'text-green-500' : 'text-red-500'}`}>{item.discrepancy}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.billedVolume.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Card>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Impacto Acumulado por Distrito</h2>
                <p className="text-sm text-slate-500 mb-6">Comparativo da diferença total (Valor Cobrado - Valor Regulatório) acumulada por distrito.</p>
                 <ResponsiveContainer width="100%" height={400}>
                    <BarChart layout="vertical" data={districtAnalysisData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`} />
                        <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(value: number) => [formatCurrency(value), 'Diferença Total']} />
                        <Legend />
                        <Bar dataKey="totalDifference" name="Diferença Total" fill="#ef4444" />
                    </BarChart>
                </ResponsiveContainer>
                 <div className="overflow-x-auto mt-6">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Distrito</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Diferença Total</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nº de Empresas</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {districtAnalysisData.map((item) => (
                                <tr key={item.name}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-500">{formatCurrency(item.totalDifference)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.companyCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="pt-8 text-center">
                <NavLink
                    to="/financial-indicators"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                    Avançar para Indicadores Financeiros <ArrowRightIcon className="w-5 h-5" />
                </NavLink>
            </div>
        </div>
    );
};

export default FinancialImpact;
