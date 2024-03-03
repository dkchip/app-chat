import React, { useState, useEffect } from 'react';

interface ImageProps {
    src: string;
    alt: string;
    className: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => {
    const [_fallBack, setFallBack] = useState<string | null>(null);
    useEffect(() => {
        if (src) {
            setFallBack(null);
        } else {
            setFallBack('/no-image.jpg');
        }
    }, [src]);
    const handleImageError = (): void => {};
    return <img className={className} src={_fallBack || src} alt={alt} onError={handleImageError} />;
};

export default Image;
