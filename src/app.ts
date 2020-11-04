import express from 'express';
import bodyparser from 'body-parser';
import productsRoute from './controller/products';
import auth from './middleware/auth';
import {Request,Response,NextFunction} from 'express';
import jwt from 'jwt-simple';


const app=express();
//middlewares
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
//routes
app.use('/products',productsRoute)

app.use('/auth',auth)
app.get('/auth',(req,res)=>{
    res.status(200).send()
})
export default app