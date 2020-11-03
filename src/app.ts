import express from 'express';
import bodyparser from 'body-parser';
import productsRoute from './controller/products';

const app=express();
//middlewares
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
//routes
app.use('/products',productsRoute)

export default app