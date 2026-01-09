import React from 'react'
import { RefreshCw, Plus } from 'lucide-react';


const Header = ({ onOpenModal, onRefresh, loading }) => (
  <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
    <div>
      <h1 className="text-4xl font-black text-indigo-600 tracking-tighter italic uppercase">DOTIX.SYS</h1>
      <p className="text-slate-400 font-semibold tracking-wide text-sm mt-1 uppercase">
        Job Scheduler & Automation Dashboard
      </p>
    </div>
    <div className="flex gap-3 w-full md:w-auto">
      <button 
        onClick={onRefresh} 
        className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 shadow-sm transition-all"
      >
        <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
      </button>
      <button 
        onClick={onOpenModal}
        className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 transition-all active:scale-95"
      >
        <Plus size={20} /> CREATE JOB
      </button>
    </div>
  </header>
);

export default Header;