import React, { createContext, useState, useContext, ReactNode } from 'react';
import { TariffData, CompanyData, RawCompanyRecord, MonthlyData, KpiData } from '../types';
import { financialBaseData } from '../constants';

// Since PapaParse is loaded via script tag, we need to declare it for TypeScript
declare const Papa: any;

interface DataContextType {
    isDataLoaded: boolean;
    isLoading: boolean;
    tariffData: TariffData[] | null;
    companyData: CompanyData[] | null;
    districts: string[];
    kpiData: KpiData | null;
    monthlyEvolution: MonthlyData[] | null;
    loadData: (file: File) => Promise<void>;
    fileName: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const normalizeDistrict = (district: string): string => {
    if (!district || typeof district !== 'string') return 'NÃO ESPECIFICADO';

    let normalized = district
        .toUpperCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); // Remove accents

    // Specific typo corrections
    if (normalized.includes('SENADOR CAENDO')) {
        normalized = normalized.replace('SENADOR CAENDO', 'SENADOR CANEDO');
    }

    // Group sub-districts like "ANAPOLIS - DAIA - VPR 3 BR 153" under "ANAPOLIS - DAIA"
    if (normalized.startsWith('ANAPOLIS - DAIA')) {
        normalized = 'ANAPOLIS - DAIA';
    }

    // Standardize spacing and remove punctuation
    normalized = normalized.replace(/[.-]/g, ' ').replace(/\s+/g, ' ').trim();

    return normalized;
};


