import {Request, Response} from 'express'
import { IProduct } from '../models/products';
import {Model, } from 'mongoose'

interface IOptProduct {
    name?: string
    desc?: string
    price?: number
}
class ProductsController {
    Product:Model<IProduct>
    constructor(Product:Model<IProduct>) {
      this.Product = Product;
    }
    async get(req:Request, res:Response) {
        const { name, desc, price } = req.body;
        if (!name && !desc && !price) {
            res.status(400).send()
        } else {
            const { name, desc, price } = req.body;
        let props: IOptProduct = {}
        if (!!name) {
            props['name'] = name
        }
        if (!!desc) {
            props['desc'] = desc
        }
        if (!!price) {
            props['price'] = price
        }
        let products
        products = await this.Product.findOne(props)
        res.status(200).send(products)
        }
    }
    async getById(req:Request, res:Response) {
        const {
            params: { id }
        } = req;

        try {
            const product = await this.Product.findOne({ _id: id });
            res.send(product);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
    async getall(req:Request, res:Response){
        const { name, desc, price} = req.body;
        let props: IOptProduct = {}
        if (!!name) {
            props['name'] = name
        }
        if (!!desc) {
            props['desc'] = desc
        }
        if (!!price) {
            props['price'] = price
        }
        const products = await this.Product.find(props)

        res.status(200).send(products)
    }
    async post(req:Request, res:Response) {
        const { name, desc, price } = req.body;
        if (!name || !desc || !price) {
            res.status(400).send()
        } else {
            const created = await this.Product.create({ name: name, desc: desc, price: price })
            if (created) {
                res.status(201).send()
            } else {
                res.status(500).send()
            }
        }
    }
    async delete(req:Request, res:Response){
        const { name } = req.body;
        if (!name) {
            res.status(400).send()
        } else {
            const deleted = await this.Product.deleteOne({ name: name })
            console.log('deleted', deleted)
            if (Object.keys(deleted).includes('deletedCount')) {
                res.status(204).send()
            } else {
                res.status(500).send()
            }
    
        }
    }
}
export default ProductsController