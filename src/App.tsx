import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';

// Componente de fallback para erros
const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string>('');

  useEffect(() => {
    // Handler para erros não capturados na aplicação
    const handleError = (event: ErrorEvent) => {
      console.error('Erro não tratado capturado pelo ErrorBoundary:', event.error);
      setHasError(true);
      setErrorInfo(event.error?.message || 'Erro desconhecido');
      event.preventDefault(); // Impedir que o erro seja mostrado no console novamente
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
        <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold mb-4 text-red-400">Algo deu errado</h1>
          <p className="mb-6 text-gray-300">
            Ocorreu um erro inesperado. Por favor, tente recarregar a página.
          </p>
          {errorInfo && (
            <div className="mb-6 p-3 bg-gray-700 rounded overflow-x-auto">
              <p className="text-sm font-mono text-gray-300">{errorInfo}</p>
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded font-medium transition-colors"
          >
            Recarregar Página
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/landing/:id" element={<LandingPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;