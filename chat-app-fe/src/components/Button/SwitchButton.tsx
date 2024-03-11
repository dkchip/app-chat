import React from 'react';

import useDarkSide from '../../hooks/useDarkSide';
import { MoonIcon, SunIcon } from '../Icons';

interface SwitchButtonProps {
    className: string;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ className }) => {
    const [theme, setTheme] = useDarkSide();
    // const [isDarkMode, setIsDarkMode] = useState<boolean>(theme === 'dark' ? false : true);

    const toggleDarkMode = (): void => {
        setTheme(theme);
        // setIsDarkMode(checked);
    };
    return (
        <div className={className} onClick={toggleDarkMode}>
            {theme === 'light' ? <SunIcon className="" /> : <MoonIcon className="" />}
        </div>
    );
};

export default SwitchButton;
