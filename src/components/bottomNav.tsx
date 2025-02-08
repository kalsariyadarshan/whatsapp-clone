/* eslint-disable import/no-extraneous-dependencies */
import { MessageCircle, PhoneCall, Users } from 'lucide-react';
import { useRouter } from 'next/router';

const BottomNav = () => {
  const router = useRouter();
  const bottomNavItems = [
    {
      id: 'chats',
      icon: <MessageCircle size={24} />,
      label: 'Chats',
      href: '/',
    },
    {
      id: 'communities',
      icon: <Users size={24} />,
      label: 'Communities',
      href: '/communities',
    },
    {
      id: 'calls',
      icon: <PhoneCall size={24} />,
      label: 'Calls',
      href: '/calls',
    },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 mx-auto flex w-full max-w-3xl -translate-x-1/2 justify-around bg-[#232e35] p-4 text-white">
      {bottomNavItems.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            router.push(item.href);
          }}
          className={`flex cursor-pointer flex-col items-center ${
            item.href === router.asPath
              ? 'text-[#e9edef]'
              : 'text-[#8696a0] hover:text-white'
          }`}
        >
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;
