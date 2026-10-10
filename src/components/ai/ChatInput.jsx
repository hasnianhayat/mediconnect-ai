import { useRef, useState } from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';

export default function ChatInput({ onSend = () => {}, onFile = () => {}, onVoice = () => {}, disabled = false }) {
  const [value, setValue] = useState('');
  const fileInputRef = useRef(null);

  const submit = (e) => {
    if (e) e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-[#DDE6F1] bg-white px-3 py-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? "AI is responding..." : "Type your message here... (Press Enter to send, Shift+Enter for new line)"}
        rows={1}
        disabled={disabled}
        className="w-full resize-none border-0 px-1 py-1 text-[11px] text-ink-900 outline-none placeholder:text-ink-900/35 disabled:bg-transparent disabled:opacity-50"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
        <div className="flex min-w-0 flex-wrap gap-2 text-ink-900/40">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            disabled={disabled}
            onChange={(e) => {
              if (e.target.files[0]) onFile(e.target.files[0]);
              e.target.value = '';
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            aria-label="Add a file"
            className="flex items-center gap-1 hover:text-brand-600 disabled:opacity-50"
          >
            <Paperclip size={15} />
            <span className="text-[10px] font-semibold">Add File</span>
          </button>
          <button
            type="button"
            onClick={onVoice}
            disabled={disabled}
            aria-label="Use voice input"
            className="flex items-center gap-1 hover:text-brand-600 disabled:opacity-50"
          >
            <Mic size={15} />
            <span className="text-[10px] font-semibold">Voice</span>
          </button>
        </div>
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="btn-primary shrink-0 rounded-lg px-3 py-1.5 text-[10px] disabled:opacity-50"
        >
          <Send size={12} /> Send Message
        </button>
      </div>
    </form>
  );
}
