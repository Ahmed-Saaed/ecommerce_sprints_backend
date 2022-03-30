import Client from "../database";

export type item = {
  id ?: string;
  name: string;
  description:string;
  category: string;
  price: number;
  image?: string;
}


export class product {
  async index():Promise<item[]>{
    try{
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'select * from products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    }catch (err){
      throw new Error(`cannot get the item ${err}`)
    }
  }

  async filter(category:string):Promise<item[]>{
    try{
      // @ts-ignore
      const conn = await Client.connect();
      const sql = `select * from products where category =$1`
      const result = await conn.query(sql, [category])
      conn.release()
      return result.rows
    }catch (err){
      throw new Error(`cannot get the item ${err}`)
    }
  }
  async show(id:number): Promise<item> {
    try {
    const sql = 'SELECT * FROM products WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find item ${id}. Error: ${err}`)
    }
  }

  async create(b: item): Promise<item> {
      try {
    const sql = 'INSERT INTO products (name,description, category, price,image) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [b.name, b.description, b.category, b.price, b.image])

    const item = result.rows[0]

    conn.release()

    return item
      } catch (err) {
          throw new Error(`Could not add new item ${b.name}}. Error: ${err}`)
      }
  }

  async update(b: item): Promise<item> {
      try {
    const sql = `UPDATE products SET name= $1 , description=$2, category= $3 ,price = $4 WHERE id = $5 RETURNING *`
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [b.name, b.description, b.category, b.price, b.id])

    const item = result.rows[0]

    conn.release()

    return item
      } catch (err) {
          throw new Error(`Could not add new item ${b.name}}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<item> {
      try {
    const sql = 'DELETE FROM products WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const item = result.rows[0]

    conn.release()

    return item
      } catch (err) {
          throw new Error(`Could not delete item ${id}. Error: ${err}`)
      }
  }
}