export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tariffData, setTariffData] = useState<TariffData[] | null>(null);
    const [companyData, setCompanyData] = useState<CompanyData[] | null>(null);
    const [districts, setDistricts] = useState<string[]>([]);
    const [fileName, setFileName] = useState<string | null>(null);
    const [kpiData, setKpiData] = useState<KpiData | null>(null);
    const [monthlyEvolution, setMonthlyEvolution] = useState<MonthlyData[] | null>(null);

    const processCsvData = (csvData: any[]) => {
        const regulatoryTariffs: { [year: number]: number } = {};
        financialBaseData.forEach(d => {
            regulatoryTariffs[d.year] = d.calculatedRegulatoryTariff;
        });

        const cleanNumber = (value: string | number | undefined): number => {
            if (typeof value === 'number') return isNaN(value) ? 0 : value;
            if (typeof value === 'string') {
                const cleanedString = value.replace(/\./g, '').replace(',', '.');
                return parseFloat(cleanedString) || 0;
            }
            return 0;
        };

        const allRecords: RawCompanyRecord[] = csvData
            .filter(row => row.Razao_Social && row.Ano && row.Mes_Ano && row.Volume_Agua_m3 && row.Valor_Total && row.Distrito && row.Hidrometro)
            .map(row => {
                const ano = parseInt(row.Ano, 10);
                const tarifaRegulatoria = regulatoryTariffs[ano] || 0;
                const volume = cleanNumber(row.Volume_Agua_m3);
                const valorTotal = cleanNumber(row.Valor_Total);
                const valorRegulatorio = volume * tarifaRegulatoria;
                const diferencaValor = valorTotal - valorRegulatorio;
                const diferencaPercentual = valorRegulatorio > 0 ? (diferencaValor / valorRegulatorio) * 100 : 0;

                return {
                    Razao_Social: row.Razao_Social,
                    Distrito: row.Distrito,
                    Mes_Ano: row.Mes_Ano,
                    Hidrometro: row.Hidrometro,
                    Volume_Agua_m3: volume,
                    Valor_Total: valorTotal,
                    Ano: String(ano),
                    Tarifa_Regulatoria: tarifaRegulatoria,
                    Valor_Regulatorio: valorRegulatorio,
                    Diferenca_Valor: diferencaValor,
                    Diferenca_Percentual: diferencaPercentual
                };
            });

        // --- KPI and Monthly Evolution Processing ---
        let totalBilled = 0;
        let totalRegulatory = 0;
        const byMonth: { [key: string]: { billed: number; regulatory: number } } = {};

        allRecords.forEach(rec => {
            totalBilled += rec.Valor_Total;
            totalRegulatory += rec.Valor_Regulatorio;
            if (!byMonth[rec.Mes_Ano]) {
                byMonth[rec.Mes_Ano] = { billed: 0, regulatory: 0 };
            }
            byMonth[rec.Mes_Ano].billed += rec.Valor_Total;
            byMonth[rec.Mes_Ano].regulatory += rec.Valor_Regulatorio;
        });

        const sortedMonths = Object.keys(byMonth).sort((a, b) => {
            const [monthA, yearA] = a.split('/');
            const [monthB, yearB] = b.split('/');
            return new Date(parseInt(yearA), parseInt(monthA) - 1).getTime() - new Date(parseInt(yearB), parseInt(monthB) - 1).getTime();
        });

        let cumulativeBilled = 0;
        let cumulativeRegulatory = 0;
        const processedMonthlyEvolution: MonthlyData[] = sortedMonths.map(monthStr => {
            const [month, year] = monthStr.split('/');
            const date = new Date(parseInt(year), parseInt(month) - 1);

            cumulativeBilled += byMonth[monthStr].billed;
            cumulativeRegulatory += byMonth[monthStr].regulatory;

            return {
                month: monthStr,
                date: date,
                'Devido (Regulatório)': cumulativeRegulatory,
                'Cobrado a Maior': cumulativeBilled - cumulativeRegulatory,
            };
        });
        setMonthlyEvolution(processedMonthlyEvolution);


        // --- Company Data Processing ---
        const companiesMap: { [key: string]: RawCompanyRecord[] } = {};
        allRecords.forEach(record => {
            const name = record.Razao_Social;
            if (!companiesMap[name]) {
                companiesMap[name] = [];
            }
            companiesMap[name].push(record);
        });

        let idCounter = 0;
        const processedCompanyData: CompanyData[] = Object.keys(companiesMap).map(name => {
            idCounter++;
            const records = companiesMap[name];

            records.sort((a, b) => {
                const [monthA, yearA] = a.Mes_Ano.split('/');
                const [monthB, yearB] = b.Mes_Ano.split('/');
                const dateA = new Date(parseInt(yearA), parseInt(monthA) - 1);
                const dateB = new Date(parseInt(yearB), parseInt(monthB) - 1);
                return dateB.getTime() - dateA.getTime();
            });

            const totalDifference = records.reduce((acc, rec) => acc + rec.Diferenca_Valor, 0);
            const lastBillingDate = records.length > 0 ? records[0].Mes_Ano : 'N/A';
            const fakeCnpj = `00.${Math.floor(100 + Math.random() * 900)}.${Math.floor(100 + Math.random() * 900)}/0001-${String(idCounter).padStart(2, '0')}`;
            const originalDistrito = records.length > 0 ? records[0].Distrito : 'N/A';
            const normalizedDistrito = normalizeDistrict(originalDistrito);

            return {
                id: name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8) + idCounter,
                name: name,
                cnpj: fakeCnpj,
                distrito: normalizedDistrito,
                lastBillingDate: lastBillingDate,
                totalDifference: totalDifference,
                records: records,
            };
        });
        setCompanyData(processedCompanyData);
        setKpiData({
            totalBilled: totalBilled,
            totalRegulatory: totalRegulatory,
            totalOvercharge: totalBilled - totalRegulatory,
            companyCount: processedCompanyData.length
        });


        const uniqueDistricts = [...new Set(processedCompanyData.map(c => c.distrito).filter(d => d && d !== 'N/A' && d !== 'NÃO ESPECIFICADO'))].sort();
        setDistricts(uniqueDistricts);


        // --- Tariff Data Processing (for charts) ---
        const dataByYear: { [year: string]: { totalVolume: number; totalValue: number } } = {};
        allRecords.forEach(record => {
            const year = record.Ano;
            if (!dataByYear[year]) {
                dataByYear[year] = { totalVolume: 0, totalValue: 0 };
            }
            dataByYear[year].totalVolume += record.Volume_Agua_m3;
            dataByYear[year].totalValue += record.Valor_Total;
        });

        const newTariffData = financialBaseData.map(baseData => {
            const yearStr = String(baseData.year);
            const yearData = dataByYear[yearStr];

            if (!yearData || yearData.totalVolume === 0) {
                 // If no data for the year in the uploaded file, return base data with zero volume.
                 return { ...baseData, billedVolume: 0 };
            }

            // Calculate the actual observed tariff from the data.
            // totalValue is SUM(Valor_Total), totalVolume is SUM(Volume_Agua_m3)
            const newObservedTariff = yearData.totalValue / yearData.totalVolume;

            return {
                ...baseData,
                // Override the hardcoded observedTariff with the one calculated from the input data
                observedTariff: newObservedTariff,
                // Update billedVolume based on the actual data from the CSV, in millions of m³
                billedVolume: yearData.totalVolume / 1_000_000,
            };
        });
        setTariffData(newTariffData);
    };

    const loadData = (file: File): Promise<void> => {
        setIsLoading(true);
        setFileName(file.name);

        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                delimiter: ';',
                transformHeader: (header: string) => header.trim().replace(/^\ufeff/, ''),
                complete: (results: any) => {
                    try {
                        if (results.errors.length > 0) {
                            console.error('Erros de parsing do CSV:', results.errors);
                            const firstError = results.errors[0];
                            throw new Error(`Erro na linha ${firstError.row}: ${firstError.message}`);
                        }
                        processCsvData(results.data);
                        setIsDataLoaded(true);
                        resolve();
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : String(error);
                        console.error("Erro ao processar os dados do CSV:", errorMessage);
                        alert(`Erro ao processar os dados: ${errorMessage}`);
                        setIsDataLoaded(false);
                        setFileName(null);
                        reject(error);
                    } finally {
                        setIsLoading(false);
                    }
                },
                error: (error: any) => {
                    console.error("Erro ao parsear o CSV:", error);
                    alert(`Erro ao ler o arquivo CSV: ${error.message}`);
                    setIsDataLoaded(false);
                    setFileName(null);
                    setIsLoading(false);
                    reject(error);
                }
            });
        });
    };

    return (
        <DataContext.Provider value={{ isDataLoaded, isLoading, tariffData, companyData, districts, loadData, fileName, kpiData, monthlyEvolution }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};