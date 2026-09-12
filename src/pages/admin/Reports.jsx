import { useMemo, useState } from 'react';
import { FileBarChart, Eye, Reply, ArrowRight, CalendarDays, Clock3, CheckSquare, Square } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import FilterBar from '../../components/admin/FilterBar';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const initialReports = [
  { from: 'Sara Khan (Patient)', to: 'Dr. Ali Raza (Doctor)', subject: 'Please review my blood test report at your earliest.', date: '25 May 2026 · 10:30 AM', priority: 'Normal', response: '' },
  { from: 'Dr. Usman Tariq (Doctor)', to: 'Ayesha Malik (Patient)', subject: 'Sharing your X-Ray report. Please check and follow.', date: '24 May 2026 · 09:15 AM', priority: 'Higher', response: '' },
  { from: 'Fatima Rizvi (Patient)', to: 'Dr. Fatima Rizvi (Doctor)', subject: 'Attached is my MRI report for your review.', date: '24 May 2026 · 04:20 PM', priority: 'Normal', response: '' },
];

function parsePerson(value) {
  const match = value.match(/^(.*) \((.*)\)$/);
  return { name: match?.[1] || value, role: match?.[2] || '' };
}

function personImage(person) {
  return person.role === 'Patient' ? '/images/fimage.png' : '/images/image.png';
}

function PriorityDisplay({ priority }) {
  return (
    <div className="space-y-1 text-[10px] font-semibold">
      <span className={`flex items-center gap-1 ${priority === 'Higher' ? 'text-coral-500' : 'text-ink-900/55'}`}>{priority === 'Higher' ? <CheckSquare size={14} /> : <Square size={14} />}Higher Priority</span>
      <span className={`flex items-center gap-1 ${priority === 'Normal' ? 'text-mint-500' : 'text-ink-900/55'}`}>{priority === 'Normal' ? <CheckSquare size={14} /> : <Square size={14} />}Normal</span>
    </div>
  );
}

