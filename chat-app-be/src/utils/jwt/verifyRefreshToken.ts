import jwt from 'jsonwebtoken';

interface Decode {
    uuid: string;
    userId: string;
}

const verifyRefreshToken = (jwtCode: string): Decode | boolean => {
    let decoded: Decode | boolean = false;
    jwt.verify(jwtCode, process.env.REFRESH_TOKEN_KEY!, (err, decode) => {
        if (err) {
            decoded = false;
        } else {
            decoded = decode as Decode;
        }
    });
    return decoded;
};

export default verifyRefreshToken;
