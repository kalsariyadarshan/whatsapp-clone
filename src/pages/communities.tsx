/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { Search } from 'lucide-react';
import { useState } from 'react';

import BottomNav from '@/components/bottomNav';

const Communities = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const communities = [
    { name: 'React Developers', members: 1200, lastActive: '2 days ago' },
    { name: 'Next.js Enthusiasts', members: 800, lastActive: '1 day ago' },
    { name: 'Web Design Gurus', members: 320, lastActive: '5 hours ago' },
    { name: 'JavaScript Fan Club', members: 450, lastActive: '3 days ago' },
  ];

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl bg-[#202c33]">
      <div className="bg-[#202c33]">
        <div className="px-4 py-2 pt-5">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="text-xl font-normal text-white">Communities</h1>
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
        {filteredCommunities.map((community, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-700 p-4 hover:bg-[#283239]"
          >
            <div>
              <h2 className="text-base font-semibold">{community.name}</h2>
              <p className="text-sm text-gray-400">
                {community.members} members
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">
                Last active: {community.lastActive}
              </p>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default Communities;
