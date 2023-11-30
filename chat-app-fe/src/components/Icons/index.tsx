import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const SearchIcon = ({ className }: { className: string | undefined }) => {
    return <FontAwesomeIcon icon={faMagnifyingGlass} className={className} />;
};
