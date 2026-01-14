
import React, { useState, useMemo } from 'react';
import { CompanyData, AnnualCompanySummary } from '../types';
import Card from './Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import RestitutionCalculationTable from './RestitutionCalculationTable';


const DocumentTextIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const ArrowDownTrayIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

interface CompanyDetailModalProps {
    company: CompanyData | null;
    onClose: () => void;
}

const SummaryCard: React.FC<{ title: string; value: string; valueClass?: string }> = ({ title, value, valueClass }) => (
  <div className="bg-slate-200/50 p-4 rounded-lg text-center flex-1 border border-slate-200">
    <h4 className="text-sm font-medium text-slate-600">{title}</h4>
    <p className={`text-2xl font-bold mt-1 ${valueClass}`}>{value}</p>
  </div>
);

const ImpactCard: React.FC<{title: string, value: string, subtext: string, valueClass: string}> = ({title, value, subtext, valueClass}) => (
    <div className="bg-white/50 p-6 rounded-lg shadow-lg text-center flex-1">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</h4>
        <p className={`text-4xl font-bold my-2 ${valueClass}`}>{value}</p>
        <p className="text-xs text-slate-400">{subtext}</p>
    </div>
);


const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({ company, onClose }) => {
    if (!company) return null;

    const formatCurrency = (value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const { totalBilled, totalRegulatory, totalDifference, sortedRecords } = useMemo(() => {
        const sorted = [...company.records].sort((a, b) => {
            const [monthA, yearA] = a.Mes_Ano.split('/');
            const [monthB, yearB] = b.Mes_Ano.split('/');
            return new Date(parseInt(yearA), parseInt(monthA) - 1).getTime() - new Date(parseInt(yearB), parseInt(monthB) - 1).getTime();
        });
        const billed = company.records.reduce((acc, item) => acc + item.Valor_Total, 0);
        const regulatory = company.records.reduce((acc, item) => acc + item.Valor_Regulatorio, 0);
        return {
            totalBilled: billed,
            totalRegulatory: regulatory,
            totalDifference: billed - regulatory,
            sortedRecords: sorted,
        };
    }, [company]);

    const annualSummaryData: AnnualCompanySummary[] = useMemo(() => {
        const byYear: { [year: string]: { totalVolume: number; totalBilled: number; totalRegulatory: number; regulatoryTariff: number } } = {};

        company.records.forEach(rec => {
            const year = rec.Ano;
            if (!byYear[year]) {
                byYear[year] = { totalVolume: 0, totalBilled: 0, totalRegulatory: 0, regulatoryTariff: rec.Tarifa_Regulatoria };
            }
            byYear[year].totalVolume += rec.Volume_Agua_m3;
            byYear[year].totalBilled += rec.Valor_Total;
            byYear[year].totalRegulatory += rec.Valor_Regulatorio;
        });

        return Object.entries(byYear).map(([year, data]) => {
            const avgObservedTariff = data.totalVolume > 0 ? data.totalBilled / data.totalVolume : 0;
            return {
                year: parseInt(year),
                totalVolume: data.totalVolume,
                totalBilled: data.totalBilled,
                totalRegulatory: data.totalRegulatory,
                totalDifference: data.totalBilled - data.totalRegulatory,
                avgObservedTariff: avgObservedTariff,
                regulatoryTariff: data.regulatoryTariff,
            };
        }).sort((a, b) => b.year - a.year);
    }, [company.records]);

    const { latestYearData, reductionPercentage } = useMemo(() => {
        if (!annualSummaryData || annualSummaryData.length === 0) {
            return { latestYearData: null, reductionPercentage: 0 };
        }
        const latest = annualSummaryData.find(d => d.year === 2024) || annualSummaryData[0];
        const reduction = latest.avgObservedTariff > 0
            ? ((latest.avgObservedTariff - latest.regulatoryTariff) / latest.avgObservedTariff) * 100
            : 0;
        return { latestYearData: latest, reductionPercentage: reduction };
    }, [annualSummaryData]);

    const chartData = sortedRecords.map(record => ({
        month: record.Mes_Ano,
        'Valor Cobrado': record.Valor_Total,
        'Valor Regulatório': record.Valor_Regulatorio,
    }));

    const downloadDetailedCSV = () => {
        if (!company) return;
        const headers = ["Mês/Ano", "Hidrômetro", "Volume de Água (m³)", "Valor Cobrado (R$)", "Tarifa Regulatória (R$/m³)", "Valor Regulatório (R$)", "Diferença de Valor (R$)", "Diferença Percentual (%)"];
        const rows = sortedRecords.map(rec => [rec.Mes_Ano, rec.Hidrometro, rec.Volume_Agua_m3.toString().replace('.', ','), rec.Valor_Total.toFixed(2).replace('.', ','), rec.Tarifa_Regulatoria.toFixed(2).replace('.', ','), rec.Valor_Regulatorio.toFixed(2).replace('.', ','), rec.Diferenca_Valor.toFixed(2).replace('.', ','), rec.Diferenca_Percentual.toFixed(2).replace('.', ',')].join(';'));
        const csvContent = "data:text/csv;charset=utf-8," + headers.join(';') + "\n" + rows.join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        const safeFilename = company.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        link.setAttribute("download", `dados_detalhados_${safeFilename}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const generatePrintableReport = () => {
        if (!company || !annualSummaryData || annualSummaryData.length === 0 || !latestYearData) {
            alert("Dados insuficientes para gerar o relatório.");
            return;
        }

        const formatCurrency = (value: number) => `R$&nbsp;${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        const formatTariff = (value: number) => `R$&nbsp;${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}&nbsp;/&nbsp;m³`;
        const formatVolume = (value: number) => `${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}&nbsp;m³`;

        const juridicalAnalysisSection = `
            <section>
                <h2>3. Análise Jurídica da Prática Tarifária</h2>
                <div class="prose">
                    <p>A análise detalhada dos dados financeiros da ${company.name} revela uma discrepância substancial entre o valor efetivamente pago e o custo que seria justo por um serviço prestado em regime de eficiência.</p>
                    <h4 style="font-size: 1.1em; margin-top: 1.2em; margin-bottom: 0.5em; font-weight: 600;">Tarifa Devida (Regulatória) vs. Tarifa Paga</h4>
                    <p>A "Tarifa Devida", ou Tarifa Regulatória, representa o custo justo do serviço, refletindo apenas os custos operacionais estritamente necessários. Em contrapartida, a "Tarifa Média Paga" pela empresa encontra-se significativamente inflada. Esta diferença demonstra que os custos da ineficiência da concessionária — seja por perdas na rede, gestão deficiente ou outros fatores — foram indevidamente repassados ao consumidor, contrariando a lógica de um serviço público regulado.</p>
                    <h4 style="font-size: 1.1em; margin-top: 1.2em; margin-bottom: 0.5em; font-weight: 600;">Indicadores Chave:</h4>
                    <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                        <li style="margin-bottom: 0.5rem;"><strong>Total Pago (Acumulado):</strong> ${formatCurrency(totalBilled)}</li>
                        <li style="margin-bottom: 0.5rem;"><strong>Total Devido (Regulatório):</strong> ${formatCurrency(totalRegulatory)}</li>
                        <li style="margin-bottom: 0.5rem;"><strong>Diferença a Restituir (Principal):</strong> ${formatCurrency(totalDifference)}</li>
                    </ul>
                    <p>O montante a ser restituído representa o custo direto da ineficiência da concessionária que foi indevidamente imputado à ${company.name}. A "Redução Estimada" de ${reductionPercentage.toFixed(1)}%, calculada com base nos dados do último ano, indica o potencial de alívio imediato e substancial no fluxo de caixa da empresa caso a tarifa legal e eficiente seja aplicada.</p>
                    <p>A tarifa cobrada é ilegal sob duas óticas distintas e complementares, que fortalecem a tese de cobrança indevida.</p>
                    <h4 style="font-size: 1.1em; margin-top: 1.2em; margin-bottom: 0.5em; font-weight: 600;">Tese Principal - Violação Formal e Material Demonstrada:</h4>
                    <p><strong>Ilegalidade Formal:</strong> A estrutura tarifária aplicada é ilegal por desrespeitar o devido processo administrativo. O Art. 15 da Lei Estadual (GO) nº 14.939/2004 exige um ato prévio e favorável de homologação da Agência Goiana de Regulação (AGR) para que qualquer tarifa seja válida. A ausência de tal homologação torna a cobrança nula de pleno direito.</p>
                    <p><strong>Ilegalidade Material:</strong> Além do vício formal, a tarifa é materialmente ilegal por violar o princípio da modicidade, consagrado no Art. 30 da Lei Federal nº 11.445/2007. Este artigo veda o repasse de custos de ineficiência operacional ao consumidor. A cobrança de uma tarifa que incorpora falhas de gestão da concessionária contraria frontalmente este princípio.</p>
                    <h4 style="font-size: 1.1em; margin-top: 1.2em; margin-bottom: 0.5em; font-weight: 600;">Tese Subsidiária - Violação por Inclusão de Encargos Tributários:</h4>
                    <p><strong>Fundamentação:</strong> Além da ineficiência geral, evidenciam-se elementos de inclusão indevida de tributos como PIS e COFINS nas tarifas repassadas. Tais contribuições incidem sobre o faturamento da concessionária, sendo uma obrigação tributária desta, e não um "custo operacional" passível de repasse direto ao consumidor.</p>
                    <p><strong>Posicionamento Estratégico:</strong> Arguição como linha de subsidiária de ação judicial. Requerida exibição de documentos e planilhas de custos serve como dissuasão da defesa em relação ao litígio, direcionando a uma possível solução mais ágil em vista de possível devassa pericial de caráter bancário, financeiro e contábil que seria necessária para verificar se o repasse ocorreu ou não.</p>
                </div>
            </section>
        `;

        const reportHtml = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Relatório Individual - ${company.name}</title>
                <style>
                    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #374151; background-color: #f9fafb; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .page-container { max-width: 8.5in; min-height: 11in; margin: 0 auto; padding: 0.75in; background-color: #fff; box-shadow: 0 0 15px rgba(0,0,0,0.1); }
                    h1, h2, h3, h4 { font-weight: 700; color: #111827; margin-top: 1.5rem; margin-bottom: 0.75rem; line-height: 1.3; }
                    h2 { font-size: 1.5em; border-bottom: 1px solid #d1d5db; padding-bottom: 0.3rem; page-break-after: avoid; }
                    p { margin-bottom: 1rem; }
                    strong { color: #111827; }
                    table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.75em; page-break-inside: avoid; }
                    th, td { border: 1px solid #e5e7eb; padding: 0.4rem 0.5rem; text-align: left; vertical-align: top; white-space: nowrap; }
                    thead th { background-color: #f3f4f6; font-weight: 600; color: #4b5563; }
                    tbody tr:nth-child(even) { background-color: #f9fafb; }
                    .text-red { color: #dc2626 !important; }
                    .prose { max-width: 100%; }
                    .disclaimer { font-size: 0.8em; color: #6b7280; margin-top: 2rem; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 1rem;}

                    /* New Styles for Header */
                    .main-header-card { background-color: #f1f5f9; border-radius: 12px; padding: 1.5rem; border: 1px solid #e2e8f0; }
                    .main-header-card h1 { font-size: 2em; color: #1e293b; font-weight: 800; border-bottom: none; margin: 0; padding: 0; }
                    .main-header-card p { font-size: 1em; color: #475569; margin: 0.5rem 0 0 0; }
                    .main-header-card hr { border-top: 1px solid #cbd5e1; margin: 1rem 0; }

                    /* New Styles for Summary */
                    .summary-section-title { font-size: 1.5em; font-weight: 700; color: #1e293b; margin-top: 2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e2e8f0; }
                    .summary-kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 1.5rem 0; text-align: center; }
                    .summary-kpi-card { background-color: #ffffff; padding: 1.25rem; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); display: flex; flex-direction: column; }
                    .summary-kpi-title { font-size: 0.9em; font-weight: 500; color: #64748b; margin-bottom: 0.5rem; text-align: center; }
                    .summary-kpi-value { font-size: 1.6em; font-weight: 800; line-height: 1.2; color: #1e293b; word-wrap: break-word; text-align: center; margin-top: auto; padding-top: 1rem; }

                    @media print { body { background-color: #fff; } .page-container { box-shadow: none; margin: 0; padding: 0; } h2 { page-break-before: auto; } }
                </style>
            </head>
            <body>
                <div class="page-container">
                    <section>
                      <div class="main-header-card">
                          <h1>Relatório Financeiro Detalhado</h1>
                          <hr />
                          <p><strong>Empresa:</strong> ${company.name}</p>
                          <p><strong>CNPJ:</strong> ${company.cnpj}</p>
                      </div>
                    </section>

                    <section>
                        <h2 class="summary-section-title">1. Resumo Financeiro (Período Completo)</h2>
                        <div class="summary-kpi-grid">
                            <div class="summary-kpi-card">
                                <p class="summary-kpi-title">Total Pago</p>
                                <p class="summary-kpi-value">${formatCurrency(totalBilled)}</p>
                            </div>
                            <div class="summary-kpi-card">
                                <p class="summary-kpi-title">Total Devido<br>(Custo Regulatório)</p>
                                <p class="summary-kpi-value">${formatCurrency(totalRegulatory)}</p>
                            </div>
                            <div class="summary-kpi-card">
                                <p class="summary-kpi-title">Valor a ser Restituído</p>
                                <p class="summary-kpi-value text-red">${formatCurrency(totalDifference)}</p>
                            </div>
                        </div>
                         <div style="background-color: #f3f4f6; padding: 1.25rem; border-radius: 8px; text-align: center; margin-top: 1rem;">
                              <p style="font-size: 0.9em; font-weight: 500; color: #4b5563; margin-bottom: 0.5rem;">Redução Estimada (Base ${latestYearData.year})</p>
                              <p style="font-size: 2.2em; font-weight: 700; color: #16a34a;">${reductionPercentage > 0 ? reductionPercentage.toFixed(1) : '0.0'}%</p>
                              <p style="font-size: 0.8em; color: #6b7280;">Potencial de economia médio nas faturas futuras com a aplicação da tarifa correta.</p>
                          </div>
                    </section>

                    <section>
                        <h2>2. Memória de Cálculo da Restituição</h2>
                        <p>A tabela a seguir apresenta o cálculo consolidado anual que fundamenta o valor a ser restituído.</p>
                        <table>
                            <thead>
                                <tr><th>Ano</th><th>Volume Faturado</th><th>Tarifa Paga Média</th><th>Tarifa Devida</th><th>Total Pago</th><th>Total Devido</th><th class="text-red">Restituição</th></tr>
                            </thead>
                            <tbody>
                                ${annualSummaryData.map(item => `
                                    <tr>
                                        <td><strong>${item.year}</strong></td>
                                        <td>${formatVolume(item.totalVolume)}</td>
                                        <td>${formatTariff(item.avgObservedTariff)}</td>
                                        <td>${formatTariff(item.regulatoryTariff)}</td>
                                        <td>${formatCurrency(item.totalBilled)}</td>
                                        <td>${formatCurrency(item.totalRegulatory)}</td>
                                        <td class="text-red"><strong>${formatCurrency(item.totalDifference)}</strong></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </section>

                    ${juridicalAnalysisSection}

                    <section>
                        <h2>4. Detalhamento Mensal de Faturamento</h2>
                        <p>A tabela abaixo detalha, mês a mês, os valores cobrados, os valores regulatórios corretos e a diferença apurada em cada fatura.</p>
                        <table>
                            <thead>
                                <tr><th>Mês/Ano</th><th>Hidrômetro</th><th>Volume (m³)</th><th>Valor Cobrado</th><th>Valor Regulatório</th><th class="text-red">Diferença</th></tr>
                            </thead>
                            <tbody>
                                ${sortedRecords.map(rec => `
                                    <tr>
                                        <td>${rec.Mes_Ano}</td>
                                        <td>${rec.Hidrometro}</td>
                                        <td>${rec.Volume_Agua_m3.toLocaleString('pt-BR')}</td>
                                        <td>${formatCurrency(rec.Valor_Total)}</td>
                                        <td>${formatCurrency(rec.Valor_Regulatorio)}</td>
                                        <td class="text-red">${formatCurrency(rec.Diferenca_Valor)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </section>

                    <footer class="disclaimer">
                        <p>Este relatório foi gerado automaticamente com base nos dados fornecidos. As análises e conclusões são baseadas na metodologia descrita no painel e nas normas regulatórias vigentes na data de sua emissão. A veracidade dos dados de origem é de responsabilidade da parte que os forneceu.</p>
                    </footer>
                </div>
            </body>
            </html>
        `;

        const reportWindow = window.open('', '_blank');
        if (reportWindow) {
            reportWindow.document.write(reportHtml);
            reportWindow.document.close();
            reportWindow.focus();
        } else {
            alert('Por favor, habilite pop-ups para gerar o relatório.');
        }
    };


    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="bg-slate-50/80 backdrop-blur-xl border border-slate-200/50 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex justify-between items-center p-4 sm:p-5 border-b border-slate-200/60 flex-shrink-0">
                    <div>
                         <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-slate-800">{company.name}</h2>
                         <p className="text-sm text-slate-500 mt-1">CNPJ: {company.cnpj}</p>
                    </div>
                    <button onClick={onClose} aria-label="Fechar modal" className="text-slate-500 hover:text-slate-800 transition-colors rounded-full p-2 -mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-6 overflow-y-auto">

                    <div className="flex flex-col md:flex-row gap-4">
                      <SummaryCard title="Total Pago (Acumulado)" value={formatCurrency(totalBilled)} valueClass="text-blue-600" />
                      <SummaryCard title="Total Devido (Regulatório)" value={formatCurrency(totalRegulatory)} valueClass="text-green-600" />
                    </div>

                    <div className="bg-slate-100/50 p-4 rounded-lg space-y-4 md:space-y-0 md:flex md:gap-4">
                       {latestYearData && (
                           <ImpactCard
                               title={`FRENTE 1: REDUÇÃO ESTIMADA (BASE ${latestYearData.year})`}
                               value={`${reductionPercentage > 0 ? reductionPercentage.toFixed(1) : '0.0'}%`}
                               subtext="Potencial de economia nas faturas futuras"
                               valueClass="text-green-600"
                           />
                       )}
                       <ImpactCard
                           title="FRENTE 2: RETORNO FINAL"
                           value={formatCurrency(totalDifference)}
                           subtext="Valor a ser restituído, acrescido de juros e correção monetária"
                           valueClass="text-red-600"
                       />
                    </div>

                    <Card>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Memória de Cálculo da Restituição</h3>
                        <RestitutionCalculationTable data={annualSummaryData} />
                    </Card>

                    <Card>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Histórico Mensal: Cobrado vs. Regulatório</h3>
                        <ResponsiveContainer width="100%" height={250}>
                             <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" fontSize={12} tick={{ dy: 10 }} interval="preserveStartEnd" />
                                <YAxis tickFormatter={(val) => `R$${(val/1000).toFixed(0)}k`} fontSize={12} />
                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                <Legend />
                                <Line type="monotone" dataKey="Valor Cobrado" stroke="#ef4444" strokeWidth={2} name="Valor Pago" dot={false} />
                                <Line type="monotone" dataKey="Valor Regulatório" stroke="#3b82f6" strokeWidth={2} name="Valor Correto" dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </div>

                 {/* Footer */}
                <div className="flex-shrink-0 p-4 sm:p-5 border-t border-slate-200/60 bg-slate-100/50 flex flex-col sm:flex-row gap-3 justify-end">
                    <button onClick={generatePrintableReport} className="flex-grow sm:flex-grow-0 bg-white/70 border border-slate-300 text-slate-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                        <DocumentTextIcon className="w-5 h-5"/>
                        Gerar Relatório Completo
                    </button>
                     <button onClick={downloadDetailedCSV} className="flex-grow sm:flex-grow-0 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        Exportar Dados Detalhados (.csv)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetailModal;
