import { FileText, Inbox, Send, ChevronDown, CalendarDays, Clock3, MoreVertical, ArrowRight } from 'lucide-react';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

const reports = [
  { patient: 'Ali Raza', mrn: 'MRN: 1023', type: 'Received', date: 'Oct 25, 2024', kind: 'Lab Report' },
  { patient: 'Sara Khan', mrn: 'MRN: 1024', type: 'Received', date: 'Oct 25, 2024', kind: 'Blood Test' },
  { patient: 'Ahmed Javed', mrn: 'MRN: 1025', type: 'Sent', date: 'Oct 25, 2024', kind: 'Prescription' },
  { patient: 'Fatima Noor', mrn: 'MRN: 1026', type: 'Received', date: 'Oct 25, 2024', kind: 'X-Ray' },
  { patient: 'Bilal Ahmed', mrn: 'MRN: 1028', type: 'Received', date: 'Oct 24, 2024', kind: 'MRI Report' },
];

const patientImages = ['/images/image.png', '/images/fimage.png', '/images/image.png', '/images/fimage.png', '/images/image.png'];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Reports</h1>
        <p className="mt-2 text-sm font-semibold text-ink-900/70">View and manage all your reports.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="flex items-center gap-4 p-4 sm:p-5">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-600"><Inbox size={32} strokeWidth={2} /></span>
          <div><p className="font-display text-3xl font-bold text-brand-600">32</p><p className="text-xs font-semibold text-ink-900/60 sm:text-sm">Reports sent by patients to you</p></div>
        </Card>
        <Card className="flex items-center gap-4 p-4 sm:p-5">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-600"><Send size={32} strokeWidth={2} /></span>
          <div><p className="font-display text-3xl font-bold text-brand-600">18</p><p className="text-xs font-semibold text-ink-900/60 sm:text-sm">Reports you have sent to patients</p></div>
        </Card>
      </div>

      <Card className="p-4 sm:p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div><h2 className="font-display text-base font-bold text-brand-600 sm:text-lg">All Reports</h2><p className="text-xs font-semibold text-ink-900/70">View, filter and access all patient reports.</p></div>
          <button className="flex items-center gap-8 text-xs font-bold text-ink-900">All Reports <ChevronDown size={16} className="text-brand-600" /></button>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[800px] text-left">
            <thead><tr className="text-[11px] font-bold text-ink-900/70"><th className="px-2 py-3">Patient</th><th className="px-2 py-3">Type</th><th className="px-2 py-3">Date</th><th className="px-2 py-3">Report Type</th><th className="px-2 py-3">Actions</th></tr></thead>
            <tbody>{reports.map((report, index) => <tr key={report.mrn} className="border-t border-sand-100 text-xs font-semibold text-ink-900">
              <td className="px-2 py-3"><div className="flex items-center gap-3"><Avatar name={report.patient} src={patientImages[index % patientImages.length]} size={42} /><div><p className="font-bold">{report.patient}</p><p className="text-[10px] text-ink-900/60">{report.mrn}</p></div></div></td>
              <td className="px-2 py-3"><span className={`flex items-center gap-2 font-bold ${report.type === 'Sent' ? 'text-brand-600' : 'text-brand-600'}`}>{report.type === 'Sent' ? <Send size={19} /> : <Inbox size={19} />}<Badge tone={report.type === 'Sent' ? 'mint' : 'brand'}>{report.type}</Badge></span></td>
              <td className="px-2 py-3"><div className="flex flex-col gap-1 text-[11px]"><span className="flex items-center gap-1"><CalendarDays size={13} className="text-brand-600" />{report.date}</span><span className="flex items-center gap-1"><Clock3 size={13} className="text-brand-600" />09:00 AM</span></div></td>
              <td className="px-2 py-3">{report.kind}</td><td className="px-2 py-3"><div className="flex items-center gap-3"><Button size="sm" variant="outline" className="!px-4 !py-1.5 !text-[11px]">View Report</Button><MoreVertical size={18} /></div></td>
            </tr>)}</tbody>
          </table>
        </div>

        <div className="space-y-3 md:hidden">{reports.map((report, index) => <div key={report.mrn} className="bg-sand-50 p-4">
          <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><Avatar name={report.patient} src={patientImages[index % patientImages.length]} size={46} /><div><p className="font-bold text-ink-900">{report.patient}</p><p className="text-xs text-ink-900/55">{report.mrn}</p></div></div><MoreVertical size={18} /></div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold text-ink-900/70"><span className="flex items-center gap-1"><CalendarDays size={13} className="text-brand-600" />{report.date}</span><span>{report.kind}</span><span className="flex items-center gap-2 text-brand-600">{report.type === 'Sent' ? <Send size={17} /> : <Inbox size={17} />}<Badge tone={report.type === 'Sent' ? 'mint' : 'brand'}>{report.type}</Badge></span></div>
          <Button size="sm" variant="outline" className="mt-3 w-full" icon={ArrowRight} iconPosition="right">View Report</Button>
        </div>)}</div>
      </Card>
    </div>
  );
}
