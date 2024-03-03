import React from 'react';
import Navication from '../../components/Navication';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
            <div className="w-full h-[100vh] flex">
                <Navication />
                <div className="w-[calc(100%-_-70px)]">{children}</div>
            </div>
        </div>
    );
};

export default MainLayout;
