import express from 'express';

import * as authControllers from '../controllers/authControllers';
import authJWT from '../middleware/authenticate/authJwt';

const router = express.Router({ mergeParams: true });

router.post('/register', authControllers.authRegister);
router.post('/login', authControllers.authLogin);
router.post('/send-code-email', authControllers.sendCodeByEmail);
router.post('/confirm-verification-code', authControllers.confirmVerificationCode);

router.get('/profile', authJWT, authControllers.authProfile);
router.get('/verification-info/:id', authControllers.getVerificationInfor);

export default router;
