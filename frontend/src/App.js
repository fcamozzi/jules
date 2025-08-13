import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ClientListPage from './pages/ClientListPage';
import ContractListPage from './pages/ContractListPage'; // Importar a nova página
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clients" element={<ClientListPage />} />
            <Route path="/contracts" element={<ContractListPage />} /> {/* Adicionar a nova rota */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
