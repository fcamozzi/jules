
import React from 'react';
import { NavItem } from './types';

// This data represents the financial modeling results (OPEX, Capital Remuneration, etc.)
// which are merged with the user-uploaded consumption data.
export const financialBaseData = [
  {
    year: 2021,
    observedTariff: 14.99,
    calculatedRealTariff: 15.09,
    calculatedRegulatoryTariff: 8.15,
    billedVolume: 3.66,
    opex: 43.00,
    rc: 7.99,
    dep: 4.26,
    requiredRevenue: 55.25,
  },
  {
    year: 2022,
    observedTariff: 12.10,
    calculatedRealTariff: 19.14,
    calculatedRegulatoryTariff: 7.01,
    billedVolume: 4.56,
    opex: 74.25,
    rc: 8.48,
    dep: 4.53,
    requiredRevenue: 87.26,
  },
  {
    year: 2023,
    observedTariff: 9.28,
    calculatedRealTariff: 13.31,
    calculatedRegulatoryTariff: 5.76,
    billedVolume: 6.20,
    opex: 65.59,
    rc: 11.02,
    dep: 5.88,
    requiredRevenue: 82.50,
  },
  {
    year: 2024,
    observedTariff: 11.10,
    calculatedRealTariff: 24.06,
    calculatedRegulatoryTariff: 5.75,
    billedVolume: 6.24,
    opex: 133.98,
    rc: 10.54,
    dep: 5.62,
    requiredRevenue: 150.15,
  },
];

// SVG Icons as React Components
export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 14C29.5228 14 34 18.4772 34 24C34 29.5228 29.5228 34 24 34" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 24C4 18.4772 8.47715 14 14 14C19.5228 14 24 18.4772 24 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const ChartBarIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const ChartPieIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
  </svg>
);

const DocumentChartBarIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125v-15A1.125 1.125 0 013.375 2.25h1.598a1.125 1.125 0 011.007.683l.815 2.853a.375.375 0 01-.16.425l-2.062.972a.375.375 0 00-.16.425l3.528 6.516a.375.375 0 00.425.16l2.063-.972a.375.375 0 01.425.16L19.5 19.5m-16.125 0h17.25" />
  </svg>
);

const DocumentIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m-1.5 0h-1.5A2.25 2.25 0 003.375 6v12a2.25 2.25 0 002.25 2.25h12a2.25 2.25 0 002.25-2.25v-6.75M19.5 12l-6-6m0 0l-6 6m6-6v12.75" />
  </svg>
);

const ScaleIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c-.317.047-.634.092-.95.132m-11.6 0c-.317.047-.634.092-.95.132m0 0a48.11 48.11 0 013.478-.397m7.4 0a48.11 48.11 0 003.478-.397M6.75 6.175c.616.054 1.232.096 1.85.127m9.75 0c.618-.03 1.232-.073 1.85-.127M6.75 6.175L3 11.25l3.75 5.075M17.25 6.175L21 11.25l-3.75 5.075" />
  </svg>
);

const ArrowDownTrayIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const HomeIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

const ClockIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const PresentationChartLineIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 21h16.5M12 16.5v4.5" />
    </svg>
);


export const navigationItems: NavItem[] = [
  {
    name: 'Visão Geral',
    path: '/',
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    name: 'Análise Histórica',
    path: '/historical-analysis',
    icon: <ClockIcon className="w-6 h-6" />,
  },
  {
    name: 'Impacto Financeiro',
    path: '/financial-impact',
    icon: <ChartBarIcon className="w-6 h-6" />,
  },
  {
    name: 'Indicadores Financeiros',
    path: '/financial-indicators',
    icon: <ChartPieIcon className="w-6 h-6" />,
  },
  {
    name: 'Análise Individualizada',
    path: '/individual-analysis',
    icon: <PresentationChartLineIcon className="w-6 h-6" />,
  },
  {
    name: 'Metodologia',
    path: '/methodology',
    icon: <DocumentChartBarIcon className="w-6 h-6" />,
  },
  {
    name: 'Análise Jurídica',
    path: '/recommendations',
    icon: <ScaleIcon className="w-6 h-6" />,
  },
  {
    name: 'Downloads',
    path: '/downloads',
    icon: <ArrowDownTrayIcon className="w-6 h-6" />,
  },
];
