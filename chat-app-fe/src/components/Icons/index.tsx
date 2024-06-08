import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faSpinner,
    faPhone,
    faArrowRightFromBracket,
    faXmark,
    faCameraRetro,
} from '@fortawesome/free-solid-svg-icons';
import { faBell, faUser, faMessage, faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

export const SearchIcon = ({ className }: { className: string | undefined }) => {
    return <FontAwesomeIcon icon={faMagnifyingGlass} className={className} />;
};

export const LoadingIcon = ({ className }: { className: string | undefined }) => {
    return <FontAwesomeIcon icon={faSpinner} className={className} />;
};

export const MessageIcon = ({ className }: { className: string | undefined }) => {
    return <FontAwesomeIcon icon={faMessage} className={className} />;
};

export const PhoneIcon = ({ className }: { className: string | undefined }) => {
    return <FontAwesomeIcon icon={faPhone} className={className} />;
};

export const UserIcon = ({ className }: { className: string | undefined }) => {
    return <FontAwesomeIcon icon={faUser} className={className} />;
};

export const BellIcon = ({ className }: { className: string | undefined }) => {
    return <FontAwesomeIcon icon={faBell} className={className} />;
};

export const LogOutIcon = ({ className }: { className: string | undefined }) => {
    return <FontAwesomeIcon icon={faArrowRightFromBracket} className={className} />;
};

export const MoonIcon = ({ className }: { className: string | undefined }) => {
    return <FontAwesomeIcon icon={faMoon} className={className} />;
};

export const SunIcon = ({ className }: { className: string | undefined }) => {
    return <FontAwesomeIcon icon={faSun} className={className} />;
};

export const CloseIcon = ({ className }: { className: string | undefined }) => {
    return <FontAwesomeIcon icon={faXmark} className={className} />;
};

export const CameraIcon = ({ className }: { className: string | undefined }) => {
    return <FontAwesomeIcon icon={faCameraRetro} className={className} />;
};

