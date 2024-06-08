import jwt from 'jsonwebtoken';

interface PayloadProps {
    uuid: string;
    userId: string;
}

const generateRefreshToken = (payload: PayloadProps) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY!, { expiresIn: '30d' });
};

export default generateRefreshToken;
