import React from 'react';
import { useEffect } from 'react';

interface ModalCenterProps {
    children: React.ReactNode;
    isShowing: boolean;
    handleHide?: () => void;
    bgrColor?: string | null;
}

const ModalCenter: React.FC<ModalCenterProps> = ({ children, isShowing, handleHide, bgrColor }) => {
    useEffect(() => {
        isShowing && (document.body.style.overflow = 'hidden');
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isShowing]);

    return (
        isShowing && (
            <div className="modal-wrapper  ">
                <div
                    className={`modal-show modal-overlay ${bgrColor} ${isShowing ? '' : 'modal-hide'}`}
                    onClick={handleHide}
                ></div>
                <div className="modal-content">
                    {React.cloneElement(children as React.ReactElement, {
                        handleHide,
                    })}
                </div>
            </div>
        )
    );
};

export default ModalCenter;
