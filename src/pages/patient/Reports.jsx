import { useRef, useState } from 'react';
import { Bot, CheckCircle2, Download, FileCheck2, FileText, MoreVertical, Upload } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const defaultSubmitted = [
  { id: 'submitted-1', title: 'Blood Test Report', with: 'Dr. Ali Raza (Cardiologist)', date: '20 May 2026 · 10:30 AM', status: 'Under Review', note: 'Doctor is reviewing your report.' },
  { id: 'submitted-2', title: 'X-Ray Chest', with: 'Dr. Sara Khan (Pulmonologist)', date: '18 May 2026 · 02:00 PM', status: 'Reviewed', note: 'Doctor has reviewed your report.' },
];

const defaultReceived = [
  { id: 'received-1', title: 'Consultation Summary', from: 'Dr. Ali Raza (Cardiologist)', date: '21 May 2026 · 11:30 AM' },
  { id: 'received-2', title: 'Skin Analysis Report', from: 'Dr. Sara Khan (Dermatologist)', date: '17 May 2026 · 02:15 PM' },
];

export default function Reports() {
  const fileInputRef = useRef(null);
  const [submitted, setSubmitted] = useState(defaultSubmitted);
  const [received, setReceived] = useState(defaultReceived);
  const [modalState, setModalState] = useState({ open: false, title: '', type: 'details', data: null });

  const closeModal = () => setModalState((prev) => ({ ...prev, open: false }));

  const openListModal = (title, data) => {
    setModalState({ open: true, title, type: 'list', data });
  };

  const openReportModal = (report, source) => {
    setModalState({
      open: true,
      title: report.title,
      type: source === 'received' ? 'received-report' : 'submitted-report',
      data: report,
    });
  };

  const openAiAssistantModal = (report) => {
    setModalState({
      open: true,
      title: 'AI Assistant',
      type: 'ai-assistant',
      data: report,
    });
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const uploadedReport = {
      id: `submitted-${Date.now()}`,
      title: file.name,
      with: 'You (Uploaded recently)',
      date: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Uploaded',
      note: 'Your document has been uploaded successfully and is waiting for review.',
    };

    setSubmitted((prev) => [uploadedReport, ...prev]);
    event.target.value = '';
    setModalState({ open: true, title: 'Upload Successful', type: 'upload-success', data: uploadedReport });
  };

  const handleDownload = (report) => {
    const content = `Report: ${report.title}\nDate: ${report.date}\n\nThis is a sample download generated from the Mediconnect AI reports page.`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${report.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderModalContent = () => {
    if (modalState.type === 'list') {
      return (
        <div className="space-y-3">
          {modalState.data.map((item) => (
            <div key={item.id} className="rounded-xl border border-sand-200 p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-sm font-bold text-brand-700">{item.title}</p>
                  <p className="mt-1 text-xs text-ink-900/60">{item.with || item.from}</p>
                  <p className="mt-1 text-xs text-ink-900/50">{item.date}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => openReportModal(item, modalState.title.includes('Received') ? 'received' : 'submitted')}>
                  View Report
                </Button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (modalState.type === 'upload-success') {
      return (
        <div className="space-y-3 text-sm text-ink-900/70">
          <p><strong>{modalState.data.title}</strong> has been uploaded successfully.</p>
          <p>Your report is now available in the submitted reports section and is waiting for doctor review.</p>
        </div>
      );
    }

    if (modalState.type === 'ai-assistant') {
      const report = modalState.data;
      return (
        <div className="space-y-3 text-sm text-ink-900/70">
          <div className="rounded-xl bg-brand-50 p-3">
            <p className="font-display text-sm font-bold text-brand-700">AI Summary</p>
            <p className="mt-2 leading-6">
              This report was shared by <span className="font-semibold text-ink-900">{report.from || report.with}</span> on {report.date}. A quick review suggests this document is important for follow-up care and should be discussed during your next consultation.
            </p>
          </div>
          <ul className="list-disc space-y-1 pl-5">
            <li>Check for any abnormal findings mentioned in the report.</li>
            <li>Book a follow-up if the doctor requests one.</li>
            <li>Keep the file saved for future reference.</li>
          </ul>
        </div>
      );
    }

    if (modalState.type === 'submitted-report' || modalState.type === 'received-report') {
      const report = modalState.data;
      return (
        <div className="space-y-4 text-sm text-ink-900/70">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <FileText size={18} />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-ink-900">{report.title}</p>
              <p className="text-xs font-semibold text-ink-900/55">{report.with || report.from}</p>
            </div>
          </div>

          <div className="grid gap-3 rounded-xl border border-sand-200 bg-sand-50 p-3 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Date</p>
              <p className="mt-1 font-semibold text-ink-900">{report.date}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Status</p>
              <p className="mt-1 font-semibold text-ink-900">{report.status || 'Received'}</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-ink-900/40">Notes</p>
            <p className="mt-1 leading-6 text-ink-900/70">
              {report.note || 'Doctor has shared this report with you. You can review it and use the AI assistant for a quick summary.'}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderFooter = () => {
    if (modalState.type === 'upload-success') {
      return <Button variant="outline" size="sm" onClick={closeModal}>Close</Button>;
    }

    if (modalState.type === 'ai-assistant') {
      return (
        <>
          <Button variant="outline" size="sm" onClick={closeModal}>Close</Button>
          <Button size="sm" onClick={() => handleDownload(modalState.data)}>Download Summary</Button>
        </>
      );
    }

    if (modalState.type === 'received-report' || modalState.type === 'submitted-report') {
      return (
        <>
          <Button variant="outline" size="sm" onClick={closeModal}>Close</Button>
          <Button size="sm" onClick={() => handleDownload(modalState.data)}>Download Report</Button>
        </>
      );
    }

    return <Button variant="outline" size="sm" onClick={closeModal}>Close</Button>;
  };

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <PageHeader
          icon={FileText}
          title="My Reports"
          subtitle="Access and manage all your medical reports in one place"
          action={
            <>
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleUpload} />
              <Button icon={Upload} size="sm" onClick={handleUploadClick} className="!border-0 !shadow-none px-3 py-2 text-xs">
                Upload Report
              </Button>
            </>
          }
        />

        <ReportSection
          title="Reports I Submitted to Doctors"
          count={submitted.length}
          tone="brand"
          icon={FileCheck2}
          action="View All Submitted Reports"
          onAction={() => openListModal('Submitted Reports', submitted)}
        >
          {submitted.map((r) => (
            <div key={r.id} className="grid gap-3 py-4 sm:grid-cols-[36px_minmax(190px,1.25fr)_minmax(160px,1fr)_120px_20px] sm:items-center sm:gap-4">
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
              <Button variant="outline" size="sm" onClick={() => openReportModal(r, 'submitted')} className="!border-0 !shadow-none w-fit px-3 py-1.5 text-xs">View Report</Button>
              <button
                type="button"
                aria-label={`More options for ${r.title}`}
                onClick={() => openReportModal(r, 'submitted')}
                className="text-ink-900/55 hover:text-brand-700"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          ))}
        </ReportSection>

        <ReportSection
          title="Reports I Received from Doctors"
          count={received.length}
          tone="mint"
          icon={Download}
          action="View All Received Reports"
          onAction={() => openListModal('Received Reports', received)}
        >
          {received.map((r) => (
            <div key={r.id} className="grid gap-3 py-4 sm:grid-cols-[36px_minmax(190px,1.25fr)_minmax(160px,1fr)_210px_20px] sm:items-center sm:gap-4">
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
                <Button variant="outline" size="sm" onClick={() => openReportModal(r, 'received')} className="!border-0 !shadow-none px-3 py-1.5 text-xs">View Report</Button>
                <Button size="sm" icon={Bot} onClick={() => openAiAssistantModal(r)} className="!border-0 !shadow-none px-3 py-1.5 text-xs">Open AI Assistant</Button>
              </div>
              <button
                type="button"
                aria-label={`More options for ${r.title}`}
                onClick={() => openAiAssistantModal(r)}
                className="text-ink-900/55 hover:text-brand-700"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          ))}
        </ReportSection>
      </div>

      <Modal open={modalState.open} onClose={closeModal} title={modalState.title} footer={renderFooter()}>
        {renderModalContent()}
      </Modal>
    </>
  );
}

function ReportSection({ title, count, tone, icon: Icon, action, onAction, children }) {
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
      <button type="button" onClick={onAction} className={`ml-auto flex items-center pt-3 text-xs font-semibold ${tones[tone].split(' ')[0]} hover:underline`}>
        {action} <span className="ml-1">&#8594;</span>
      </button>
    </Card>
  );
}
