import Client from "../database";



export type Review = {
  id ?: string;
  comment: string;
  rate:string;
  review_date?: string;
  order_id: string;
}

export class Reviews {

  async index():Promise<Review[]>{
    try{
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'select * from order_reviews'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    }catch (err){
      throw new Error(`cannot get the Review ${err}`)
    }
  }
  
  async show(id:number): Promise<Review> {
    try {
    const sql = 'SELECT * FROM order_reviews WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find Review ${id}. Error: ${err}`)
    }
  }

  async create(u: Review): Promise<Review> {
    try {
      
      const conn = await Client.connect()
      const sql = 'INSERT INTO order_reviews (comment, rate, , review_date, order_id) VALUES($1, $2, $3, $4) RETURNING *'



      const result = await conn.query(sql, [u.comment, u.rate, u.review_date,u.order_id])
      const Review = result.rows[0]

      conn.release()

      return Review
    } catch(err) {
      throw new Error(`unable create Review (${u.comment}): ${err}`)
    } 
  }

  async update(u: Review): Promise<Review> {
    try {
      
      const conn = await Client.connect()
      const sql = `UPDATE order_reviews SET comment= $1, rate= $2, review_date=$3 ,order_id= $4 WHERE id= $5 RETURNING *`

      const result = await conn.query(sql, [u.comment,u.rate, u.order_id, u.id])
      const Review = result.rows[0]

      conn.release()

      return Review
    } catch(err) {
      throw new Error(`unable update Review (${u.comment}): ${err}`)
    } 
  }

  async delete(id: string): Promise<Review> {
      try {
    const sql = 'DELETE FROM order_reviews WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const Review = result.rows[0]

    conn.release()

    return Review
      } catch (err) {
          throw new Error(`Could not delete Review ${id}. Error: ${err}`)
      }
  }
}