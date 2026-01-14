import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../components/Card';
import { useData } from '../contexts/DataContext';
import { NavLink } from 'react-router-dom';

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

const HistoricalAnalysis: React.FC = () => {
    const { monthlyEvolution } = useData();

    if (!monthlyEvolution) {
        return <div>Carregando dados...</div>;
    }

    const formatCurrency = (value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

    const formatXAxis = (date: Date) => {
        if (!(date instanceof Date) || isNaN(date.getTime())) return '';
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${month}/${year}`;
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const overcharge = payload.find((p: any) => p.dataKey === 'Cobrado a Maior');
            const due = payload.find((p: any) => p.dataKey === 'Devido (Regulatório)');

            return (
                <div className="bg-white/80 backdrop-blur-sm p-3 border border-slate-200 rounded-lg shadow-lg">
                    <p className="font-bold text-slate-800">{formatXAxis(label)}</p>
                    <p className="text-sm text-slate-600">Devido (Acum.): <span className="font-semibold">{formatCurrency(due.value)}</span></p>
                    <p className="text-sm text-red-600">Cobrado a Maior (Acum.): <span className="font-semibold">{formatCurrency(overcharge.value)}</span></p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-800">Análise Histórica</h1>
                <p className="text-lg text-slate-600 mt-1">Evolução do impacto financeiro mês a mês, demonstrando o prejuízo contínuo.</p>
            </header>

            <Card>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Evolução do Valor Cobrado a Maior (Acumulado)</h2>
                <p className="text-sm text-slate-500 mb-6">O gráfico ilustra o fluxo financeiro. A área vermelha representa o valor total pago a mais, acumulado mês a mês, demonstrando o capital de giro indevidamente direcionado à concessionária.</p>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart
                        data={monthlyEvolution}
                        margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                    >
                         <defs>
                            <linearGradient id="colorOvercharge" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="colorDue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={formatXAxis}
                            angle={-45}
                            textAnchor="end"
                            height={70}
                            interval="preserveStartEnd"
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis tickFormatter={(value) => `R$${(value / 1000000).toFixed(0)}M`} tick={{ fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" height={36} />
                        <Area type="monotone" dataKey="Cobrado a Maior" stroke="#ef4444" fill="url(#colorOvercharge)" />
                        <Area type="monotone" dataKey="Devido (Regulatório)" stroke="#3b82f6" fill="url(#colorDue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>

            <div className="pt-8 text-center">
                <NavLink
                    to="/financial-impact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                    Avançar para Impacto Financeiro <ArrowRightIcon className="w-5 h-5" />
                </NavLink>
            </div>
        </div>
    );
};

export default HistoricalAnalysis;