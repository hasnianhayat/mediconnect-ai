import { useState } from 'react';
import { Activity, Bot, ClipboardList, FileSearch, ScanLine, ShieldAlert, Stethoscope } from 'lucide-react';
import Card from '../../components/common/Card';
import ChatWindow from '../../components/ai/ChatWindow';
import SuggestionCard from '../../components/ai/SuggestionCard';

const features = [
  { icon: Stethoscope, title: 'Doctor Finder', desc: 'Find your ideal doctor by symptoms and category.', tone: 'bg-[#EAF2FF] text-[#1F5FFF]' },
  { icon: ClipboardList, title: 'Symptom Checker', desc: 'Enter your symptoms to find possible conditions.', tone: 'bg-[#EAFBF4] text-[#10B981]' },
  { icon: FileSearch, title: 'Reports Explainer', desc: 'Read your medical reports in simple terms.', tone: 'bg-[#EAF2FF] text-[#3B82F6]' },
  { icon: ScanLine, title: 'X-ray Explainer', desc: 'Upload X-rays and get an easy explanation.', tone: 'bg-[#FDF0F6] text-[#F43F5E]' },
];

const prompts = [
  { label: 'Fever', icon: Activity },
  { label: 'Headache', icon: Activity },
  { label: 'Cough', icon: Activity },
  { label: 'Body Pain', icon: Activity },
  { label: 'Stomach Pain', icon: Activity },
  { label: 'Sore Throat', icon: Activity },
  { label: 'Fatigue', icon: Activity },
  { label: 'Skin Rash', icon: Activity },
];

export default function AIAssistant() {
  const [suggestion, setSuggestion] = useState(null);

  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <section className="relative flex min-h-[220px] items-center overflow-hidden rounded-2xl   px-5 py-6  sm:min-h-[260px] sm:px-8 lg:min-h-[290px]">
        <div className="relative z-10 max-w-[560px]">
          <p className="text-base font-bold text-slate-700 sm:text-xl">Welcome to</p>
          <h1 className="mt-1 font-display text-[2.2rem] font-black leading-[0.98] tracking-[-0.05em] text-slate-900 sm:text-[3.2rem] lg:text-[40px]">
            MediConnect <span className="text-brand-600">AI Assistant</span>
          </h1>
          <p className="mt-4 text-base font-bold text-ink-900 sm:text-md ">Your smart health companion</p>
          <p className="mt-3 max-w-[520px] text-sm font-bold leading-6 text-ink-900 sm:text-md">
            Get instant help, understand your health  better <br></br>  and make informed decisions.
          </p>
        </div>
        <img
          src="/images/doctor6.png"
          alt="MediConnect AI Assistant"
          className="absolute -right-2 top-1/2 hidden h-[180px] w-[42%] -translate-y-1/2 object-contain object-right sm:right-6 sm:block sm:h-[220px] sm:w-[34%] lg:right-10 lg:h-[250px]"
        />
      </section>

      <Card className="px-4 py-6 sm:px-6 sm:py-7">
        <h2 className="text-center font-display text-xl font-extrabold tracking-[-0.03em] text-[#1D4ED8] sm:text-2xl">What can you do with AI Assistant?</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="flex min-w-0 flex-col items-center text-center">
              <span className={`mb-4 grid h-20 w-20 place-items-center rounded-full shadow-[0_8px_20px_rgba(37,99,235,0.12)] ${f.tone}`}>
                <f.icon size={38} strokeWidth={2.2} />
              </span>
              <p className="font-display text-lg font-bold text-[#1B2A49]">{f.title}</p>
              <p className="mt-2 max-w-[220px] text-sm font-bold leading-6 text-ink-900">{f.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <h2 className="flex items-center gap-2 px-1 text-xs font-bold text-brand-700 sm:text-sm"><Bot size={15} strokeWidth={2.2} /> Start a Conversation</h2>
      <Card className="flex h-[270px] flex-col p-3 sm:h-[292px] sm:p-4">
        <ChatWindow suggestion={suggestion} />
      </Card>

      <div>
        <p className="mb-2 text-[10px] font-bold text-brand-700">Try asking about:</p>
        <div className="flex flex-wrap gap-1.5">
          {prompts.map(({ label, icon: Icon }) => <SuggestionCard key={label} label={label} icon={Icon} onClick={() => setSuggestion({ id: Date.now(), text: `Tell me about ${label.toLowerCase()}.` })} />)}
        </div>
      </div>

      <p className="flex items-start gap-2 rounded-lg border border-mint-200 bg-mint-50 px-3 py-2.5 text-[9px] leading-4 text-mint-700">
        <ShieldAlert size={15} className="mt-0.5 shrink-0" />
        Medical Disclaimer: This AI assistant provides general information only and is not a substitute for professional medical advice, diagnosis or treatment. Always consult a qualified doctor for medical concerns.
      </p>
    </div>
  );
}
