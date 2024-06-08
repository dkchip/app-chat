import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Image from '../../components/Image';
import ShowImage from '../../components/Modal/components/ShowImage';
import ModalCenter from '../../components/Modal/ModalCenter';
import { CameraIcon } from '../../components/Icons';
import { RootState } from '../../redux/store';

const ProfilePage: React.FC = () => {
    const { data } = useSelector((state: RootState) => state.user);
    const [isModalShowing, setIsModalShowing] = useState<boolean>(false);

    useEffect(() => {});

    const hideImageModal = (): void => {
        setIsModalShowing(false);
    };

    const showImageModal = (): void => {
        setIsModalShowing(true);
    };

    return (
        <div className="w-full h-screen overflow-y-scroll">
            <div className="py-4 px-6 dark:bg-darkBackground-300 bg-gray-200">
                <div className="max-w-[1150px] mx-auto">
                    {/* Profice cover */}
                    <div className="rounded-[14px] overflow-hidden">
                        {/* Background image */}
                        <div className="relative h-[460px] cursor-pointer">
                            <Image src={data.background_image} className=" w-full h-full object-cover" alt="avatar" />
                            <div className="  absolute bottom-[6%] right-[2%]">
                                <label
                                    className="cursor-pointer bg-[rgba(0,0,0,0.4)] px-2 py-1 rounded-[4px]"
                                    htmlFor="choosebgrimage"
                                >
                                    <CameraIcon className="text-white" />
                                </label>
                                <input
                                    type="file"
                                    id="choosebgrimage"
                                    accept="image/jpeg, image/png"
                                    className=" hidden w-[0.1px] h-[0.1px]"
                                />
                            </div>
                        </div>
                        {/* Avatar */}
                        <div className="dark:bg-darkBackground-200 bg-white flex p-[14px]">
                            <div className=" relative rounded-[10px] overflow-hidden border-[2px] dark:border-darkBackground-300 dark:bg-darkBackground-300 mt-[-50px]">
                                <Image
                                    src={data.avatar}
                                    className="w-[144px] h-[144px] cursor-pointer "
                                    alt="avatar"
                                    onClick={showImageModal}
                                />
                                <div className="  absolute bottom-[6%] right-[6%]">
                                    <label
                                        className="cursor-pointer bg-[rgba(0,0,0,0.4)] px-2 py-1 rounded-[4px]"
                                        htmlFor="chooseavatar"
                                    >
                                        <CameraIcon className="text-white" />
                                    </label>
                                    <input
                                        type="file"
                                        id="chooseavatar"
                                        accept="image/jpeg, image/png"
                                        className=" hidden w-[0.1px] h-[0.1px]"
                                    />
                                </div>
                            </div>
                            <div className="ml-[12px]">
                                <div className="flex-center">
                                    <h3 className="text-[18px] font-semibold dark:text-white">{data.full_name}</h3>
                                    <span className=" ml-1 text-[13px] text-end text-gray-400">{data.username}</span>
                                </div>
                                <div className="">
                                    <h3 className="text-[14px]  dark:text-white">287 Bạn bè</h3>
                                </div>
                                <div className="flex tyn-media-multiple mt-1">
                                    <Link
                                        to={'#'}
                                        className=" w-[34px] h-[34px] rounded-[50%] overflow-hidden border-[2px] dark:border-darkBackground-300 dark:bg-darkBackground-300 "
                                    >
                                        <Image
                                            src="https://connectme-html.themeyn.com/images/avatar/1.jpg"
                                            className=""
                                            alt="avatar"
                                            onClick={showImageModal}
                                        />
                                    </Link>
                                    <Link
                                        to={'#'}
                                        className=" w-[34px] h-[34px] rounded-[50%] overflow-hidden border-[2px] dark:border-darkBackground-300 dark:bg-darkBackground-300 "
                                    >
                                        <Image
                                            src="https://connectme-html.themeyn.com/images/avatar/1.jpg"
                                            className=""
                                            alt="avatar"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Profile detail*/}
                    <div className="mt-[20px]">
                        {/* Nav */}
                        <div className="flex">
                            <div className="dark:text-white cursor-pointer py-1 font-semibold text-[14px] border-b-[2px] border-b-[#5858e8]">
                                Edit Profile
                            </div>
                        </div>
                        {/* Detail */}
                        <div className="flex dark:bg-darkBackground-200 bg-white px-3 py-4 ">
                            <div className="w-[20%] ">
                                <h3 className="dark:text-white  font-semibold">Personal Infomation</h3>
                                <span className="text-[14px] text-gray-600">Edit Your personal Info</span>
                            </div>
                            <div className="w-[80%] ">
                                <div className="flex">
                                    <div className="w-[50%] pr-2">
                                        <p className="dark:text-white font-semibold text-[14px]">First Name</p>
                                        <div className="p-1 rounded-[4px] border border-[#ccc]  dark:border-darkBackground-300 dark:bg-darkBackground-300  mt-1 px-2">
                                            <input
                                                className="outline-none dark:text-white dark:bg-darkBackground-300  text-[14px] w-full"
                                                type="text"
                                                placeholder="Your first name"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-[50%] pr-2">
                                        <p className="dark:text-white font-semibold text-[14px]">Last Name</p>
                                        <div className="p-1 rounded-[4px] border border-[#ccc]  dark:border-darkBackground-300 dark:bg-darkBackground-300  mt-1 px-2">
                                            <input
                                                className="outline-none dark:text-white dark:bg-darkBackground-300  text-[14px] w-full"
                                                type="text"
                                                placeholder="Your last name"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex mt-3">
                                    <div className="w-[50%] pr-2">
                                        <p className="dark:text-white font-semibold text-[14px]">Username</p>
                                        <div className="p-1 rounded-[4px] border border-[#ccc]  dark:border-darkBackground-300 dark:bg-darkBackground-300 mt-1 px-2">
                                            <input
                                                className="outline-none dark:text-white dark:bg-darkBackground-300  text-[14px] w-full"
                                                type="text"
                                                placeholder="@Your username"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-[50%] pr-2">
                                        <p className="dark:text-white font-semibold text-[14px]">Email</p>
                                        <div className="p-1 rounded-[4px] border border-[#ccc]  dark:border-darkBackground-300 dark:bg-darkBackground-300  mt-1 px-2">
                                            <input
                                                className="outline-none dark:text-white dark:bg-darkBackground-300  text-[14px] w-full"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 flex justify-end pr-2">
                                    <button className="px-6 py-0.5 rounded bg-[#6366f1] text-white">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div></div>
                </div>
            </div>
            <ModalCenter isShowing={isModalShowing} handleHide={hideImageModal} bgrColor={'bg-[rgba(0,0,0,0.5)]'}>
                <ShowImage
                    hideModal={hideImageModal}
                    currentImage={0}
                    arrImage={[{ imagePath: 'https://connectme-html.themeyn.com/images/cover/2.jpg' }]}
                />
            </ModalCenter>
        </div>
    );
};

export default ProfilePage;
