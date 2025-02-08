/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable import/no-extraneous-dependencies */
import { ArrowLeft, Send, Smile } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Message {
  text: string;
  sender: 'me' | 'other';
  time: string;
}

const ChatPage: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12;
    const formattedMinute = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHour}:${formattedMinute} ${ampm}`;
  };

  useEffect(() => {
    if (name) {
      const savedMessages = localStorage.getItem(`chat_${name}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    }
  }, [name]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const currentTime = formatTime(new Date());
    const newMessages: Message[] = [
      ...messages,
      { text: input, sender: 'me', time: currentTime },
    ];
    setMessages(newMessages);
    if (name) {
      localStorage.setItem(`chat_${name}`, JSON.stringify(newMessages));
    }

    setInput('');

    setTimeout(() => {
      const responseMessage: Message = {
        text: "I'm doing great, thanks!",
        sender: 'other',
        time: formatTime(new Date()),
      };
      const updatedMessages = [...newMessages, responseMessage];
      setMessages(updatedMessages);
      if (name) {
        localStorage.setItem(`chat_${name}`, JSON.stringify(updatedMessages));
      }
    }, 1000);
  };

  return (
    <div className="mx-auto flex h-screen min-h-screen w-full max-w-3xl flex-col bg-[#202c33]">
      <div className="flex items-center gap-4 bg-[#2a3942] p-4">
        <button onClick={() => router.back()} className="text-[#005d4b]">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-700"></div>
          <h1 className="text-lg font-semibold text-white">{name}</h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.sender === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs rounded-lg px-3 py-1 text-white ${
                msg.sender === 'me' ? 'bg-[#005d4b]' : 'bg-[#2a3942]'
              }`}
            >
              {msg.text}
              <div className="text-xs text-[#8696a0]">{msg.time}</div>{' '}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-[#2a3942] bg-[#232e35] p-4">
        <button className="text-[#aebac1]">
          <Smile className="h-6 w-6" />
        </button>
        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-lg bg-[#2a3942] p-2 text-white placeholder-[#8696a0] focus:outline-none"
        />
        <button onClick={sendMessage} className="text-[#005d4b]">
          <Send className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
