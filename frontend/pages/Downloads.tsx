import React from 'react';
import Card from '../components/Card';
import { useData } from '../contexts/DataContext';

const DocumentTextIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const ArrowDownTrayIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);


const Downloads: React.FC = () => {
    const { tariffData, kpiData, monthlyEvolution, companyData, fileName } = useData();

    const formatCurrency = (value: number | undefined) => {
        if (typeof value !== 'number' || isNaN(value)) return 'N/A';
        return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const formatBRL = (value: number | undefined) => {
        if (typeof value !== 'number' || isNaN(value)) return 'N/A';
        return `R$ ${value.toFixed(2).replace('.', ',')}/m³`;
    };

    const exportConsolidatedCSV = () => {
        if (!tariffData) return;

        const headers = [
            "Ano", "Tarifa Observada (R$/m³)", "Tarifa Custo Real (R$/m³)", "Tarifa Regulatória (R$/m³)",
            "Volume Faturado (M m³)", "OPEX (R$ Milhões)", "Remuneração Capital (R$ Milhões)",
            "Depreciação (R$ Milhões)", "Receita Requerida (R$ Milhões)"
        ];

        const rows = tariffData.map(d => [
            d.year,
            d.observedTariff.toFixed(2).replace('.', ','),
            d.calculatedRealTariff.toFixed(2).replace('.', ','),
            d.calculatedRegulatoryTariff.toFixed(2).replace('.', ','),
            d.billedVolume.toFixed(2).replace('.', ','),
            d.opex.toFixed(2).replace('.', ','),
            d.rc.toFixed(2).replace('.', ','),
            d.dep.toFixed(2).replace('.', ','),
            d.requiredRevenue.toFixed(2).replace('.', ',')
        ].join(';'));

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(';') + "\n"
            + rows.join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "dados_consolidados_tarifarios.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportFullReportPDF = () => {
        if (!kpiData || !tariffData || !companyData) {
            alert("Dados insuficientes para gerar o relatório completo.");
            return;
        }

        const byDistrict: { [key: string]: { totalDifference: number; companyCount: number } } = {};
        companyData.forEach(company => {
            const district = company.distrito || 'Não especificado';
            if (!byDistrict[district]) {
                byDistrict[district] = { totalDifference: 0, companyCount: 0 };
            }
            byDistrict[district].totalDifference += company.totalDifference;
            byDistrict[district].companyCount += 1;
        });

        const districtArray = Object.entries(byDistrict)
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.totalDifference - a.totalDifference);

        const financialData = tariffData.map(d => {
            const collectedRevenue = d.observedTariff * d.billedVolume * 1_000_000;
            const regulatoryRevenue = d.calculatedRegulatoryTariff * d.billedVolume * 1_000_000;
            const realCostRevenue = d.calculatedRealTariff * d.billedVolume * 1_000_000;
            return {
                year: d.year,
                'Excedente (vs Regulatório)': (collectedRevenue - regulatoryRevenue),
                'Déficit (vs Custo Real)': (collectedRevenue - realCostRevenue),
            };
        });

        const reportHtml = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Relatório de Análise Completo - Projeto Águas Claras</title>
                <style>
                    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #374151; background-color: #f9fafb; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .page-container { max-width: 8.5in; min-height: 11in; margin: 0 auto; padding: 0.75in; background-color: #fff; box-shadow: 0 0 15px rgba(0,0,0,0.1); }
                    h1, h2, h3, h4 { font-weight: 700; color: #111827; margin-top: 1.5rem; margin-bottom: 0.75rem; line-height: 1.3; }
                    h1 { font-size: 2em; border-bottom: 2px solid #3b82f6; padding-bottom: 0.5rem; }
                    h2 { font-size: 1.5em; border-bottom: 1px solid #d1d5db; padding-bottom: 0.3rem; page-break-after: avoid; }
                    h3 { font-size: 1.2em; }
                    p { margin-bottom: 1rem; }
                    strong { color: #111827; }
                    table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9em; page-break-inside: avoid; }
                    th, td { border: 1px solid #e5e7eb; padding: 0.6rem 0.8rem; text-align: left; vertical-align: top; }
                    thead th { background-color: #f3f4f6; font-weight: 600; color: #4b5563; }
                    tbody tr:nth-child(even) { background-color: #f9fafb; }
                    .report-header { text-align: center; border-bottom: 1px solid #e5e7eb; padding-bottom: 1rem; margin-bottom: 2rem; }
                    .report-header h1 { border: none; font-size: 2.2em; color: #1e3a8a; }
                    .report-header .subtitle { font-size: 1.1em; color: #6b7280; }
                    .kpi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0; }
                    .kpi-card { background-color: #f3f4f6; padding: 1.25rem; border-radius: 8px; text-align: center; border-left: 5px solid; }
                    .kpi-title { font-size: 0.9em; font-weight: 500; color: #4b5563; margin-bottom: 0.5rem; }
                    .kpi-value { font-size: 1.8em; font-weight: 700; line-height: 1; }
                    .text-red { color: #dc2626; } .border-red { border-color: #ef4444; }
                    .text-blue { color: #2563eb; } .border-blue { border-color: #3b82f6; }
                    .text-green { color: #16a34a; } .border-green { border-color: #22c55e; }
                    .text-yellow { color: #ca8a04; } .border-yellow { border-color: #eab308; }
                    ul { padding-left: 1.5rem; } li { margin-bottom: 0.5rem; }
                    .disclaimer { font-size: 0.8em; color: #6b7280; margin-top: 2rem; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 1rem;}
                    @media print { body { background-color: #fff; } .page-container { box-shadow: none; margin: 0; padding: 0; } h2 { page-break-before: auto; } }
                </style>
            </head>
            <body>
                <div class="page-container">
                    <header class="report-header">
                        <h1>Relatório de Análise Tarifária</h1>
                        <p class="subtitle">Análise Detalhada do Período 2021-2024 para <strong>Projeto Águas Claras</strong></p>
                        <p style="font-size: 0.9em; color: #6b7280;">Relatório gerado em: ${new Date().toLocaleString('pt-BR')} | Base de dados: ${fileName || 'Não informado'}</p>
                    </header>

                    <section>
                        <h2>1. Sumário Executivo e Impacto Agregado</h2>
                        <p>O presente relatório consolida a análise técnica sobre a estrutura tarifária da CODEGO, comparando os valores efetivamente cobrados com as tarifas regulatórias que deveriam ter sido aplicadas. A análise, baseada nos dados de faturamento do período de 2021 a 2024, revela uma cobrança sistemática acima do teto legal, resultando em um impacto financeiro significativo para os consumidores.</p>
                        <div class="kpi-grid">
                            <div class="kpi-card border-red"><p class="kpi-title">Valor Total Cobrado a Maior</p><p class="kpi-value text-red">${formatCurrency(kpiData.totalOvercharge)}</p></div>
                            <div class="kpi-card border-yellow"><p class="kpi-title">Empresas Impactadas</p><p class="kpi-value text-yellow">${kpiData.companyCount.toLocaleString('pt-BR')}</p></div>
                            <div class="kpi-card border-blue"><p class="kpi-title">Total Faturado no Período</p><p class="kpi-value text-blue">${formatCurrency(kpiData.totalBilled)}</p></div>
                            <div class="kpi-card border-green"><p class="kpi-title">Total Devido (Custo Regulatório)</p><p class="kpi-value text-green">${formatCurrency(kpiData.totalRegulatory)}</p></div>
                        </div>
                    </section>

                    <section>
                        <h2>2. Fundamentação Jurídica da Prática Tarifária</h2>
                        <p>A cobrança de tarifas de água e esgoto no Brasil é estritamente regulada, com o objetivo de garantir a modicidade tarifária e proteger o consumidor contra custos ineficientes. A prática da CODEGO viola preceitos fundamentais:</p>
                        <ul>
                            <li><strong>Violação ao Custo Eficiente:</strong> A Lei Federal nº 11.445/2007 e as Normas de Referência da ANA determinam que a tarifa deve refletir o custo mínimo para a prestação do serviço. A análise demonstra que a tarifa praticada excedeu sistematicamente este custo.</li>
                            <li><strong>Enriquecimento Sem Causa:</strong> A cobrança acima do valor legalmente devido configura enriquecimento sem causa da concessionária, conforme o Art. 884 do Código Civil, gerando o dever de restituir os valores pagos indevidamente.</li>
                            <li><strong>Prazo para Restituição:</strong> Conforme jurisprudência consolidada do STJ (Tema Repetitivo 932), o prazo prescricional para a ação de repetição de indébito de tarifas de água e esgoto é de 10 anos.</li>
                        </ul>
                        <p>A robustez dos dados apresentados neste relatório fornece o fundamento técnico (<em>fumus boni iuris</em>) e a demonstração do dano continuado (<em>periculum in mora</em>) para suportar medidas judiciais, incluindo pedidos de tutela de urgência para a imediata correção da tarifa e a restituição dos valores pagos a maior.</p>
                    </section>

                    <section>
                        <h2>3. Detalhamento do Impacto Financeiro Anual</h2>
                        <p>A tabela a seguir detalha a discrepância entre a tarifa média paga pelos consumidores e a tarifa regulatória correta para cada ano do período analisado, evidenciando a consistência da sobretaxa.</p>
                        <table>
                            <thead><tr><th>Ano</th><th>Tarifa Paga</th><th>Tarifa Regulatória</th><th>Sobretaxa Aplicada</th></tr></thead>
                            <tbody>
                                ${tariffData.map(item => `
                                    <tr>
                                        <td><strong>${item.year}</strong></td>
                                        <td class="text-red">${formatBRL(item.observedTariff)}</td>
                                        <td class="text-green">${formatBRL(item.calculatedRegulatoryTariff)}</td>
                                        <td class="text-red"><strong>${(((item.observedTariff / item.calculatedRegulatoryTariff) - 1) * 100).toFixed(1)}%</strong></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </section>

                    <section>
                        <h2>4. Análise por Indicadores Financeiros</h2>
                        <p>A discrepância tarifária gera dois efeitos paradoxais: um excedente de receita quando comparado ao teto regulatório (onerando o consumidor) e, simultaneamente, um déficit quando comparado ao custo real da operação (indicando ineficiência da concessionária).</p>
                        <table>
                            <thead><tr><th>Ano</th><th>Excedente vs Regulatório</th><th>Déficit vs Custo Real</th></tr></thead>
                            <tbody>
                                ${financialData.map(item => `
                                    <tr>
                                        <td><strong>${item.year}</strong></td>
                                        <td class="text-red">${formatCurrency(item['Excedente (vs Regulatório)'])}</td>
                                        <td class="text-blue">${formatCurrency(item['Déficit (vs Custo Real)'])}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <p style="font-size: 0.85em; color: #6b7280;">O "Excedente vs Regulatório" representa o valor cobrado acima do permitido legalmente. O "Déficit vs Custo Real" indica que, mesmo cobrando a mais, a receita foi insuficiente para cobrir os custos operacionais reais, o que reforça a tese de ineficiência.</p>
                    </section>

                    <section>
                        <h2>5. Impacto por Distrito Operacional</h2>
                        <p>A análise segmentada por distrito demonstra a abrangência do problema. A tabela abaixo classifica os distritos pelo valor total cobrado indevidamente de forma acumulada no período.</p>
                        <table>
                            <thead><tr><th>Distrito</th><th>Valor Cobrado a Maior (Total)</th><th>Nº de Empresas</th></tr></thead>
                            <tbody>
                                ${districtArray.slice(0, 15).map(d => `
                                    <tr>
                                        <td><strong>${d.name}</strong></td>
                                        <td class="text-red">${formatCurrency(d.totalDifference)}</td>
                                        <td>${d.companyCount.toLocaleString('pt-BR')}</td>
                                    </tr>
                                `).join('')}
                                ${districtArray.length > 15 ? '<tr><td colspan="3" style="text-align:center;">... e outros distritos.</td></tr>' : ''}
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
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-800">Downloads</h1>
                <p className="text-lg text-slate-600 mt-1">Exporte os dados brutos e relatórios consolidados.</p>
            </header>

            <Card>
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg bg-white">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-700">Relatório de Análise Completo</h3>
                            <p className="text-sm text-slate-500 mt-1">Documento consolidado com todas as análises, ideal para apresentações e pleitos judiciais.</p>
                        </div>
                        <button
                            onClick={exportFullReportPDF}
                            disabled={!kpiData}
                            className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center shrink-0 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            <DocumentTextIcon className="w-5 h-5 mr-2" />
                            Gerar Relatório
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg bg-white">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-700">Dados Consolidados (2021-2024)</h3>
                            <p className="text-sm text-slate-500 mt-1">Planilha com as tarifas, volumes e componentes de custo anuais.</p>
                        </div>
                        <button
                            onClick={exportConsolidatedCSV}
                            className="mt-4 md:mt-0 bg-slate-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors flex items-center shrink-0 disabled:bg-slate-400"
                            disabled={!tariffData}
                        >
                            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                            Exportar Dados (.csv)
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Downloads;