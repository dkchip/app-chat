import React from 'react';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
            <div className="w-full h-[100vh]">
                <div className="">{children}</div>
            </div>
        </div>
    );
};

export default MainLayout;
