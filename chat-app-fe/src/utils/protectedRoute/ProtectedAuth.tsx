import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';

interface ProtectedAuthProps {
    children: JSX.Element;
}

const ProtectedAuth: React.FC<ProtectedAuthProps> = ({ children }) => {
    const isLogind = useSelector((state: RootState) => state.user.isLogind);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!isLogind) {
            window.location.href = '/login';
        } else {
            setIsLoading(true);
        }
    }, [isLogind]);
    return isLoading && children;
};

export default ProtectedAuth;
