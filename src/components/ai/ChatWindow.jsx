import { useEffect, useState, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import api from '../../services/api';
import { Loader2, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ChatWindow({ initialMessages = [], suggestion }) {
  const [messages, setMessages] = useState(() => {
    // Try to load preserved conversation from session storage if page reloads
    const saved = sessionStorage.getItem('ai_chat_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Failed to parse history'); }
    }
    return initialMessages.length
      ? initialMessages
      : [{ from: 'bot', text: "Hi! I'm your MediConnect AI assistant. Tell me about your symptoms or ask a health question, and I'll help you understand what to do next. \n\nLooking for a doctor? [Find a doctor here](/patient/find-doctor)." }];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll handler
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
    sessionStorage.setItem('ai_chat_history', JSON.stringify(messages));
  }, [messages, isLoading]);

  useEffect(() => {
    if (suggestion?.text) {
      handleSend(suggestion.text);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestion?.id]);

  const handleSend = async (text, isRetry = false) => {
    if (!text.trim()) return;

    let updatedHistory = [...messages];
    if (!isRetry) {
      updatedHistory.push({ from: 'user', text });
      setMessages(updatedHistory);
    }

    setIsLoading(true);
    setErrorInfo(null);

    try {
      const response = await api.post('/ai/chat', {
        message: text,
        history: updatedHistory.slice(0, -1) // Exclude the current user message being sent
      });

      if (response.success) {
        setMessages((m) => [
          ...m,
          { from: 'bot', text: response.data.reply, isEmergency: response.data.isEmergency }
        ]);
      } else {
        throw new Error(response.error || 'Failed to get response');
      }
    } catch (err) {
      console.error('Chat API Error:', err);
      // Determine what message failed so we can retry it
      setErrorInfo({ text, message: 'Unable to connect to the AI service. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([{ from: 'bot', text: "Chat history cleared. How can I assist you today?" }]);
    sessionStorage.removeItem('ai_chat_history');
    setErrorInfo(null);
    api.post('/ai/reset').catch(() => {});
  };

  const handleFile = (file) => {
    // Currently, our AI backend only supports text, but we could add multimodal support later.
    setMessages((m) => [...m, { from: 'user', text: `Attached file: ${file.name}` }]);
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: 'I received your file, but currently I can only process text questions. However, if you describe the contents or your symptoms, I can help with information.' }]);
    }, 600);
  };

  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages((m) => [...m, { from: 'bot', text: 'Voice input is not supported in this browser. Please type your message instead.' }]);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => handleSend(event.results[0][0].transcript);
    recognition.start();
  };

  /** Helper to render simple markdown links within bot responses if we want clickable links */
  const renderMessageText = (msg) => {
    if (msg.from !== 'bot') return msg.text;

    // Convert markdown styled links [text](/path) into interactive React Router Links
    const parts = msg.text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        // External link check
        if (match[2].startsWith('http')) {
          return <a key={i} href={match[2]} target="_blank" rel="noreferrer" className="text-brand-600 underline font-semibold cursor-pointer">{match[1]}</a>;
        }
        return <Link key={i} to={match[2]} className="text-brand-600 underline font-semibold cursor-pointer hover:text-brand-700">{match[1]}</Link>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header controls */}
      <div className="flex justify-end pb-2 mb-2 border-b border-sand-200">
        <button
          onClick={handleClearChat}
          className="text-[10px] text-ink-900/60 hover:text-brand-600 font-semibold px-2 flex items-center transition-colors"
        >
          <RefreshCcw size={10} className="mr-1" /> New Chat
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pb-3 pr-1 custom-scrollbar">
        {messages.map((m, i) => (
          <ChatMessage
            key={i}
            from={m.from}
            text={renderMessageText(m)}
            isEmergency={m.isEmergency}
          />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-ink-900/50 text-[11px] px-2 py-2">
            <Loader2 size={14} className="animate-spin" /> Thinking...
          </div>
        )}
        {errorInfo && (
          <div className="flex flex-col gap-1 items-start bg-red-50 border border-red-100 rounded-lg p-2.5 mx-2 my-1">
            <p className="text-[11px] text-red-600">{errorInfo.message}</p>
            <button
              onClick={() => handleSend(errorInfo.text, true)}
              className="text-[10px] bg-red-100 px-3 py-1 rounded text-red-700 font-semibold hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSend={(text) => handleSend(text)}
        onFile={handleFile}
        onVoice={handleVoice}
        disabled={isLoading}
      />
    </div>
  );
}
