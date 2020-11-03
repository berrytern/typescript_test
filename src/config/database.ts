import mongoose from 'mongoose';
import Product from '../model/products'
const db=mongoose.connect('mongodb://localhost:27017/products', {useNewUrlParser: true});

export default db;