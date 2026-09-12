import { useMemo, useState } from 'react';
import { MessageCircleWarning, Eye, Reply, UserRound, Mail, CalendarDays, Clock3 } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import FilterBar from '../../components/admin/FilterBar';
import Card from '../../components/common/Card';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { doctors, openComplaints } from '../../data/doctors';

const senderImages = ['/images/image.png', '/images/fimage.png', '/images/image.png', '/images/fimage.png'];

const initialComplaints = openComplaints.map((complaint, index) => ({
  ...complaint,
  id: `${complaint.sender}-${index}`,
  status: 'Open',
  response: '',
}));

export default function OpenComplaints() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [replyText, setReplyText] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [search, setSearch] = useState('');

  const filteredComplaints = useMemo(() => {
    const query = search.trim().toLowerCase();

    return complaints.filter((complaint) => {
      const matchesSearch =
        !query ||
        complaint.sender.toLowerCase().includes(query) ||
        complaint.email.toLowerCase().includes(query) ||
        complaint.subject.toLowerCase().includes(query);

      const matchesRole = roleFilter === 'All Roles' || complaint.role === roleFilter;
      const matchesStatus = statusFilter === 'All Status' || complaint.status === statusFilter;
      const matchesDate = dateFilter === 'All Dates' || complaint.date.includes(dateFilter);

      return matchesSearch && matchesRole && matchesStatus && matchesDate;
    });
  }, [complaints, dateFilter, roleFilter, search, statusFilter]);

  const openComplaint = (complaint, mode = 'view') => {
    setSelectedComplaint(complaint);
    setModalMode(mode);
    setReplyText(complaint.response || '');
  };

  const handleSendReply = () => {
    if (!selectedComplaint) return;

    setComplaints((current) =>
      current.map((complaint) =>
        complaint.id === selectedComplaint.id
          ? { ...complaint, status: 'Resolved', response: replyText.trim() || complaint.response }
          : complaint
      )
    );

    setSelectedComplaint(null);
    setReplyText('');
  };

  return (
    <div>
      <PageHeader icon={MessageCircleWarning} title="Open Complaints" subtitle="These are messages received from the Contact Us form. Respond to users and resolve their queries." />
      <div className="mb-6">
        <FilterBar
          filters={[
            { label: 'All Roles', options: ['Doctor', 'Patient'], value: roleFilter, onChange: (event) => setRoleFilter(event.target.value) },
            { label: 'All Status', options: ['Open', 'Resolved'], value: statusFilter, onChange: (event) => setStatusFilter(event.target.value) },
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
                <th className="py-3 pr-4">Sender</th>
                <th className="py-3 pr-4">Role</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Subject</th>
                <th className="py-3 pr-4">Date & Time</th>
                <th className="py-3 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((c, i) => (
                <tr key={c.id} className="border-b border-sand-100 last:border-0">
                  <td className="py-3 pr-3 text-xs font-semibold text-ink-900/70">{i + 1}</td>
                  <td className="py-3 pr-4">
                    <div className="flex min-w-0 items-center gap-2">
                      <Avatar name={c.sender} src={doctors.find((doctor) => doctor.name === c.sender)?.image || senderImages[i % senderImages.length]} size={36} />
                      <div className="min-w-0"><p className="truncate font-semibold text-ink-900">{c.sender}</p><p className="text-[9px] text-ink-900/40">{c.email}</p></div>
                    </div>
                  </td>
                  <td className="py-3 pr-4"><Badge tone={c.role === 'Doctor' ? 'mint' : 'brand'} icon={UserRound}>{c.role}</Badge></td>
                  <td className="py-3 pr-4"><span className="flex min-w-0 items-center gap-1 truncate text-xs font-semibold text-ink-900/70"><Mail size={13} className="shrink-0 text-brand-600" />{c.email}</span></td>
                  <td className="py-3 pr-4 truncate font-semibold text-ink-900/70">{c.subject}</td>
                  <td className="py-3 pr-4"><span className="text-xs font-semibold text-ink-900/70"><span className="flex items-center gap-1"><CalendarDays size={13} className="text-brand-600" />{c.date}</span><span className="mt-1 flex items-center gap-1 text-[10px] text-ink-900/55"><Clock3 size={12} className="text-brand-600" />{c.time}</span></span></td>
                  <td className="py-3 pr-4">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" icon={Eye} onClick={() => openComplaint(c, 'view')}>View Message</Button>
                      <Button size="sm" variant="secondary" icon={Reply} onClick={() => openComplaint(c, 'reply')}>Reply</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-4 lg:hidden">
          {filteredComplaints.map((c, i) => (
            <article key={c.id} className="rounded-xl bg-sand-50 p-4">
              <div className="flex items-start gap-3"><span className="pt-2 text-xs font-bold text-ink-900/45">{i + 1}</span><Avatar name={c.sender} src={doctors.find((doctor) => doctor.name === c.sender)?.image || senderImages[i % senderImages.length]} size={44} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-ink-900">{c.sender}</p><p className="truncate text-xs text-ink-900/45">{c.email}</p><Badge tone={c.role === 'Doctor' ? 'mint' : 'brand'} icon={UserRound} className="mt-2">{c.role}</Badge></div></div>
              <div className="mt-4 space-y-2 text-xs"><p className="font-semibold text-ink-900/75">{c.subject}</p><p className="flex items-center gap-2 text-ink-900/60"><CalendarDays size={14} className="text-brand-600" />{c.date} · {c.time}</p></div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" icon={Eye} onClick={() => openComplaint(c, 'view')}>View Message</Button>
                <Button size="sm" variant="secondary" icon={Reply} onClick={() => openComplaint(c, 'reply')}>Reply</Button>
              </div>
            </article>
          ))}
        </div>
      </Card>

      <Modal
        open={Boolean(selectedComplaint)}
        onClose={() => setSelectedComplaint(null)}
        title={modalMode === 'reply' ? 'Reply to Complaint' : 'Complaint Details'}
        footer={
          modalMode === 'reply' ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setSelectedComplaint(null)}>Close</Button>
              <Button size="sm" onClick={handleSendReply}>Send Reply</Button>
            </>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setSelectedComplaint(null)}>Close</Button>
          )
        }
      >
        {selectedComplaint && modalMode === 'reply' ? (
          <div className="space-y-3">
            <p className="text-sm text-ink-900/70">Reply to <span className="font-semibold text-ink-900">{selectedComplaint.sender}</span>.</p>
            <textarea
              value={replyText}
              onChange={(event) => setReplyText(event.target.value)}
              rows={4}
              placeholder="Write your response"
              className="w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2 text-sm text-ink-900 outline-none focus:border-brand-400"
            />
          </div>
        ) : selectedComplaint ? (
          <div className="space-y-4 text-sm text-ink-900/70">
            <div className="flex items-center gap-3">
              <Avatar name={selectedComplaint.sender} src={doctors.find((doctor) => doctor.name === selectedComplaint.sender)?.image || senderImages[0]} size={48} />
              <div>
                <p className="font-display text-lg font-bold text-ink-900">{selectedComplaint.sender}</p>
                <p className="text-xs font-semibold text-brand-600">{selectedComplaint.email}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Role</p><p className="mt-1 font-semibold text-ink-900">{selectedComplaint.role}</p></div>
              <div><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Status</p><p className="mt-1 font-semibold text-ink-900">{selectedComplaint.status}</p></div>
              <div className="sm:col-span-2"><p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Subject</p><p className="mt-1 font-semibold text-ink-900">{selectedComplaint.subject}</p></div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/45">Message</p>
              <p className="mt-2 leading-6 text-ink-900/75">We have received your message regarding <span className="font-semibold text-ink-900">{selectedComplaint.subject}</span>. This complaint is currently {selectedComplaint.status.toLowerCase()}.</p>
            </div>
            {selectedComplaint.response && (
              <div className="rounded-xl bg-brand-50 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-brand-700">Reply</p>
                <p className="mt-2 text-sm text-ink-900/75">{selectedComplaint.response}</p>
              </div>
            )}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
