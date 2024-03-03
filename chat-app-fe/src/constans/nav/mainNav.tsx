import { MessageIcon, PhoneIcon, UserIcon, BellIcon } from '../../components/Icons';
import { MainNavType } from '../../types/nav';

export const mainNav: MainNavType[] = [
    {
        title: 'Message',
        icon: <MessageIcon className="text-[18px]" />,
        path: '/chat',
    },
    {
        title: 'Phone',
        icon: <PhoneIcon className="text-[18px]" />,
        path: '/phone',
    },
    {
        title: 'User',
        icon: <UserIcon className="text-[18px]" />,
        path: '/user',
    },
    {
        title: 'Notifications',
        icon: <BellIcon className="text-[18px]" />,
        path: '/notifications',
    },
];
