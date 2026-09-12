import { useState } from 'react';
import { FileText, Inbox, Send, ChevronDown, CalendarDays, Clock3, MoreVertical, ArrowRight } from 'lucide-react';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const initialReports = [
  { id: 'report-1', patient: 'Ali Raza', mrn: 'MRN: 1023', type: 'Received', date: 'Oct 25, 2024', kind: 'Lab Report', time: '09:00 AM' },
  { id: 'report-2', patient: 'Sara Khan', mrn: 'MRN: 1024', type: 'Received', date: 'Oct 25, 2024', kind: 'Blood Test', time: '10:00 AM' },
  { id: 'report-3', patient: 'Ahmed Javed', mrn: 'MRN: 1025', type: 'Sent', date: 'Oct 25, 2024', kind: 'Prescription', time: '11:30 AM' },
  { id: 'report-4', patient: 'Fatima Noor', mrn: 'MRN: 1026', type: 'Received', date: 'Oct 25, 2024', kind: 'X-Ray', time: '01:15 PM' },
  { id: 'report-5', patient: 'Bilal Ahmed', mrn: 'MRN: 1028', type: 'Received', date: 'Oct 24, 2024', kind: 'MRI Report', time: '03:00 PM' },
];

const patientImages = ['/images/image.png', '/images/fimage.png', '/images/image.png', '/images/fimage.png', '/images/image.png'];

