import express, { Request, Response } from 'express';
import {Order, Orders} from '../models/order';
import verifyAuthToken from '../middlewares/verifyAuth';


const store = new Orders();

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', show)
  app.post('/orders',verifyAuthToken, create)
  app.delete('/orders/:id',verifyAuthToken, destroy) 
  // add product
  app.post('/orders/:id/products', addProduct)
  app.post('/orders/:id/purchase', purchase)
}

const index = async(_req:Request , res:Response) => {
  try{
    const orders = await store.index()
    res.json(orders)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try{
    const order = await store.show(req.params.id)
    res.json(order)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {

  const order: Order = {
    status: req.body.status,
    purchace_date: req.body.purchace_date,
    delivery_date: req.body.delivery_date,
    user_id: req.body.user_id
  }
  
  try {
    const newOrder = await store.create(order)
    res.json(newOrder)
  }catch(err) {
    res.status(400)
    res.json(err)
  }
}

const addProduct = async (req: Request, res: Response) => {
  const quantity: number = req.body.quantity
  const order_id: string = req.params.id
  const product_id: string = req.body.product_id

  try {
    const addedProduct = await store.addProduct(quantity, product_id, order_id)
    res.json(addedProduct)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}

const purchase = async (req: Request, res: Response) => {
  const payment_type: string = req.body.payment_type
  const payment_value: number = parseInt(req.body.payment_value)
  const order_id: string = req.params.id

  try {
    const addedProduct = await store.purchase(payment_type, payment_value, order_id)
    res.json(addedProduct)
  }catch(err){
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


export default orderRoutes;