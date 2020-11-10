import express from 'express';
import bodyparser from 'body-parser';
import productsRoute from './controller/products';
import auth from './middleware/auth';
import {Request,Response,NextFunction} from 'express';
import jwt from 'jwt-simple';
import { Product } from './model/products';

import {Mock as FakeProduct} from '../test/mocks/product'

export default (mock:boolean)=>{
    const app=express();
    //middlewares
    app.use(bodyparser.urlencoded({extended:true}))
    app.use(bodyparser.json())
    //routes
    app.use('/products',productsRoute(mock?FakeProduct:Product))

    app.use('/auth',auth)
    app.get('/auth',(req,res)=>{
        res.status(200).send()
    })
    return app
}