export default function Reports() {
  const [reports, setReports] = useState(initialReports);
  const [selectedReport, setSelectedReport] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [directionFilter, setDirectionFilter] = useState('All Direction');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [search, setSearch] = useState('');

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const from = parsePerson(report.from);
      const to = parsePerson(report.to);
      const matchesSearch =
        !query ||
        from.name.toLowerCase().includes(query) ||
        to.name.toLowerCase().includes(query) ||
        report.subject.toLowerCase().includes(query);

      const matchesDirection = directionFilter === 'All Direction' || (directionFilter === 'Sent' ? report.from.includes('(Doctor)') : report.to.includes('(Doctor)'));
      const matchesPriority = priorityFilter === 'All Priority' || report.priority === priorityFilter;
      const matchesDate = dateFilter === 'All Dates' || report.date.includes(dateFilter);

      return matchesSearch && matchesDirection && matchesPriority && matchesDate;
    });
  }, [dateFilter, directionFilter, priorityFilter, reports, search]);

  const openReport = (report, mode = 'view') => {
    setSelectedReport({ ...report, mode });
    setReplyText(report.response || '');
  };

  const handleSendReply = () => {
    if (!selectedReport) return;

    setReports((current) =>
      current.map((report) =>
        report.subject === selectedReport.subject && report.date === selectedReport.date
          ? { ...report, response: replyText.trim() }
          : report
      )
    );

    setSelectedReport(null);
    setReplyText('');
  };

  return (
    <div>
      <PageHeader icon={FileBarChart} title="Reports" subtitle="All reports exchanged between doctors and patients." />
      <div className="mb-5 flex items-center justify-end gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-100 text-brand-600"><FileBarChart size={23} strokeWidth={2.2} /></span>
        <div><p className="text-xs font-bold text-ink-900/50">Total Reports</p><p className="font-display text-2xl font-bold leading-none text-brand-700">{reports.length}</p></div>
      </div>
      <div className="mb-6">
        <FilterBar
          filters={[
            { label: 'All Direction', options: ['Sent', 'Received'], value: directionFilter, onChange: (event) => setDirectionFilter(event.target.value) },
            { label: 'All Priority', options: ['Normal', 'Higher'], value: priorityFilter, onChange: (event) => setPriorityFilter(event.target.value) },
            { label: 'All Dates', options: ['Today', 'This Week', 'This Month'], value: dateFilter, onChange: (event) => setDateFilter(event.target.value) },
          ]}
          searchPlaceholder="Search by name, email or subject..."
          onSearch={(event) => setSearch(event.target.value)}
        />
      </div>
      <Card>
        <div className="hidden overflow-hidden lg:block">
          <table className="w-full table-fixed text-left text-[10px] xl:text-xs">
            <thead>
              <tr className="border-b border-sand-200 text-xs font-semibold uppercase tracking-wide text-ink-900/40">
                <th className="w-10 py-3 pr-3">#</th>
                <th className="py-3 pr-4">From</th>
                <th className="w-8 py-3 pr-2" />
                <th className="py-3 pr-4">To</th>
                <th className="py-3 pr-4">Subject / Message</th>
                <th className="py-3 pr-4">Sent Date & Time</th>
                <th className="py-3 pr-4">Priority</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((r, i) => {
                const from = parsePerson(r.from);
                const to = parsePerson(r.to);
                const [date, time] = r.date.split(' · ');
                return (
                  <tr key={`${r.subject}-${i}`} className="border-b border-sand-100 last:border-0">
                    <td className="py-3 pr-3 text-xs font-semibold text-ink-900/70">{i + 1}</td>
                    <td className="py-3 pr-4"><div className="flex min-w-0 items-center gap-2"><Avatar name={from.name} src={personImage(from)} size={34} /><div className="min-w-0"><p className="truncate font-semibold text-ink-900">{from.name}</p><p className="text-[9px] text-ink-900/45">{from.role}</p></div></div></td>
                    <td className="py-3 pr-2 text-center"><ArrowRight size={17} className="text-brand-600" /></td>
                    <td className="py-3 pr-4"><div className="flex min-w-0 items-center gap-2"><Avatar name={to.name} src={personImage(to)} size={34} /><div className="min-w-0"><p className="truncate font-semibold text-ink-900">{to.name}</p><p className="text-[9px] text-ink-900/45">{to.role}</p></div></div></td>
                    <td className="py-3 pr-4 truncate font-semibold text-ink-900/70">{r.subject}</td>
                    <td className="py-3 pr-4"><span className="text-xs font-semibold text-ink-900/70"><span className="flex items-center gap-1"><CalendarDays size={13} className="text-brand-600" />{date}</span><span className="mt-1 flex items-center gap-1 text-[10px] text-ink-900/55"><Clock3 size={12} className="text-brand-600" />{time}</span></span></td>
                    <td className="py-3 pr-4"><PriorityDisplay priority={r.priority} /></td>
                    <td className="py-3 pr-4">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" icon={Eye} onClick={() => openReport(r, 'view')}>View</Button>
                        <Button size="sm" variant="secondary" icon={Reply} onClick={() => openReport(r, 'reply')}>Reply</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="space-y-4 lg:hidden">
          {filteredReports.map((r, i) => {
            const from = parsePerson(r.from);
            const to = parsePerson(r.to);
            return (
              <article key={`${r.subject}-${i}`} className="rounded-xl bg-sand-50 p-4">
                <div className="flex items-start gap-3"><span className="pt-2 text-xs font-bold text-ink-900/45">{i + 1}</span><Avatar name={from.name} src={personImage(from)} size={42} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-ink-900">{from.name}</p><p className="text-xs text-ink-900/45">{from.role}</p><div className="mt-2 flex items-center gap-2 text-xs font-semibold text-ink-900/70"><ArrowRight size={14} className="text-brand-600" />{to.name} <span className="text-ink-900/45">({to.role})</span></div></div></div>
                <p className="mt-4 text-xs font-semibold leading-5 text-ink-900/75">{r.subject}</p><div className="mt-3 flex items-center justify-between gap-3"><span className="flex items-center gap-1 text-[10px] text-ink-900/60"><CalendarDays size={13} className="text-brand-600" />{r.date}</span><PriorityDisplay priority={r.priority} /></div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" icon={Eye} onClick={() => openReport(r, 'view')}>View</Button>
                  <Button size="sm" variant="secondary" icon={Reply} onClick={() => openReport(r, 'reply')}>Reply</Button>
                </div>
              </article>
            );
          })}
        </div>
      </Card>

      <Modal
        open={Boolean(selectedReport)}
        onClose={() => setSelectedReport(null)}
        title={selectedReport?.mode === 'reply' ? 'Reply to Report' : 'Report Details'}
        footer={
          selectedReport?.mode === 'reply' ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setSelectedReport(null)}>Close</Button>
              <Button size="sm" onClick={handleSendReply}>Send Reply</Button>
            </>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setSelectedReport(null)}>Close</Button>
          )
        }
      >
        {selectedReport && selectedReport.mode === 'reply' ? (
          <div className="space-y-3">
            <p className="text-sm text-ink-900/70">Reply to <span className="font-semibold text-ink-900">{parsePerson(selectedReport.from).name}</span>.</p>
            <textarea
              value={replyText}
              onChange={(event) => setReplyText(event.target.value)}
              rows={4}
              placeholder="Write the reply message"
              className="w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2 text-sm text-ink-900 outline-none focus:border-brand-400"
            />
          </div>
        ) : selectedReport ? (
          <div className="space-y-4 text-sm text-ink-900/70">
            <div className="flex items-center gap-3">
              <Avatar name={parsePerson(selectedReport.from).name} src={personImage(parsePerson(selectedReport.from))} size={48} />
              <div>
                <p className="font-display text-lg font-bold text-ink-900">{parsePerson(selectedReport.from).name}</p>
                <p className="text-xs font-semibold text-brand-600">{parsePerson(selectedReport.from).role}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">To</p><p className="mt-1 font-semibold text-ink-900">{parsePerson(selectedReport.to).name}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Priority</p><p className="mt-1 font-semibold text-ink-900">{selectedReport.priority}</p></div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Subject</p>
              <p className="mt-1 font-semibold text-ink-900">{selectedReport.subject}</p>
            </div>
            {selectedReport.response && (
              <div className="rounded-xl bg-brand-50 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-brand-700">Reply</p>
                <p className="mt-2 text-sm text-ink-900/75">{selectedReport.response}</p>
              </div>
            )}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
