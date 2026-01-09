import React from 'react';
import { Info, X, Clock, ExternalLink } from 'lucide-react';


const JobDetails = ({ selectedJob, onClearSelection }) => (
  <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm h-fit sticky top-10 overflow-hidden">
    <div className="flex justify-between items-center mb-8">
      <h3 className="font-black text-slate-900 flex items-center gap-2 text-lg uppercase tracking-tight">
        <Info size={20} className="text-indigo-600" /> Job Intel
      </h3>
      {selectedJob && (
        <button onClick={onClearSelection} className="text-slate-300 hover:text-slate-500 transition-colors">
          <X size={20} />
        </button>
      )}
    </div>

    {selectedJob ? (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="bg-slate-900 rounded-[2rem] p-6 border border-slate-800 shadow-2xl">
          <label className="text-[10px] font-black text-slate-500 uppercase block mb-4 tracking-[0.2em]">Input Payload (JSON)</label>
          <pre className="text-indigo-300 text-[11px] font-mono overflow-auto max-h-56 leading-relaxed">
            {JSON.stringify(JSON.parse(selectedJob.payload), null, 2)}
          </pre>
        </div>
        
        <div className="space-y-4 text-sm">
          <div className="flex justify-between font-bold text-slate-400 uppercase border-b border-slate-50 pb-3">
            <span>Task Name</span> <span className="text-slate-900">{selectedJob.taskName}</span>
          </div>
          <div className="flex justify-between font-bold text-slate-400 uppercase border-b border-slate-50 pb-3">
            <span>Priority</span> <span className="text-slate-900 font-black">{selectedJob.priority}</span>
          </div>
          <div className="flex justify-between font-bold text-slate-400 uppercase border-b border-slate-50 pb-3">
            <span>Created At</span> <span className="text-slate-900 font-mono italic">{new Date(selectedJob.createdAt).toLocaleTimeString()}</span>
          </div>
          {selectedJob.completedAt && (
            <div className="flex justify-between font-bold text-emerald-500 uppercase bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
              <span>Execution End</span> <span className="font-mono">{new Date(selectedJob.completedAt).toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        {selectedJob.status === 'completed' && (
          <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-center gap-4">
            <ExternalLink size={20} className="text-indigo-600" />
            <div>
              <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">Webhook Notified</p>
              <p className="text-[11px] text-indigo-500 font-bold leading-tight mt-0.5 text-xs">External endpoint signal delivered.</p>
            </div>
          </div>
        )}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
          <Clock size={32} />
        </div>
        <p className="text-slate-400 text-sm font-bold italic px-8">Select a task from the dashboard to inspect execution data.</p>
      </div>
    )}
  </div>
);

export default JobDetails;