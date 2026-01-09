import { useState, useEffect, useCallback, useMemo } from 'react';
import {  AlertCircle,X } from 'lucide-react';
import Header from '../components/Header';
import Jobs from '../components/Jobs';
import JobDetails from '../components/JobDetails';
import jobService from '../services/jobService';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: 'all', priority: 'all', search: '' });

  const [form, setForm] = useState({ 
    taskName: '', 
    priority: 'Medium', 
    payload: '{\n  "email": "user@example.com",\n  "type": "sync"\n}' 
  });

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await jobService.getAllJobs(filters.status, filters.priority);
      setJobs(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('Connection to Dotix Backend failed. Ensure the server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.priority]);

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 5000);
    return () => clearInterval(interval);
  }, [fetchJobs]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const parsedPayload = JSON.parse(form.payload);
      await jobService.createJob({ ...form, payload: parsedPayload });
      setIsModalOpen(false);
      setForm({ taskName: '', priority: 'Medium', payload: '{\n  "email": "user@example.com"\n}' });
      fetchJobs();
    } catch (err) {
      alert(err instanceof SyntaxError ? "Invalid JSON Payload" : err.message);
    }
  };

  const handleRun = async (id) => {
    try {
      await jobService.runJob(id);
      fetchJobs();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(j => j.taskName.toLowerCase().includes(filters.search.toLowerCase()));
  }, [jobs, filters.search]);

  return (
    <div className="min-h-screen bg-[#F9FAFC] p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        

        <Header onOpenModal={() => setIsModalOpen(true)} onRefresh={fetchJobs} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <Jobs 
            jobs={filteredJobs} 
            filters={filters} 
            setFilters={setFilters} 
            onRun={handleRun} 
            onSelect={setSelectedJob} 
            selectedId={selectedJob?.id} 
            loading={loading} 
          />
          <JobDetails selectedJob={selectedJob} onClearSelection={() => setSelectedJob(null)} />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-[3.5rem] w-full max-w-xl p-10 md:p-12 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter text-sm">Define Job</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-slate-500">
                <X size={28} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 ml-2 tracking-widest">Job Alias</label>
                <input 
                  required 
                  className="w-full bg-slate-50 border-none rounded-2xl p-5 focus:ring-4 focus:ring-indigo-50 outline-none font-bold placeholder:text-slate-300" 
                  value={form.taskName} 
                  onChange={e => setForm({...form, taskName: e.target.value})} 
                  placeholder="e.g. Daily Data Sync" 
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 ml-2 tracking-widest">Priority Class</label>
                  <select 
                    className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold outline-none cursor-pointer appearance-none" 
                    value={form.priority} 
                    onChange={e => setForm({...form, priority: e.target.value})}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="bg-indigo-50 rounded-3xl p-5 flex items-center gap-4 border border-indigo-100">
                  <AlertCircle className="text-indigo-400 shrink-0" size={24} />
                  <p className="text-[11px] text-indigo-700 leading-tight font-black uppercase">Initial state is PENDING.</p>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 ml-2 tracking-widest">Execution Payload (JSON)</label>
                <textarea 
                  rows="5" 
                  className="w-full bg-slate-900 text-indigo-300 font-mono text-[13px] rounded-[2rem] p-8 outline-none focus:ring-4 focus:ring-indigo-100 shadow-inner" 
                  value={form.payload} 
                  onChange={e => setForm({...form, payload: e.target.value})} 
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 py-5 font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest text-xs"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-indigo-600 text-white font-black rounded-[2rem] py-5 shadow-2xl shadow-indigo-100 active:scale-95 transition-all uppercase tracking-widest text-xs"
                >
                  Schedule Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;