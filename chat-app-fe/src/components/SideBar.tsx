import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

import { setMessage } from '../redux/slices/messageSlice';
import { RootState } from '../redux/store';
import { getAllUser } from '../services/web';
import { getMessage } from '../services/message';

export const chatSocket = io('http://localhost:8080/chat', {});
const SideBar: React.FC = () => {
    const dispatch = useDispatch();
    const currentRoomId = useSelector((state: RootState) => state.message.currentRoom);
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
        // leaveGroup(currentRoomId);
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

    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = '/login';
    };
    return (
        userData && (
            <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                <div className=" h-auto w-full">
                    <div className="flex flex-row items-center py-2">
                        <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                            <svg
                                className="w-6 h-6"
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
                        <div className="ml-2 font-bold text-2xl">QuickChat</div>
                    </div>
                    <div className=" flex flex-col">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                                {userData.last_name[0]}
                            </div>
                            <span className="font-semibold px-2">{userData.full_name}</span>
                        </div>
                        <button type="button" className=" cursor-pointer" onClick={handleLogout}>
                            Đăng xuất
                        </button>
                    </div>
                </div>
                <div className="flex flex-col mt-8">
                    <div className="flex flex-row items-center justify-between text-xs">
                        <span className="font-bold">Active Conversations</span>
                        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span>
                    </div>
                    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                        {usersData &&
                            usersData.map((el: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex cursor-pointer flex-row items-center hover:bg-gray-100 rounded-xl p-2"
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
