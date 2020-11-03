import {Request,Response,NextFunction} from 'express';
import jwt from 'jwt-simple';

const auth=(req:Request,res:Response,next:NextFunction)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        console.log('on auth')
        const header_token=req.header('Authorization') || null
        if(!header_token){res.status(400).send()}
        else{
            const token = req.header('Authorization').split(' ')[1] || null;
            if(!token){;res.status(401).send}
            else{
                try{
                    req.user=jwt.decode(token, process.env.authSecret);
                    console.log(jwt.decode(token, process.env.authSecret),req.user);
                    next()
                }catch(err){
                    res.status(401).send()
                }
            }
        }
    }
}

export default auth