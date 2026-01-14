import React from 'react';
import { AnnualCompanySummary } from '../types';

interface RestitutionCalculationTableProps {
    data: AnnualCompanySummary[];
}

const formatCurrency = (value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const formatVolume = (value: number) => `${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} m³`;
const formatTariff = (value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / m³`;


const RestitutionCalculationTable: React.FC<RestitutionCalculationTableProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-slate-500">Não há dados suficientes para gerar a memória de cálculo.</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-300 text-sm">
                <thead className="bg-slate-100">
                    <tr>
                        <th scope="col" className="px-3 py-3 text-left font-semibold text-slate-800">Ano</th>
                        <th scope="col" className="px-3 py-3 text-left font-semibold text-slate-800">Volume Faturado</th>
                        <th scope="col" className="px-3 py-3 text-left font-semibold text-slate-800">Tarifa Paga Média</th>
                        <th scope="col" className="px-3 py-3 text-left font-semibold text-slate-800">Tarifa Devida</th>
                        <th scope="col" className="px-3 py-3 text-left font-semibold text-slate-800">Total Pago</th>
                        <th scope="col" className="px-3 py-3 text-left font-semibold text-slate-800">Total Devido</th>
                        <th scope="col" className="px-3 py-3 text-left font-semibold text-slate-800 text-red-600">Restituição</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {data.map((item) => (
                        <tr key={item.year}>
                            <td className="whitespace-nowrap px-3 py-3 font-medium text-slate-900">{item.year}</td>
                            <td className="whitespace-nowrap px-3 py-3 text-slate-600">{formatVolume(item.totalVolume)}</td>
                            <td className="whitespace-nowrap px-3 py-3 text-slate-600">{formatTariff(item.avgObservedTariff)}</td>
                            <td className="whitespace-nowrap px-3 py-3 text-slate-600">{formatTariff(item.regulatoryTariff)}</td>
                            <td className="whitespace-nowrap px-3 py-3 text-slate-600">{formatCurrency(item.totalBilled)}</td>
                            <td className="whitespace-nowrap px-3 py-3 text-slate-600">{formatCurrency(item.totalRegulatory)}</td>
                            <td className="whitespace-nowrap px-3 py-3 font-semibold text-red-600">{formatCurrency(item.totalDifference)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RestitutionCalculationTable;
