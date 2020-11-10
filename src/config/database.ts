import mongoose from 'mongoose';
const db=mongoose.connect('mongodb://localhost:27017/products', {useNewUrlParser: true});

export default db;