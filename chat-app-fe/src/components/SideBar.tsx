import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { setMessage } from '../redux/slices/messageSlice';
import { RootState } from '../redux/store';
import { getAllUser } from '../services/web';
import { getMessage } from '../services/message';
import { SearchIcon } from './Icons';

export const chatSocket = io('http://localhost:8080/chat', {});
const SideBar: React.FC = () => {
    const dispatch = useDispatch();
    const { currentRoom, currentUser } = useSelector((state: RootState) => state.message);
    const userData = useSelector((state: RootState) => state.user.data);
    const [usersData, setUserData] = useState<any[]>();

    useEffect(() => {
        getAllUser()
            .then((res) => {
                setUserData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const leaveGroup = (roomId: string | number) => {
        chatSocket.emit('leave-group', roomId);
    };
    const joinGroup = (userId: string) => {
        chatSocket.emit('join-group', { userId: userData.id, userId2: userId });
    };

    const handleClick = (userId: string) => {
        let newRoomId: string | number;
        leaveGroup(currentRoom);
        joinGroup(userId);
        chatSocket.once('joined-group', (roomId) => {
            newRoomId = roomId;
        });
        getMessage(userId)
            .then((res) => {
                dispatch(
                    setMessage({
                        currentUser: userId,
                        currentRoom: newRoomId,
                        messageData: res.data,
                    }),
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        userData && (
            <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 dark:!bg-darkBackground-200">
                <div className=" h-auto w-full">
                    <div className="flex flex-row items-center py-2 cursor-pointer">
                        <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 dark:bg-darkBackground-100 h-10 w-10">
                            <svg
                                className="w-6 h-6 "
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                ></path>
                            </svg>
                        </div>
                        <div className="ml-2 font-bold text-2xl dark:text-white">QuickChat</div>
                    </div>
                    <div className="w-full bg-slate-200 px-3 py-1.5 rounded-[4px] dark:bg-darkBackground-100">
                        <div className="flex">
                            <i>
                                <SearchIcon className={'text-[#758390]'} />
                            </i>
                            <input
                                className=" bg-transparent outline-none pl-2 text-[14px] w-full dark:text-white"
                                type="text"
                                placeholder="Tìm kiếm bạn bè"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-8">
                    <div className="flex flex-row items-center justify-between text-xs">
                        <span className="font-bold text-[16px] dark:text-white">Gần đây</span>
                    </div>
                    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                        {usersData &&
                            usersData.map((el: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className={`flex cursor-pointer flex-row items-center  rounded-xl p-2 dark:text-white ${
                                            currentUser === el.id
                                                ? 'bg-gray-200 dark:!bg-darkBackground-300'
                                                : 'hover:bg-gray-100 hover:dark:bg-darkBackground-300'
                                        }`}
                                        onClick={() => {
                                            handleClick(el.id);
                                        }}
                                    >
                                        <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                                            {el.last_name[0]}
                                        </div>
                                        <div className="ml-2 text-sm font-semibold">{el.full_name}</div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        )
    );
};

export default SideBar;
