import jwt from 'jsonwebtoken';

interface PayloadProps {
    uuid: string;
    userId: string;
}

const generateToken = (payload: PayloadProps) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY!, { expiresIn: '10m' });
};

export default generateToken;
