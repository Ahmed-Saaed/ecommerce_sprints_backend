import bcrypt from 'bcrypt';
import Client from "../database";



export type User = {
  id ?: string;
  username: string;
  email:string;
  role?: string;
  password: string;
}

const {BCRYPT_PASSWORD:pepper,SALT_ROUNDS:saltRounds} = process.env


export class Users {

  async index():Promise<User[]>{
    try{
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'select * from users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    }catch (err){
      throw new Error(`cannot get the User ${err}`)
    }
  }
  async show(id: string): Promise<User> {
    try {
    const sql = 'SELECT * FROM users WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find User ${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
    try {
      
      const conn = await Client.connect()
      const sql = 'INSERT INTO users (username, email, , role, password_digest) VALUES($1, $2, $3, $4) RETURNING *'

      const hash = bcrypt.hashSync(
        u.password + pepper, 
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [u.username, u.email, u.role, hash])
      const user = result.rows[0]

      conn.release()

      return user
    } catch(err) {
      throw new Error(`unable create user (${u.username}): ${err}`)
    } 
  }

  async update(u: User): Promise<User> {
    try {
      
      const conn = await Client.connect()
      const sql = `UPDATE users SET username= $1, email= $2, role=$3 ,password_digest= $4 WHERE id= $5 RETURNING *`


      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [u.username,u.email, hash, u.id])
      const user = result.rows[0]

      conn.release()

      return user
    } catch(err) {
      throw new Error(`unable update user (${u.username}): ${err}`)
    } 
  }

  async authenticate(username: string, password: string): Promise<User | null> {

    const conn = await Client.connect()
    const sql = 'SELECT * FROM users WHERE username=($1)'

    const result = await conn.query(sql, [username])

    // console.log(password+pepper)

    if(result.rows.length) {

      const user = result.rows[0]

      if (bcrypt.compareSync(password+pepper, user.password_digest)) {
        return user
      }
    }

    return null
  }

  async delete(id: string): Promise<User> {
      try {
    const sql = 'DELETE FROM users WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const User = result.rows[0]

    conn.release()

    return User
      } catch (err) {
          throw new Error(`Could not delete User ${id}. Error: ${err}`)
      }
  }
}