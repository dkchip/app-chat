import React, { useRef, useEffect } from 'react';
import Message from './Message';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Message {
    id: string;
    _id: string;
    from: string;
    to: string;
    _v?: number;
    content: string;
    created_at: Date;
    updated_at?: Date;
}

interface MessageWrapperProps {
    data: Message[];
}

const MessageWrapper: React.FC<MessageWrapperProps> = ({ data }) => {
    const userData = useSelector((state: RootState) => state.user.data);
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messageRef.current?.scrollIntoView({
            behavior: 'auto',
            block: 'end',
        });
    }, [data]);
    return (
        <div className="flex flex-col  dark:bg-darkBackground-300">
            <div className="grid grid-cols-12 gap-y-2" ref={messageRef}>
                {data.map((el, index) => {
                    return (
                        <Message key={index} content={el.content} type={el.from === userData.id ? 'send' : 'reviced'} />
                    );
                })}
            </div>
        </div>
    );
};

export default MessageWrapper;
