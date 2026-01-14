export interface TariffData {
  year: number;
  observedTariff: number;
  calculatedRealTariff: number;
  calculatedRegulatoryTariff: number;
  billedVolume: number; // in millions of m³
  opex: number; // in millions of R$
  rc: number; // in millions of R$
  dep: number; // in millions of R$
  requiredRevenue: number; // in millions of R$
}

export interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export interface RawCompanyRecord {
  Razao_Social: string;
  Distrito: string;
  Mes_Ano: string;
  Hidrometro: string;
  Volume_Agua_m3: number;
  Valor_Total: number;
  Ano: string;
  Tarifa_Regulatoria: number;
  Valor_Regulatorio: number;
  Diferenca_Valor: number;
  Diferenca_Percentual: number;
}

export interface CompanyData {
  id: string;
  name: string;
  cnpj: string;
  distrito: string;
  lastBillingDate: string;
  totalDifference: number;
  records: RawCompanyRecord[];
}

export interface MonthlyData {
  month: string;
  date: Date;
  'Devido (Regulatório)': number;
  'Cobrado a Maior': number;
}

export interface KpiData {
    totalBilled: number;
    totalRegulatory: number;
    totalOvercharge: number;
    companyCount: number;
}

export interface AnnualCompanySummary {
    year: number;
    totalVolume: number;
    totalBilled: number;
    totalRegulatory: number;
    totalDifference: number;
    avgObservedTariff: number;
    regulatoryTariff: number;
}
