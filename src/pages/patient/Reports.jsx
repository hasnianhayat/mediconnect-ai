import { Bot, CheckCircle2, Download, FileCheck2, FileText, MoreVertical, Upload } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const submitted = [
  { title: 'Blood Test Report', with: 'Dr. Ali Raza (Cardiologist)', date: '20 May 2026 · 10:30 AM', status: 'Under Review', note: 'Doctor is reviewing your report.' },
  { title: 'X-Ray Chest', with: 'Dr. Sara Khan (Pulmonologist)', date: '18 May 2026 · 02:00 PM', status: 'Reviewed', note: 'Doctor has reviewed your report.' },
];
const received = [
  { title: 'Consultation Summary', from: 'Dr. Ali Raza (Cardiologist)', date: '21 May 2026 · 11:30 AM' },
  { title: 'Skin Analysis Report', from: 'Dr. Sara Khan (Dermatologist)', date: '17 May 2026 · 02:15 PM' },
];

export default function Reports() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader icon={FileText} title="My Reports" subtitle="Access and manage all your medical reports in one place" action={<Button icon={Upload} size="sm" className="!border-0 !shadow-none px-3 py-2 text-xs">Upload Report</Button>} />

      <ReportSection title="Reports I Submitted to Doctors" count={submitted.length} tone="brand" icon={FileCheck2} action="View All Submitted Reports">
        {submitted.map((r) => (
          <div key={r.title} className="grid gap-3 py-4 sm:grid-cols-[36px_minmax(190px,1.25fr)_minmax(160px,1fr)_120px_20px] sm:items-center sm:gap-4">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-brand-50 text-brand-700"><FileText size={15} /></span>
            <div>
              <p className="text-sm font-bold text-ink-900">{r.title}</p>
              <p className="mt-1 text-xs text-ink-900/60">Shared with: {r.with}</p>
              <p className="mt-1 text-xs text-ink-900/50">{r.date}</p>
            </div>
            <div>
              <p className={`flex items-center gap-1 text-xs font-bold ${r.status === 'Reviewed' ? 'text-mint-500' : 'text-brand-600'}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" /> {r.status}
              </p>
              <p className="mt-1 text-xs leading-4 text-ink-900/60">{r.note}</p>
            </div>
            <Button variant="outline" size="sm" className="!border-0 !shadow-none w-fit px-3 py-1.5 text-xs">View Report</Button>
            <button type="button" aria-label={`More options for ${r.title}`} className="text-ink-900/55 hover:text-brand-700"><MoreVertical size={16} /></button>
          </div>
        ))}
      </ReportSection>

      <ReportSection title="Reports I Received from Doctors" count={received.length} tone="mint" icon={Download} action="View All Received Reports">
        {received.map((r) => (
          <div key={r.title} className="grid gap-3 py-4 sm:grid-cols-[36px_minmax(190px,1.25fr)_minmax(160px,1fr)_210px_20px] sm:items-center sm:gap-4">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-mint-50 text-mint-500"><Download size={15} /></span>
            <div>
              <p className="text-sm font-bold text-ink-900">{r.title}</p>
              <p className="mt-1 text-xs text-ink-900/60">From: {r.from}</p>
              <p className="mt-1 text-xs text-ink-900/50">{r.date}</p>
            </div>
            <div className="space-y-1">
              <p className="flex items-center gap-1 text-xs font-bold text-mint-500"><CheckCircle2 size={13} /> Received</p>
              <p className="text-xs leading-4 text-ink-900/60">Doctor has shared this report with you.</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Button variant="outline" size="sm" className="!border-0 !shadow-none px-3 py-1.5 text-xs">View Report</Button>
              <Button size="sm" icon={Bot} className="!border-0 !shadow-none px-3 py-1.5 text-xs">Open AI Assistant</Button>
            </div>
            <button type="button" aria-label={`More options for ${r.title}`} className="text-ink-900/55 hover:text-brand-700"><MoreVertical size={16} /></button>
          </div>
        ))}
      </ReportSection>
    </div>
  );
}

function ReportSection({ title, count, tone, icon: Icon, action, children }) {
  const tones = {
    brand: 'text-brand-700 bg-brand-50',
    mint: 'text-mint-500 bg-mint-50',
  };

  return (
    <Card className="mb-5 !border-0 !shadow-none !p-4 sm:!p-5">
      <div className="mb-2 flex items-center gap-3 pb-3">
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}><Icon size={22} strokeWidth={2.1} /></span>
        <h3 className="font-display text-base font-bold text-ink-900 sm:text-lg">{title}</h3>
        <span className={`ml-auto grid h-7 min-w-7 place-items-center rounded-full px-2 text-xs font-bold ${tones[tone]}`}>{count}</span>
      </div>
      {children}
      <button type="button" className={`ml-auto flex items-center pt-3 text-xs font-semibold ${tones[tone].split(' ')[0]} hover:underline`}>
        {action} <span className="ml-1">&#8594;</span>
      </button>
    </Card>
  );
}
