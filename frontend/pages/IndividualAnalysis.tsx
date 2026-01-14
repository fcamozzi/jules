import React, { useState, useMemo } from 'react';
import Card from '../components/Card';
import CompanyDetailModal from '../components/CompanyDetailModal';
import NdaModal from '../components/NdaModal';
import { useData } from '../contexts/DataContext';
import { CompanyData } from '../types';

// Icons needed for this page
const MagnifyingGlassIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

const ChevronUpDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
    </svg>
);


const IndividualAnalysis: React.FC = () => {
    const { companyData, districts } = useData();
    const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);
    const [pendingCompany, setPendingCompany] = useState<CompanyData | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof CompanyData; direction: 'ascending' | 'descending' } | null>({ key: 'totalDifference', direction: 'descending' });
    const [selectedDistrito, setSelectedDistrito] = useState<string>('');

    const filteredCompanies = useMemo(() => {
        if (!companyData) return [];

        let companies = companyData;

        // Filter by district
        if (selectedDistrito && selectedDistrito !== 'all') {
            companies = companies.filter(c => c.distrito === selectedDistrito);
        }

        // Filter by search term
        if (searchTerm) {
            companies = companies.filter(c =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.cnpj.includes(searchTerm)
            );
        }

        return companies;
    }, [companyData, searchTerm, selectedDistrito]);

    const sortedCompanies = useMemo(() => {
        let sortableItems = [...filteredCompanies];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortConfig.direction === 'ascending' ? aValue - bValue : bValue - aValue;
                }
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortConfig.direction === 'ascending'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredCompanies, sortConfig]);

    const requestSort = (key: keyof CompanyData) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key: keyof CompanyData) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <ChevronUpDownIcon className="w-4 h-4 text-slate-400" />;
        }
        return sortConfig.direction === 'ascending' ? '▲' : '▼';
    };

    const formatCurrency = (value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const handleCompanyClick = (company: CompanyData) => {
        setPendingCompany(company);
    };

    const handleNdaConfirm = () => {
        if (pendingCompany) {
            setSelectedCompany(pendingCompany);
            setPendingCompany(null);
        }
    };

    const shouldShowResults = searchTerm.length > 0 || selectedDistrito !== '';

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-800">Análise de Impacto Individualizado</h1>
                <p className="text-lg text-slate-600 mt-1">Análise detalhada do impacto financeiro para cada empresa na base de dados.</p>
            </header>

            <Card>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                             <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por nome ou CNPJ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                     <div className="relative flex-grow">
                        <select
                            value={selectedDistrito}
                            onChange={(e) => setSelectedDistrito(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="">[Selecionar Distrito]</option>
                            <option value="all">Todos os Distritos</option>
                            {districts.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                {['name', 'cnpj', 'distrito', 'lastBillingDate', 'totalDifference'].map((key) => (
                                    <th
                                        key={key}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                                        onClick={() => requestSort(key as keyof CompanyData)}
                                    >
                                        <div className="flex items-center">
                                            {
                                                {
                                                    name: 'Razão Social',
                                                    cnpj: 'CNPJ',
                                                    distrito: 'Distrito',
                                                    lastBillingDate: 'Último Faturamento',
                                                    totalDifference: 'Diferença Total'
                                                }[key]
                                            }
                                            <span className="ml-2">{getSortIndicator(key as keyof CompanyData)}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {shouldShowResults ? (
                                sortedCompanies.length > 0 ? (
                                    sortedCompanies.map((company) => (
                                        <tr
                                            key={company.id}
                                            onClick={() => handleCompanyClick(company)}
                                            className="hover:bg-slate-100 cursor-pointer"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{company.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{company.cnpj}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{company.distrito}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{company.lastBillingDate}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${company.totalDifference > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                {formatCurrency(company.totalDifference)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center p-8 text-slate-500">
                                            Nenhum resultado encontrado para os filtros aplicados.
                                        </td>
                                    </tr>
                                )
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-8 text-slate-500">
                                        Para exibir os resultados, utilize a busca ou selecione um distrito.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {pendingCompany && <NdaModal onConfirm={handleNdaConfirm} onCancel={() => setPendingCompany(null)} />}
            {selectedCompany && <CompanyDetailModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />}
        </div>
    );
};

export default IndividualAnalysis;