import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from '../../components/Image';

const ProfilePage: React.FC = () => {
    return (
        <div className="py-4 px-6 dark:bg-darkBackground-300 bg-gray-200">
            <div className="max-w-[1150px] mx-auto">
                {/* Profice cover */}
                <div className="rounded-[14px] overflow-hidden">
                    <div className="h-[460px]">
                        <Image
                            src="https://connectme-html.themeyn.com/images/cover/2.jpg"
                            className="w-full h-full object-cover"
                            alt="avatar"
                        />
                    </div>
                    <div className="dark:bg-darkBackground-200 bg-white flex p-[14px]">
                        <div className=" rounded-[10px] overflow-hidden border-[2px] dark:border-darkBackground-300 mt-[-50px]">
                            <Image
                                src="https://connectme-html.themeyn.com/images/avatar/1.jpg"
                                className="w-[144px] h-[144px]"
                                alt="avatar"
                            />
                        </div>
                        <div className="ml-[12px]">
                            <div className="flex-center">
                                <h3 className="text-[18px] font-semibold dark:text-white">Nina Dubois</h3>
                                <span className=" ml-1 text-[13px] text-end text-gray-400">@nina_dubois</span>
                            </div>
                            <div className="">
                                <h3 className="text-[14px]  dark:text-white">287 Bạn bè</h3>
                            </div>
                            <div className="flex tyn-media-multiple mt-1">
                                <div className=" w-[34px] h-[34px] rounded-[50%] overflow-hidden border-[2px] dark:border-darkBackground-300 ">
                                    <Image
                                        src="https://connectme-html.themeyn.com/images/avatar/1.jpg"
                                        className=""
                                        alt="avatar"
                                    />
                                </div>
                                <div className=" w-[34px] h-[34px] rounded-[50%] overflow-hidden border-[2px] dark:border-darkBackground-300 ">
                                    <Image
                                        src="https://connectme-html.themeyn.com/images/avatar/1.jpg"
                                        className=""
                                        alt="avatar"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Profile detail*/}
                <div className="mt-[20px]">
                    {/* Nav */}
                    <div className="flex">
                        <div className="py-1 font-semibold text-[14px] border-b-[2px] border-b-[#5858e8]">
                            Edit Profile
                        </div>
                    </div>
                    {/* Detail */}
                    <div className="flex bg-white ">
                        <div className="w-[20%] py-2 px-3">
                            <h3 className="font-semibold">Personal Infomation</h3>
                            <span className="text-[14px] text-gray-600">Edit Your personal Info</span>
                        </div>
                        <div className="w-[80%] py-2 px-3"></div>
                    </div>
                </div>
                {/*  */}
                <div></div>
            </div>
        </div>
    );
};

export default ProfilePage;
