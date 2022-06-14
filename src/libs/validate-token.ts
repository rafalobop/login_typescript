import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

interface IPayload {
    _id: string;
    iat: number;
}

export const tokenValidator = (req: Request, res: Response, next: NextFunction)=>{
    const token: string = req.header('auth-token') || ""
    if(!token){
        return res.status(401).json({
            msg: 'Usuario no autorizado',
            code: 1
        })
    };

    const payload = jwt.verify(token, process.env.SECRETKEY || 'TokEnTes7') as IPayload
    
    req.userId = payload._id
    
    next();
}