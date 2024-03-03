import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';

interface ProtectedAnonymousProps {
    children: JSX.Element;
}

const ProtectedAnonymous: React.FC<ProtectedAnonymousProps> = ({ children }) => {
    const isLogind = useSelector((state: RootState) => state.user.isLogind);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isLogind) {
            window.location.href = '/chat';
        } else {
            setIsLoading(true);
        }
    }, [isLogind]);
    return isLoading && children;
};

export default ProtectedAnonymous;
