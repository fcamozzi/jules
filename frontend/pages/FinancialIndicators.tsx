import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../components/Card';
import { useData } from '../contexts/DataContext';
import { NavLink } from 'react-router-dom';

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);


const FinancialIndicators: React.FC = () => {
    const { tariffData } = useData();

    if (!tariffData) {
        return <div>Carregando dados...</div>;
    }

    const financialData = tariffData.map(d => {
        const collectedRevenue = d.observedTariff * d.billedVolume;
        const regulatoryRevenue = d.calculatedRegulatoryTariff * d.billedVolume;
        const realCostRevenue = d.calculatedRealTariff * d.billedVolume;

        return {
            year: d.year,
            'Receita Coletada': parseFloat(collectedRevenue.toFixed(2)),
            'Receita Regulatória': parseFloat(regulatoryRevenue.toFixed(2)),
            'Receita Custo Real': parseFloat(realCostRevenue.toFixed(2)),
            'Déficit (vs Custo Real)': parseFloat((collectedRevenue - realCostRevenue).toFixed(2)),
            'Excedente (vs Regulatório)': parseFloat((collectedRevenue - regulatoryRevenue).toFixed(2)),
        };
    });

    const formatMillion = (value: number) => `R$ ${value.toFixed(2)}M`;

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-800">Indicadores Financeiros</h1>
                <p className="text-lg text-slate-600 mt-1">Análise dos indicadores financeiros chave derivados da defasagem tarifária.</p>
            </header>

            <Card>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Análise de Gaps de Receita (Milhões R$)</h2>
                <p className="text-sm text-slate-500 mb-6">Comparativo anual entre a receita efetivamente coletada, a receita que seria obtida com a tarifa regulatória e a receita necessária para cobrir os custos reais.</p>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={financialData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `R$ ${value}M`} />
                        <Tooltip formatter={(value: number, name) => [formatMillion(value), name]}/>
                        <Legend />
                        <Bar dataKey="Receita Coletada" fill="#3b82f6" />
                        <Bar dataKey="Receita Regulatória" fill="#22c55e" />
                        <Bar dataKey="Receita Custo Real" fill="#ef4444" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

             <Card>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Déficit e Excedente Financeiro (Milhões R$)</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ano</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Déficit vs Custo Real</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Excedente vs Regulatório</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {financialData.map((item) => (
                                <tr key={item.year}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.year}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-500">{formatMillion(item['Déficit (vs Custo Real)'])}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-500">{formatMillion(item['Excedente (vs Regulatório)'])}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     <p className="text-xs text-slate-500 mt-4">
                        <strong>Déficit vs Custo Real:</strong> Mostra o quanto a receita coletada ficou abaixo do necessário para cobrir todos os custos reais (prejuízo operacional).
                        <br />
                        <strong>Excedente vs Regulatório:</strong> Mostra o quanto a receita coletada ficou acima do que seria permitido pela tarifa regulatória (ônus ao consumidor).
                    </p>
                </div>
            </Card>

            <div className="pt-8 text-center">
                <NavLink
                    to="/individual-analysis"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                    Avançar para Análise Individualizada <ArrowRightIcon className="w-5 h-5" />
                </NavLink>
            </div>
        </div>
    );
};

export default FinancialIndicators;
