import express from 'express';
import { Product } from '../models/products'
import ProductsController  from '../controller/products'
interface IOptProduct {
    name?: string
    desc?: string
    price?: number
}
 
const router = express.Router()
const productsController = new ProductsController(Product);
router.get('/', (req, res) => productsController.get(req, res));
router.get('/all', (req, res) => productsController.getall(req, res));
router.get('/:id', (req, res) => productsController.getById(req, res));
router.post('/', (req, res) => productsController.post(req, res));
router.delete('/',(req, res) => productsController.delete(req, res))



export default router;