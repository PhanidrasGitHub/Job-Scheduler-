import React from 'react';
import { Search } from 'lucide-react';
import JobTable from './JobTable';

const Jobs = ({ jobs, filters, setFilters, onRun, onSelect, selectedId, loading }) => (
  <div className="lg:col-span-2 space-y-8">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
        <input 
          placeholder="Search by task name..."
          className="w-full pl-14 pr-4 py-5 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm outline-none focus:ring-4 focus:ring-indigo-50 transition-all font-semibold placeholder:text-slate-300"
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
        />
      </div>
      <div className="flex gap-3">
        <select 
          className="bg-white border border-slate-100 rounded-2xl px-6 py-4 shadow-sm font-black text-slate-500 outline-none cursor-pointer text-xs uppercase"
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="all">Status: All</option>
          <option value="pending">Pending</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
        </select>
        <select 
          className="bg-white border border-slate-100 rounded-2xl px-6 py-4 shadow-sm font-black text-slate-500 outline-none cursor-pointer text-xs uppercase"
          value={filters.priority}
          onChange={(e) => setFilters({...filters, priority: e.target.value})}
        >
          <option value="all">Priority: All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
    <JobTable jobs={jobs} onRun={onRun} onSelect={onSelect} selectedId={selectedId} loading={loading} />
  </div>
);

export default Jobs;