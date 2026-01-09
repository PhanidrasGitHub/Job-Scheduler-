
import { Loader2, CheckCircle, Clock } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-slate-100 text-slate-600 border-slate-200",
    running: "bg-blue-50 text-blue-600 border-blue-200 animate-pulse",
    completed: "bg-emerald-50 text-emerald-600 border-emerald-200"
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border flex items-center gap-1.5 w-fit ${styles[status]}`}>
      {status === 'running' && <Loader2 size={10} className="animate-spin" />}
      {status === 'completed' && <CheckCircle size={10} />}
      {status === 'pending' && <Clock size={10} />}
      {status}
    </span>
  );
};
export default StatusBadge;