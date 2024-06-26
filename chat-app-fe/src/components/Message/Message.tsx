import React from 'react';

interface MessageProps {
    content: string;
    type: string;
}

const Message: React.FC<MessageProps> = ({ content, type }) => {
    return type === 'reviced' ? (
        <div className={`col-start-1 col-end-8 p-3 rounded-lg`}>
            <div className="flex flex-row items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                </div>
                <div className="relative ml-3 text-sm bg-white dark:bg-darkBackground-100 dark:text-white py-2 px-4 shadow rounded-xl">
                    <div>{content}</div>
                </div>
            </div>
        </div>
    ) : (
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                    A
                </div>
                <div className="relative mr-3 text-sm bg-white dark:bg-darkBackground-100 dark:text-white py-2 px-4 shadow rounded-xl">
                    <div>{content}</div>
                </div>
            </div>
        </div>
    );
};

export default Message;
