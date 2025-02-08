/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable import/no-extraneous-dependencies */
import { Camera, MoreVertical, QrCode, Search } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import BottomNav from '@/components/bottomNav';

const Index = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigationItems = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'favourites', label: 'Favourites' },
    { id: 'groups', label: 'Groups' },
  ];

  const chats = [
    {
      name: 'Darshan',
      time: '2:49 pm',
      subtitle: '📞 Voice call',
      unread: 0,
      favourite: true,
    },
    {
      name: 'Amit',
      time: '3:15 pm',
      subtitle: 'Hey, how are you?',
      unread: 2,
      favourite: false,
    },
    {
      name: 'Priya',
      time: '1:30 pm',
      subtitle: 'Sent a photo 📷',
      unread: 5,
      favourite: true,
    },
    {
      name: 'Rohan',
      time: '12:45 pm',
      subtitle: '🎥 Video call missed',
      unread: 1,
      favourite: false,
    },
    {
      name: 'Neha',
      time: '11:00 am',
      subtitle: 'Typing...',
      unread: 3,
      favourite: true,
    },
    {
      name: 'Vikas',
      time: '10:15 am',
      subtitle: 'Let’s catch up tomorrow!',
      unread: 0,
      favourite: false,
    },
    {
      name: 'Ananya',
      time: 'Yesterday',
      subtitle: 'Good night! 🌙',
      unread: 7,
      favourite: true,
    },
    {
      name: 'Kunal',
      time: 'Sunday',
      subtitle: 'Sent an attachment 📎',
      unread: 0,
      favourite: false,
    },
    {
      name: 'Meera',
      time: 'Saturday',
      subtitle: 'Happy Birthday! 🎂',
      unread: 9,
      favourite: true,
    },
    {
      name: 'Rahul',
      time: 'Friday',
      subtitle: 'Missed call from Rahul',
      unread: 4,
      favourite: false,
    },
  ];

  const filteredChats = chats
    .filter((chat) => {
      if (activeTab === 'unread') return chat.unread > 0;
      if (activeTab === 'favourites') return chat.favourite;
      if (activeTab === 'groups') return false;
      return true;
    })
    .filter((chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl bg-[#202c33]">
      <div className="bg-[#202c33]">
        <div className="px-4 py-2 pt-5">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-xl font-normal text-white">WhatsApp</h1>
            <div className="flex items-center gap-6">
              <button className="text-[#aebac1] transition-colors hover:text-white">
                <QrCode className="h-5 w-5" />
              </button>
              <button className="text-[#aebac1] transition-colors hover:text-white">
                <Camera className="h-5 w-5" />
              </button>
              <button className="text-[#aebac1] transition-colors hover:text-white">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <Search className="h-5 w-5 text-[#aebac1]" />
            </div>
            <input
              type="text"
              placeholder="Ask Meta AI or Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#2a3942] bg-[#202c33] py-1.5 pl-11 pr-4 text-[#d1d7db] placeholder-[#8696a0] focus:border-[#005d4b] focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#202c33] px-4 py-2">
        <nav className="no-scrollbar flex gap-2 overflow-x-auto">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`whitespace-nowrap rounded-full px-4 py-1 text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-[#005d4b] text-[#e9edef]'
                  : 'bg-[#1f2c33] text-[#8696a0] hover:bg-[#283239]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="h-full max-h-[80vh] overflow-y-auto bg-[#202c33] p-4 pb-20 text-white">
        {filteredChats.map((chat, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center justify-between border-b border-gray-700 p-4 hover:bg-[#283239]"
            onClick={() => router.push(`/chat/${chat.name.toLowerCase()}`)}
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-700"></div>
              <div>
                <h2 className="text-base font-semibold">{chat.name}</h2>
                <p className="text-sm text-gray-400">{chat.subtitle}</p>
              </div>
            </div>
            <div className="text-right">
              {chat.time && (
                <p className="text-xs text-gray-400">{chat.time}</p>
              )}
              {chat.unread > 0 && (
                <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-semibold">
                  {chat.unread}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;
