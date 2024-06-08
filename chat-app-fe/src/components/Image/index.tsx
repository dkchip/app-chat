import React, { useState, useEffect, MouseEventHandler } from 'react';
import noImage from '../../assets/Images/no-image.jpg';

interface ImageProps {
    src: string;
    alt: string;
    className: string;
    onClick?: MouseEventHandler<HTMLImageElement>;
}

const Image: React.FC<ImageProps> = ({ src, alt, className, onClick }) => {
    const [_fallBack, setFallBack] = useState<string | null>(null);
    useEffect(() => {
        if (src) {
            setFallBack(null);
        } else {
            setFallBack(noImage);
        }
    }, [src]);
    const handleImageError = (): void => {
        setFallBack(noImage);
    };
    return <img className={className} src={_fallBack || src} alt={alt} onError={handleImageError} onClick={onClick} />;
};

export default Image;
