
import React, { useState } from 'react';

const ShieldExclamationIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.956 11.956 0 0112 2.848a11.956 11.956 0 017.725 3.114m-7.725-3.114A11.956 11.956 0 004.275 5.962m7.725-3.114V21M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
    </svg>
);


interface NdaModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const NdaModal: React.FC<NdaModalProps> = ({ onConfirm, onCancel }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleConfirm = () => {
        if (isChecked) {
            onConfirm();
        }
    };

    return (
        <div className="modal-backdrop-enter-active fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={onCancel} role="dialog" aria-modal="true" aria-labelledby="nda-modal-title">
            <div className="modal-content-enter-active bg-white/80 backdrop-blur-lg border border-slate-200/50 rounded-xl shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <div className="p-6 text-center">
                    <div className="flex justify-center">
                        <ShieldExclamationIcon className="w-16 h-16 text-amber-500" />
                    </div>
                    <h2 id="nda-modal-title" className="text-2xl font-bold text-slate-800 mt-4">Atenção: Acesso a Dados Confidenciais</h2>
                    <p className="text-slate-600 mt-2">
                        As informações a seguir são de natureza estratégica e sigilosa. Ao prosseguir, você assume total responsabilidade pelo manuseio destes dados.
                    </p>
                </div>

                <div className="px-6 py-4 bg-slate-50/50">
                    <label htmlFor="nda-checkbox" className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-100/50 transition-colors">
                        <input
                            id="nda-checkbox"
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-sm text-slate-700">
                            Estou ciente da natureza sigilosa dos dados e confirmo ter firmado o devido Acordo de Confidencialidade (NDA) com as partes interessadas.
                        </span>
                    </label>
                </div>

                <div className="flex-shrink-0 p-5 bg-transparent flex flex-col sm:flex-row-reverse gap-3">
                    <button
                        onClick={handleConfirm}
                        disabled={!isChecked}
                        className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all"
                    >
                        Confirmar e Visualizar
                    </button>
                    <button
                        onClick={onCancel}
                        className="w-full sm:w-auto inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-6 py-2 bg-white/70 text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NdaModal;
