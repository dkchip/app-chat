import express from 'express';

import * as authControllers from '../controllers/authControllers';
import authJWT from '../middleware/authenticate/authJwt';
import uploadSingleImage from '../utils/multer/uploadSingleImage';
import uploadMultiImage from '../utils/multer/uploadMultiImage';

const router = express.Router({ mergeParams: true });

router.post('/register', authControllers.authRegister);
router.post('/login', authControllers.authLogin);
router.post('/send-code-email', authControllers.sendCodeByEmail);
router.post('/confirm-verification-code', authControllers.confirmVerificationCode);

router.get('/profile', authJWT, authControllers.authProfile);
router.get('/verification-info/:id', authControllers.getVerificationInfor);

router.patch(
    '/update-profile',
    uploadMultiImage().fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'background_image', maxCount: 1 },
    ]),
    authControllers.updateProfile,
);

export default router;
