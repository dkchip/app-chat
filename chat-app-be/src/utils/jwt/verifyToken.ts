import jwt from "jsonwebtoken";

interface Decode {
    uuid : string;
    userId : string;
}


const verifytoken = (jwtCode: string): Decode | boolean => {
    let decoded: Decode | boolean = false;
    jwt.verify(jwtCode, process.env.ACCESS_TOKEN_KEY!, (err, decode) => {
        if (err) {
            decoded = false;
        } else {
            decoded = decode as Decode;
        }
    });
    return decoded;
};

export default verifytoken