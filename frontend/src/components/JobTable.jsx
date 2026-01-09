import { CheckCircle, Loader2, Play } from 'lucide-react';
import StatusBadge from './StatusBadge';


const JobTable = ({ jobs, onRun, onSelect, selectedId, loading }) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em] border-b border-slate-50">
          <tr>
            <th className="px-8 py-5">Task Details</th>
            <th className="px-8 py-5">Status</th>
            <th className="px-8 py-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {jobs.length > 0 ? jobs.map(job => (
            <tr 
              key={job.id} 
              onClick={() => onSelect(job)}
              className={`hover:bg-slate-50/50 transition-colors cursor-pointer group ${selectedId === job.id ? 'bg-indigo-50/30' : ''}`}
            >
              <td className="px-8 py-5">
                <div className="font-bold text-slate-800 text-base">{job.taskName}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                    job.priority === 'High' ? 'bg-rose-100 text-rose-600' : 
                    job.priority === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {job.priority}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">#{job.id}</span>
                </div>
              </td>
              <td className="px-8 py-5">
                <StatusBadge status={job.status} />
              </td>
              <td className="px-8 py-5 text-right">
                {job.status === 'pending' && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onRun(job.id); }}
                    className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white rounded-xl transition-all shadow-sm"
                  >
                    <Play size={18} fill="currentColor" />
                  </button>
                )}
                {job.status === 'running' && <Loader2 size={20} className="text-blue-400 animate-spin ml-auto" />}
                {job.status === 'completed' && <CheckCircle size={20} className="text-emerald-500 ml-auto" />}
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="3" className="px-8 py-20 text-center text-slate-300 font-medium italic">
                {loading ? 'Refreshing engine...' : 'No automation records found.'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;