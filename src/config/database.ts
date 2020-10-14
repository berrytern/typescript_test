import mongoose from 'mongoose';
import Product from '../products/products.model'
const db=mongoose.connect('mongodb://localhost:27017/products', {useNewUrlParser: true});
const defaultProduct={
    name:'Default',
    desc:'Product description',
    price:300,
  }
Product.create(defaultProduct)
export default db;