import { Bot, AlertTriangle } from 'lucide-react';
import Avatar from '../common/Avatar';

export default function ChatMessage({ from = 'bot', text, isEmergency = false }) {
  const isBot = from === 'bot';

  return (
    <div className={`flex items-end gap-2 ${isBot ? '' : 'flex-row-reverse'}`}>
      {isBot ? (
        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${isEmergency ? 'bg-red-100 text-red-600' : 'bg-brand-50 text-brand-600'}`}>
          {isEmergency ? <AlertTriangle size={14} /> : <Bot size={14} />}
        </span>
      ) : (
        <Avatar name="You" size={32} />
      )}
      <div
        className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-[11.5px] leading-relaxed whitespace-pre-wrap ${
          isEmergency
            ? 'rounded-bl-sm border border-red-200 bg-red-50 text-red-900 font-medium'
            : isBot
            ? 'rounded-bl-sm bg-sand-100 text-ink-900'
            : 'rounded-br-sm bg-brand-600 text-white'
        }`}
      >
        {text}
      </div>
    </div>
  );
}
