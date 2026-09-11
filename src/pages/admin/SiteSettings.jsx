import { Settings, FileText, Globe2, Image as ImageIcon, Mail, MessageSquare, User, Stethoscope, Trash2, PlusSquare, Layers, Search, Share2, Wrench, Eye, ChevronRight } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/common/Card';

const summary = [
  { icon: FileText, label: 'Total Pages', value: 24, note: 'Manage all pages' },
  { icon: Globe2, label: 'Total Contents', value: 128, note: 'All website content' },
  { icon: ImageIcon, label: 'Total Images', value: 356, note: 'All website pictures' },
  { icon: Mail, label: 'Emails', value: 8, note: 'Configured emails' },
  { icon: MessageSquare, label: 'Feedbacks', value: 23, note: 'Total feedbacks' },
];

const contentMgmt = [
  { icon: Layers, title: 'Manage Header Content', desc: 'Update logo, menu, header text and top bar content.' },
  { icon: Layers, title: 'Manage Footer Content', desc: 'Update footer text, links, social media and other info.' },
  { icon: Globe2, title: 'Manage Landing Page Content', desc: 'Edit landing page sections, banners, features and content.' },
  { icon: FileText, title: 'Manage All Content', desc: 'Manage all dynamic contents used across the website.' },
  { icon: User, title: 'Manage Patient Login', desc: 'Customize patient login page content and options.' },
  { icon: Stethoscope, title: 'Manage Doctor Login', desc: 'Customize doctor login page content and options.' },
  { icon: ImageIcon, title: 'Manage All Web Pictures', desc: 'Upload, view and manage all website images.' },
  { icon: Trash2, title: 'Delete Feedback', desc: 'View and delete user feedback and suggestions.' },
  { icon: Globe2, title: 'Site Name & Basic Info', desc: 'Update site name, tagline, logo, favicon and basic details.' },
  { icon: Mail, title: 'Emails Configuration', desc: 'Add, edit and manage all email templates and settings.' },
  { icon: PlusSquare, title: 'Add Content', desc: 'Add new sections, text, features or any custom content.' },
  { icon: FileText, title: 'Manage Pages', desc: 'Add, edit, delete and reorder website pages.' },
];

const advanced = [
  { icon: Search, title: 'SEO Settings', desc: 'Manage SEO title, meta description, keywords and more.' },
  { icon: Share2, title: 'Social Media Links', desc: 'Add and manage social media links shown on website.' },
  { icon: Wrench, title: 'General Settings', desc: 'Manage general website settings and preferences.' },
  { icon: Eye, title: 'Maintenance Mode', desc: 'Enable or disable maintenance mode for the website.' },
];

const iconTones = [
  'bg-brand-100 text-brand-600',
  'bg-mint-400/15 text-mint-500',
  'bg-coral-400/15 text-coral-500',
  'bg-teal-400/15 text-teal-600',
  'bg-amber-400/15 text-amber-500',
];

export default function SiteSettings() {
  return (
    <div>
      <PageHeader icon={Settings} title="Site Settings" subtitle="Manage all website settings and content from here." />
      <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {summary.map((s, index) => (
          <Card key={s.label} className="flex items-center gap-3 p-3 sm:p-4">
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${iconTones[index]}`}><s.icon size={19} strokeWidth={2.2} /></span>
            <div className="min-w-0"><p className="font-display text-xl font-bold leading-none text-ink-900">{s.value}</p><p className="mt-1 truncate text-[10px] font-bold text-ink-900/65 sm:text-xs">{s.label}</p><p className="truncate text-[9px] text-ink-900/35">{s.note}</p></div>
          </Card>
        ))}
      </div>

      <h3 className="mb-3 font-display text-sm font-bold text-ink-900 sm:text-base">Content & Management</h3>
      <div className="mb-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {contentMgmt.map((c, index) => (
          <Card key={c.title} className="flex min-h-[84px] items-start gap-3 p-4">
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${iconTones[index % iconTones.length]}`}><c.icon size={17} strokeWidth={2.2} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-ink-900 sm:text-sm">{c.title}</p>
              <p className="mt-1 text-[10px] leading-4 text-ink-900/50 sm:text-xs">{c.desc}</p>
            </div>
            <ChevronRight size={15} className="mt-1 shrink-0 text-brand-600" />
          </Card>
        ))}
      </div>

      <h3 className="mb-3 font-display text-sm font-bold text-ink-900 sm:text-base">Advanced Settings</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {advanced.map((c, index) => (
          <Card key={c.title} className="flex min-h-[84px] items-start gap-3 p-4">
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${iconTones[(index + 2) % iconTones.length]}`}><c.icon size={17} strokeWidth={2.2} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-ink-900 sm:text-sm">{c.title}</p>
              <p className="mt-1 text-[10px] leading-4 text-ink-900/50 sm:text-xs">{c.desc}</p>
            </div>
            <ChevronRight size={15} className="mt-1 shrink-0 text-brand-600" />
          </Card>
        ))}
      </div>
    </div>
  );
}
