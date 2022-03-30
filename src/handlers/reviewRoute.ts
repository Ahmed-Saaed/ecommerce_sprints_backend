import express, { Request, Response } from 'express';
import {Review, Reviews} from '../models/review';
import verifyAuthToken from '../middlewares/verifyAuth';



// const Art = express.Router();
const store = new Reviews();


const reviewRoutes = (review: express.Application) => {
  review.get('/review', index)
  review.get('/review/:id', show)
  review.post('/review', create)
  review.delete('/review/:id', verifyAuthToken, destroy)
  review.put('/review/:id', verifyAuthToken, update)
}


const index = async(_req:Request , res:Response) => {
  try{
    const reviews = await store.index()
    res.json(reviews)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try{
    const review = await store.show(parseInt(req.params.id))
    res.json(review)
  }catch(err){
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  try {
      const review: Review = {
        comment: req.body.comment,
        rate: req.body.rate,
        review_date: req.body.date,
        order_id: req.body.order_id,

      }

        const newreview = await store.create(review)
        res.json(newreview)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const update = async (req: Request, res: Response) => {
  try {
      const review: Review = {
        id: req.params.id,
        comment: req.body.comment,
        rate: req.body.description,
        review_date: req.body.review_date,
        order_id: req.body.order_id,
      }

        const updatedreview = await store.update(review)
        res.json(updatedreview)
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


export default reviewRoutes;