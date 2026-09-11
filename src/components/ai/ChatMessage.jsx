import { Bot } from 'lucide-react';
import Avatar from '../common/Avatar';

export default function ChatMessage({ from = 'bot', text }) {
  const isBot = from === 'bot';
  return (
    <div className={`flex items-end gap-2 ${isBot ? '' : 'flex-row-reverse'}`}>
      {isBot ? (
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
          <Bot size={14} />
        </span>
      ) : (
        <Avatar name="You" size={32} />
      )}
      <div
        className={`max-w-[82%] rounded-xl px-3 py-2 text-[11px] leading-4 ${
          isBot ? 'rounded-bl-sm bg-sand-100 text-ink-900' : 'rounded-br-sm bg-brand-600 text-white'
        }`}
      >
        {text}
      </div>
    </div>
  );
}
