import { Response,Request,NextFunction  } from 'express';
import { v4 as uuidV4 } from 'uuid';

import verifytoken from '../../utils/jwt/verifyToken';

interface Decode {
    uuid : string;
    userId : string;
}

export type AuthRequest = Request & { user?: Decode };

const authJWT = (req:AuthRequest, res:Response, next:NextFunction) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: 'Invalid token',
            statusCode: 401,
        });
    }

    const decodedAccess:Decode|boolean = verifytoken(token);
    if (decodedAccess) {
        req.user = decodedAccess as Decode ;
        next();
    } else {
        return res.status(401).json({
            message: 'Invalid token',
            statusCode: 401,
        });
    }
};

export default authJWT;