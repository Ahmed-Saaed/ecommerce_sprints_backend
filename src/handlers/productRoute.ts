import express, { Request, Response } from 'express';
import {item, product} from '../models/product';
import verifyAuthToken from '../middlewares/verifyAuth';



// const Art = express.Router();
const store = new product();


const productRoutes = (product: express.Application) => {
  product.get('/product', index)
  product.get('/product/:id', show)
  product.get('/product/:category', filter)
  product.post('/product', create)
  product.delete('/product/:id', verifyAuthToken, destroy)
  product.put('/product/:id', verifyAuthToken, update)
}


const index = async(_req:Request , res:Response) => {
  try{
    const items = await store.index()
    res.json(items)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try{
    const item = await store.show(parseInt(req.params.id))
    res.json(item)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}
const filter = async (req: Request, res: Response) => {
  try{
    const item = await store.filter(req.params.category)
    res.json(item)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  try {
      const item: item = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image:req.body.image
      }

        const newitem = await store.create(item)
        res.json(newitem)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const update = async (req: Request, res: Response) => {
  try {
      const item: item = {
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image:req.body.image
      }

        const updateditem = await store.update(item)
        res.json(updateditem)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
  try{
    const deleted = await store.delete(req.params.id as string)
    res.json(deleted)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}


export default productRoutes;