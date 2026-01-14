
import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div key={location.pathname} className="page-transition">
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;