import React from 'react';
import Image from '../Image';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

import { LogOutIcon } from '../Icons';
import { mainNav } from '../../constans/nav/mainNav';
import { NavLink } from 'react-router-dom';
import SwitchButton from '../Button/SwitchButton';

const Navication: React.FC = () => {
    const handleLogOut = () => {
        Cookies.remove('token');
        window.location.href = '/';
    };
    const currentPath = window.location.pathname;

    return (
        <div className="w-[70px] bg-[#181f2e] flex flex-col justify-between">
            <div>
                {/* AVT */}
                <div className="flex-center py-2">
                    <Link to={'/profile'}>
                        <Image
                            src="https://scontent.fáahan14-2.fna.fbcdn.net/v/t39.30808-6/361256160_1420481928775878_514483897564070731_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=ZMWR0fmzQyIAX_8K8UK&_nc_ht=scontent.fhan14-2.fna&oh=00_AfAZwN9TCSUxbSNcOw79JlnIqwfHg6TgrOgcQ0EsfICgCQ&oe=65DBB6AD"
                            alt="avatar"
                            className="w-[44px] h-[44px] rounded-[50%]"
                        />
                    </Link>
                </div>
                {/* NAV */}
                <div className="mt-10">
                    {mainNav.map((nav, i) => {
                        return (
                            <NavLink
                                key={i}
                                className={`flex-center py-3 cursor-pointer text-[white] hover:bg-[#202a3f] hover:!text-[#6366f1] ${
                                    currentPath === nav.path ? '!text-[#6366f1]' : ''
                                } `}
                                to={nav.path}
                            >
                                {nav.icon}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
            {/* Setting/Log out */}
            <div>
                <div className="">
                    <SwitchButton className="flex-center py-5 cursor-pointer text-[white] text-[20px] hover:bg-[#202a3f] hover:!text-[#6366f1]" />
                </div>
                <div
                    className="flex-center py-5 cursor-pointer text-[white] hover:bg-[#202a3f] hover:!text-[#6366f1]"
                    onClick={handleLogOut}
                >
                    <LogOutIcon className="text-[18px] " />
                </div>
            </div>
        </div>
    );
};

export default Navication;
