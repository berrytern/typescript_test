import express,{Router} from 'express';
import Product from './products.model';
import db from '../config/database'
const router:Router = express.Router();
router.get('/', async(req, res) => res.send([{
name: 'default product',
description: 'product description',
price: 100
}]));

router.post('/create',async(req,res)=>{
    console.log('route /create --post')
    console.log(req.body)
    const { name,desc ,price }=req.body;
    if(!name || !desc || !price){
        res.status(400).send()
    }else{
        //const created = await Product.create({name:name,desc:desc,price:price})
        //if(created){

        //}else{

        //}
        res.status(201).send()
    }
});
export default router;