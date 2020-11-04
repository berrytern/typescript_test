import express,{Router} from 'express';
import Product from '../model/products';
import db from '../config/database'
import auth from '../middleware/auth'
const router:Router = express.Router();
router.get('/', async(req, res) => {
    const products=await Product.find()
    res.status(200).json(products)
});
router.post('/create',async(req,res)=>{
    console.log('route /create --post')
    console.log(req.body)
    const { name,desc ,price }=req.body;
    if(!name || !desc || !price){
        res.status(400).send()
    }else{
        const created = await Product.create({name:name,desc:desc,price:price})
        if(created){
            res.status(201).send()
        }else{
            res.status(500).send()
        }
    }
});
export default router;