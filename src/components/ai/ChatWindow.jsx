import { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const REPLIES = [
  "Thanks for sharing that. Based on what you've described, it could be a few common things — but I'd recommend booking a consultation with a General Physician so a real doctor can take a proper look.",
  "I understand. Can you tell me how long you've had this symptom, and whether it's getting better, worse, or staying the same?",
  "Got it — I've noted that down. Would you like me to help you find a nearby specialist for this?",
];

export default function ChatWindow({ initialMessages = [], suggestion }) {
  const [messages, setMessages] = useState(
    initialMessages.length
      ? initialMessages
      : [{ from: 'bot', text: "Hi! I'm your Mediconnect AI assistant. Tell me about your symptoms and I'll help you understand what to do next." }]
  );

  const handleSend = (text) => {
    setMessages((m) => [...m, { from: 'user', text }]);
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: REPLIES[Math.floor(Math.random() * REPLIES.length)] }]);
    }, 600);
  };

  useEffect(() => {
    if (suggestion?.text) handleSend(suggestion.text);
  }, [suggestion?.id]);

  const handleFile = (file) => {
    setMessages((m) => [...m, { from: 'user', text: `Attached file: ${file.name}` }]);
    setTimeout(() => setMessages((m) => [...m, { from: 'bot', text: 'I received your file. Please describe what you would like me to review.' }]), 600);
  };

  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages((m) => [...m, { from: 'bot', text: 'Voice input is not supported in this browser. You can type your message instead.' }]);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => handleSend(event.results[0][0].transcript);
    recognition.start();
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto pb-3">
        {messages.map((m, i) => (
          <ChatMessage key={i} from={m.from} text={m.text} />
        ))}
      </div>
      <ChatInput onSend={handleSend} onFile={handleFile} onVoice={handleVoice} />
    </div>
  );
}
