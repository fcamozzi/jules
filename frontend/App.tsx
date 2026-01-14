
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import FinancialImpact from './pages/FinancialImpact';
import HistoricalAnalysis from './pages/HistoricalAnalysis';
import FinancialIndicators from './pages/FinancialIndicators';
import Methodology from './pages/Methodology';
import Recommendations from './pages/Recommendations';
import Downloads from './pages/Downloads';
import IndividualAnalysis from './pages/IndividualAnalysis';
import { useData } from './contexts/DataContext';
import { useAuth } from './contexts/AuthContext';
import DataUploader from './pages/DataUploader';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';

const MainApp: React.FC = () => {
  const { isDataLoaded, isLoading } = useData();

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-100/80 flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="text-slate-700 font-semibold">Processando dados...</p>
        </div>
      </div>
    );
  }

  if (!isDataLoaded) {
    return <DataUploader />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/financial-impact" element={<FinancialImpact />} />
        <Route path="/historical-analysis" element={<HistoricalAnalysis />} />
        <Route path="/financial-indicators" element={<FinancialIndicators />} />
        <Route path="/individual-analysis" element={<IndividualAnalysis />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </Layout>
  );
};


const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <MainApp /> : <LoginPage />;
};

export default App;
