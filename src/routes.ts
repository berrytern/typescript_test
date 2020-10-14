import express from 'express';
const app=express();
import productsRoute from './products/products.routes';
app.use('/products',productsRoute)

export default app