import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-[#131314] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 flex`}>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 overflow-hidden bg-gray-50 dark:bg-[#1e1f20] border-r border-gray-200 dark:border-gray-800 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-medium tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent truncate">
            PyFoot Mart ✦
          </h1>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
            <span className="mr-3 text-lg">📊</span>
            Dashboard
          </a>
          <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="mr-3 text-lg">🗺️</span>
            Rutas Inteligentes
          </a>
          <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="mr-3 text-lg">🎫</span>
            Promociones
          </a>
          <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="mr-3 text-lg">⚙️</span>
            Configuración
          </a>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@pyfoot.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-gray-200 dark:border-gray-800/50">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {!sidebarOpen && (
              <span className="ml-4 text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                PyFoot Mart
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
              title="Cambiar tema"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">Bienvenido, Admin</h2>
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800/50">
                Sistema en línea
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#1e1f20] border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ventas Hoy</h3>
                  <span className="text-green-500 bg-green-50 dark:bg-green-500/10 p-1.5 rounded-lg text-xs font-medium group-hover:scale-110 transition-transform">
                    +12%
                  </span>
                </div>
                <p className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">S/ 1,240.00</p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#1e1f20] border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rutas Activas</h3>
                  <span className="text-purple-500 bg-purple-50 dark:bg-purple-500/10 p-1.5 rounded-lg text-xs font-medium group-hover:scale-110 transition-transform">
                    Dijkstra
                  </span>
                </div>
                <p className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">14</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">4 repartidores en tránsito</p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#1e1f20] border border-gray-200 dark:border-gray-800 hover:border-pink-500/50 dark:hover:border-pink-500/50 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-pink-500/10 rounded-full blur-xl group-hover:bg-pink-500/20 transition-colors"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Optimizaciones</h3>
                  <span className="text-pink-500 text-lg group-hover:rotate-12 transition-transform">✦</span>
                </div>
                <p className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white relative z-10">342</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 relative z-10">Rutas calculadas hoy</p>
              </div>

            </div>

            {/* AI Engine Status Area */}
            <div className="p-1 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20">
              <div className="p-6 rounded-[14px] bg-white dark:bg-[#131314] h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900/[0.04] bg-[size:20px_20px]"></div>
                <div className="relative z-10">
                  <h3 className="text-lg font-medium flex items-center mb-4">
                    <span className="mr-2 text-xl text-purple-500">🧠</span>
                    Motor Lógico de Mate Superior
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gray-50 dark:bg-[#1e1f20] rounded-xl border border-gray-100 dark:border-gray-800">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-4 animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Motor de Grafos (Dijkstra) Activo</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Analizando el tráfico en 12 cuadrantes.</p>
                      </div>
                      <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                        Ver Mapa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
