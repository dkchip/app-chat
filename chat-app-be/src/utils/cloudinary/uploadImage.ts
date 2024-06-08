import { v2 as cloudinary } from 'cloudinary';
import { Request } from 'express';

import { UploadedFile } from '../../types';

cloudinary.config({
    cloud_name: 'dyg9mjslg',
    api_key: '947927373397717',
    api_secret: '1Coo7lbrn3shr3p4IGq8b0VCvBY',
});

const handleUploadImage = async (file: UploadedFile | undefined) => {
    try {
        if (file) {
            const b64 = Buffer.from(file.buffer).toString('base64');
            let dataURI = 'data:' + file.mimetype + ';base64,' + b64;
            const res = await cloudinary.uploader.upload(dataURI, {
                resource_type: 'auto',
            });
            return res;
        }
    } catch (error) {
        console.log('Failed to upload image');
        return Promise.reject(error);
    }
};

export default handleUploadImage;
