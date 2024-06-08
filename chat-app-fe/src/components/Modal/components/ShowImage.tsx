import React from 'react';

import Image from '../../Image';
import { CloseIcon } from '../../Icons';

interface ImageObject {
    imagePath: string;
}

interface ShowImageProps {
    arrImage: ImageObject[];
    currentImage: number;
    hideModal: () => void;
}

const ShowImage: React.FC<ShowImageProps> = ({ arrImage, currentImage, hideModal }) => {
    return (
        <div className=" w-screen h-screen flex-center  relative">
            <button
                className="absolute top-[6%] right-[6%] cursor-pointer w-[50px] h-[50px] bg-[rgba(255,255,255,0.4)] rounded-[50%] overflow-hidden cursor-pointer  "
                onClick={hideModal}
            >
                {' '}
                <CloseIcon className="text-white text-[24px]" />
            </button>
            <div className="w-[70%]">
                <Image className="" src={arrImage[currentImage].imagePath} alt="" />
            </div>
        </div>
    );
};

export default ShowImage;
