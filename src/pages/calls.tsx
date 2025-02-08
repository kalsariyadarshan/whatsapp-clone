/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { Search } from 'lucide-react';
import { useState } from 'react';

import BottomNav from '@/components/bottomNav';

const Calls = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const calls = [
    { name: 'DK', time: '3:15 pm', type: 'Missed', duration: '' },
    {
      name: 'Amit',
      time: '2:30 pm',
      type: 'Incoming',
      duration: '5 min',
    },
    { name: 'Rahul', time: '1:45 pm', type: 'Outgoing', duration: '10 min' },
    { name: 'Lalit', time: '12:30 pm', type: 'Missed', duration: '' },
  ];

  const filteredCalls = calls.filter((call) =>
    call.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl bg-[#202c33]">
      <div className="bg-[#202c33]">
        <div className="px-4 py-2 pt-5">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-xl font-normal text-white">Calls</h1>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <Search className="h-5 w-5 text-[#aebac1]" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#2a3942] bg-[#202c33] py-1.5 pl-11 pr-4 text-[#d1d7db] placeholder-[#8696a0] focus:border-[#005d4b] focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="h-full max-h-[80vh] overflow-y-auto bg-[#202c33] p-4 pb-20 text-white">
        {filteredCalls.map((call, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-700 p-4 hover:bg-[#283239]"
          >
            <div>
              <h2 className="text-base font-semibold">{call.name}</h2>
              <p className="text-sm text-gray-400">{call.type} call</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">{call.time}</p>
              {call.duration && (
                <span className="text-xs text-gray-400">{call.duration}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default Calls;
