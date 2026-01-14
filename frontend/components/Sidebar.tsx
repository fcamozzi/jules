
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navigationItems, LogoIcon } from '../constants';
import type { NavItem } from '../types';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const ArrowLeftOnRectangleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
    </svg>
);

const InformationCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.25 5.25m.42-5.495a.375.375 0 11-.75 0 .375.375 0 01.75 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const Sidebar: React.FC = () => {
    const { fileName } = useData();
    const { logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setIsCollapsed(false);
    };

    const handleMouseLeave = () => {
        setIsCollapsed(true);
    };

    return (
        <aside
            className={`flex-shrink-0 bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 ease-in-out z-30 ${isCollapsed ? 'w-20' : 'w-64'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="h-20 flex items-center px-4 border-b border-slate-800">
                <div className='flex items-center gap-3 w-full'>
                    <LogoIcon className="w-10 h-10 text-blue-400 flex-shrink-0" />
                    <div className={`flex items-center justify-between flex-grow gap-2 transition-opacity duration-200 whitespace-nowrap ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <div>
                            <h1 className="text-lg font-bold text-white">Proj. Águas Claras</h1>
                            <span className="text-xs text-slate-400">Análise tarifária</span>
                        </div>
                        <div className="relative flex items-center">
                            <button onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} onFocus={() => setShowTooltip(true)} onBlur={() => setShowTooltip(false)} aria-describedby="op-tooltip">
                                <InformationCircleIcon className="w-5 h-5 text-slate-400 hover:text-blue-500 transition-colors" />
                            </button>
                            {showTooltip && (
                                <div id="op-tooltip" role="tooltip" className="absolute z-50 w-72 p-3 text-sm font-light text-white bg-slate-800 rounded-lg shadow-lg left-full ml-4 top-1/2 -translate-y-1/2">
                                    <div className="font-semibold text-base mb-1 text-white">Projeto Águas Claras</div>
                                    <p className="text-slate-300 whitespace-normal">"Águas" remete ao tema, enquanto "Claras" evoca transparência e a ação de trazer à luz o que estava turvo nas faturas. O objetivo é "clarear" as contas e torná-las transparentes.</p>
                                    <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-slate-800"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
                {navigationItems.map((item: NavItem) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ` +
                            (isActive
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-slate-800 hover:text-white')
                        }
                    >
                        <span className="mr-3">{item.icon}</span>
                        <span className={`transition-opacity duration-200 whitespace-nowrap ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
            <div className={`px-4 py-4 border-t border-slate-800 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="text-xs text-slate-500 space-y-1 mb-4">
                    {fileName && (
                        <p className="truncate" title={fileName}>
                            Arquivo: <span className="text-slate-300 font-medium">{fileName}</span>
                        </p>
                    )}
                    <p>Dashboard v3.0</p>
                    <p>Agosto 2025</p>
                </div>
                <NavLink
                    to="/logout"
                    className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 bg-slate-800 text-slate-300 hover:bg-red-600 hover:text-white"
                >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
                    Sair
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
