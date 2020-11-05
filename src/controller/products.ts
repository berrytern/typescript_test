import express,{Router} from 'express';
import {Product, IProduct} from '../model/products';
import db from '../config/database'
import auth from '../middleware/auth'

interface IOptProduct {
    name?:string
    desc?:string
    price?:number
} 

const router:Router = express.Router();
router.get('/', async(req, res) => {

    const { name,desc ,price }=req.body;
    console.log(name,desc ,price)
    if(!name && !desc && !price){
        res.status(400).send()
    }else{
        let props:IOptProduct={}
        if(!!name){
            props['name']=name
        }
        if(!!desc){
            props['desc']=desc
        }
        if(!!price){
            props['price']=price
        }
        const products=await Product.findOne(props)
        res.status(200).json(products)
    }
    
    
});
router.get('/all', async(req, res) => {
    console.log("--get /all")
    const { name,desc ,price,limit}=req.body;
    let props:IOptProduct={}
    if(!!name){
        props['name']=name
    }
    if(!!desc){
        props['desc']=desc
    }
    if(!!price){
        props['price']=price
    }
    let products
    if(!limit){
        products = await Product.find(props).exec()
    }else{
        products = await Product.find(props).limit(limit).exec()
  
    }
    console.log(products)
    res.status(200).send(products)
    
});
router.post('/',async(req,res)=>{
    console.log('route --post')
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
router.delete('/',async(req,res)=>{
    console.log('route --delete')
    const { name }=req.body;
    if(!name){
        res.status(400).send()
    }else{
        const deleted = await Product.deleteOne({name:name})
        console.log(deleted)
        if(Object.keys(deleted).includes('deletedCount')){
            if(deleted["deletedCount"]==1){
                res.send()
            }else{
                res.status(400).send()
            }
        }else{
            res.status(400).send()
        }
       
    }
})
export default router;