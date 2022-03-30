import Client from './../database';


export type Order = {
          id?:string;
          status:string;
          purchace_date:string;
          delivery_date:string;
          user_id:string;
}

export type ProductOrder = {
          id?:number;
          quantity:number;
          product_id:string;
          order_id:string;
}

export type OrderPayment = {
          id?:number;
          payment_type:string;
          payment_value:number;
          order_id:string;
}

export class Orders {
  async index():Promise<Order[]>{
    try{
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'select * from orders'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    }catch (err){
      throw new Error(`cannot get the Order ${err}`)
    }
  }
  async show(id:string): Promise<Order> {
    try {
    const sql = 'SELECT * FROM orders WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find Orders ${id}. Error: ${err}`)
    }
  }


  async create(o: Order): Promise<Order> {
      try {
    const sql = 'INSERT INTO orders (status, purchace_date,delivery_date, user_id) VALUES ($1, $2, $3, $4) RETURNING *'

    const conn = await Client.connect()

    const result = await conn
        .query(sql, [o.status, o.purchace_date, o.delivery_date, o.user_id])

    const Order = result.rows[0]

    conn.release()

    return Order
      } catch (err) {
          throw new Error(`Could not add new Order ${o.status}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<Order> {
    try {
  const sql = 'DELETE FROM orders WHERE id=($1)'
  // @ts-ignore
  const conn = await Client.connect()

  const result = await conn.query(sql, [id])

  const order = result.rows[0]

  conn.release()

  return order
    } catch (err) {
        throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
}

// add to the cart will add the information of the order to the table product_order

  async addProduct(quantity: number,  product_id: string, order_id: string): Promise<ProductOrder> {
    try {
      const sql = 'INSERT INTO product_order (quantity, product_id, order_id) VALUES($1, $2, $3) RETURNING *'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn
          .query(sql, [quantity, product_id, order_id])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`)
    }
  }

  // will add the payment details to the order_payments table

  async purchase(payment_type: string,  payment_value: number, order_id: string): Promise<OrderPayment> {
    try {
      const sql = 'INSERT INTO order_payments (payment_type, payment_value, order_id) VALUES($1, $2, $3) RETURNING *'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn
          .query(sql, [payment_type, payment_value, order_id])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add complete the transaction of the order ${order_id}: ${err}`)
    }
  }



}