export default function Reports() {
  const [reports, setReports] = useState(initialReports);
  const [filter, setFilter] = useState('All Reports');
  const [selectedReport, setSelectedReport] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const visibleReports = filter === 'All Reports' ? reports : reports.filter((report) => report.type === filter);

  const handleMarkAsReviewed = (reportId) => {
    setReports((current) => current.map((report) => report.id === reportId ? { ...report, type: 'Sent' } : report));
    setMenuOpenId(null);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  return (
    <>
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
            <div><h2 className="font-display text-base font-bold text-brand-600 sm:text-lg">{filter}</h2><p className="text-xs font-semibold text-ink-900/70">View, filter and access all patient reports.</p></div>
            <label className="relative flex items-center gap-2 text-xs font-bold text-ink-900">
              <span className="sr-only">Filter reports</span>
              <select value={filter} onChange={(event) => setFilter(event.target.value)} className="appearance-none rounded-lg border border-sand-200 bg-white py-2 pl-3 pr-9 text-xs font-bold outline-none focus:border-brand-400">
                <option>All Reports</option>
                <option>Received</option>
                <option>Sent</option>
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-2 text-brand-600" />
            </label>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="text-[11px] font-bold text-ink-900/70">
                  <th className="px-2 py-3">Patient</th>
                  <th className="px-2 py-3">Type</th>
                  <th className="px-2 py-3">Date</th>
                  <th className="px-2 py-3">Report Type</th>
                  <th className="px-2 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleReports.map((report, index) => (
                  <tr key={report.id} className="border-t border-sand-100 text-xs font-semibold text-ink-900">
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={report.patient} src={patientImages[index % patientImages.length]} size={42} />
                        <div>
                          <p className="font-bold">{report.patient}</p>
                          <p className="text-[10px] text-ink-900/60">{report.mrn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3">
                      <span className="flex items-center gap-2 font-bold text-brand-600">
                        {report.type === 'Sent' ? <Send size={19} /> : <Inbox size={19} />}
                        <Badge tone={report.type === 'Sent' ? 'mint' : 'brand'}>{report.type}</Badge>
                      </span>
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex flex-col gap-1 text-[11px]">
                        <span className="flex items-center gap-1"><CalendarDays size={13} className="text-brand-600" />{report.date}</span>
                        <span className="flex items-center gap-1"><Clock3 size={13} className="text-brand-600" />{report.time}</span>
                      </div>
                    </td>
                    <td className="px-2 py-3">{report.kind}</td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-3">
                        <Button size="sm" variant="outline" onClick={() => handleViewReport(report)} className="!px-4 !py-1.5 !text-[11px]">
                          View Report
                        </Button>
                        <div className="relative">
                          <button
                            type="button"
                            aria-label={`More actions for ${report.patient}`}
                            onClick={() => setMenuOpenId((prev) => (prev === report.id ? null : report.id))}
                            className="grid place-items-center rounded-lg p-1.5 text-ink-900 hover:bg-sand-100"
                          >
                            <MoreVertical size={18} />
                          </button>

                          {menuOpenId === report.id && (
                            <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-sand-200 bg-white p-1 shadow-pop">
                              <button type="button" onClick={() => handleViewReport(report)} className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-xs font-semibold text-ink-900/75 hover:bg-sand-50">
                                View Report
                              </button>
                              {report.type === 'Received' && (
                                <button type="button" onClick={() => handleMarkAsReviewed(report.id)} className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-xs font-semibold text-ink-900/75 hover:bg-sand-50">
                                  Mark as Reviewed
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {visibleReports.map((report, index) => (
              <div key={report.id} className="bg-sand-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={report.patient} src={patientImages[index % patientImages.length]} size={46} />
                    <div>
                      <p className="font-bold text-ink-900">{report.patient}</p>
                      <p className="text-xs text-ink-900/55">{report.mrn}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      aria-label={`More actions for ${report.patient}`}
                      onClick={() => setMenuOpenId((prev) => (prev === report.id ? null : report.id))}
                      className="grid place-items-center rounded-lg p-1.5 text-ink-900 hover:bg-sand-100"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {menuOpenId === report.id && (
                      <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-sand-200 bg-white p-1 shadow-pop">
                        <button type="button" onClick={() => handleViewReport(report)} className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-xs font-semibold text-ink-900/75 hover:bg-sand-50">
                          View Report
                        </button>
                        {report.type === 'Received' && (
                          <button type="button" onClick={() => handleMarkAsReviewed(report.id)} className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-xs font-semibold text-ink-900/75 hover:bg-sand-50">
                            Mark as Reviewed
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold text-ink-900/70">
                  <span className="flex items-center gap-1"><CalendarDays size={13} className="text-brand-600" />{report.date}</span>
                  <span>{report.kind}</span>
                  <span className="flex items-center gap-2 text-brand-600">{report.type === 'Sent' ? <Send size={17} /> : <Inbox size={17} />}<Badge tone={report.type === 'Sent' ? 'mint' : 'brand'}>{report.type}</Badge></span>
                  <span className="flex items-center gap-1"><Clock3 size={13} className="text-brand-600" />{report.time}</span>
                </div>

                <Button size="sm" variant="outline" onClick={() => handleViewReport(report)} className="mt-3 w-full" icon={ArrowRight} iconPosition="right">
                  View Report
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Modal
        open={Boolean(selectedReport)}
        onClose={() => setSelectedReport(null)}
        title={selectedReport?.kind || 'Report Details'}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setSelectedReport(null)}>Close</Button>
            {selectedReport?.type === 'Received' && (
              <Button size="sm" onClick={() => handleMarkAsReviewed(selectedReport.id)}>Mark Reviewed</Button>
            )}
          </>
        }
      >
        {selectedReport && (
          <div className="space-y-4 text-sm text-ink-900/70">
            <div className="flex items-center gap-3">
              <Avatar name={selectedReport.patient} src={patientImages[0]} size={52} />
              <div>
                <p className="font-display text-lg font-bold text-ink-900">{selectedReport.patient}</p>
                <p className="text-xs font-semibold text-brand-600">{selectedReport.mrn}</p>
              </div>
            </div>

            <div className="grid gap-3 rounded-xl border border-sand-200 bg-sand-50 p-3 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Report Type</p>
                <p className="mt-1 font-semibold text-ink-900">{selectedReport.kind}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Status</p>
                <p className="mt-1 font-semibold text-ink-900">{selectedReport.type}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Date</p>
                <p className="mt-1 font-semibold text-ink-900">{selectedReport.date}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Time</p>
                <p className="mt-1 font-semibold text-ink-900">{selectedReport.time}</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Summary</p>
              <p className="mt-2 leading-6 text-ink-900/70">
                This report was submitted by {selectedReport.patient} and classified as {selectedReport.kind.toLowerCase()}. You can review it and, if needed, mark it as reviewed.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
