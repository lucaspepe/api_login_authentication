import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();
    try{
        const data = jwt.verify(token, 'secret') //colocar o secret dentro do .env

        const { id } = data as TokenPayload;

        req.userId = id;
        return next();

    }catch(err) {
        return res.sendStatus(401);
    }
}