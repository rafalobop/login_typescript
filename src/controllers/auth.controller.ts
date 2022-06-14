import { Request, Response } from "express"
import User, {InterfaceUser} from '../models/User'
import jwt from 'jsonwebtoken'

export const signup = async (req: Request, res: Response)=>{
    const {username, email, password} = req.body

    const user: InterfaceUser = new User({
        username,
        email,
        password
    })
    user.password = await user.encryptPass(user.password)
    console.log('userrr', user)
    const savedUser = await user.save()
    const token: string = jwt.sign({_id: savedUser._id}, process.env.SECRETKEY || 'TokEnTes7')

    res.header('auth-token', token).json({
        msg:'usuario creado exitosamente',
        user: savedUser,
        code: 2,
    })
}

export const signin = async (req: Request, res: Response)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            msg:'Usuario o contraseña incorrectos',
            code: 1 
        })
    }
    const validaLogin: boolean = await user.validatePass(password)

    if(!validaLogin){
        return res.status(400).json({
            msg:'Usuario o contraseña incorrectos',
            code: 1
        })
    }
    const token: string = jwt.sign({_id: user._id}, process.env.SECRETKEY || 'TokEnTes7' )
    return res.header('auth-token', token).status(200).json({
        msg: `Bienvenido, ${user.username}`,
        code: 2
    })
}

export const profile = async (req: Request, res: Response)=>{
    const {userId} = req;
   const user = await User.findById(userId, {password: 0})
   if(!user) return res.status(400).json({
       msg:'No se encontro el usuario', 
       code: 1
    })
    return res.status(200).json({
       msg:'Usuario encontrado',
       user,
       code: 2
   })
}