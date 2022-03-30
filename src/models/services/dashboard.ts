import Client from '../../database'

export class DashboardQueries {
  // Get all users that have made orders
  async completedOrder(): Promise<{username: string, status: string}[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect()
      const sql = `SELECT username , status FROM users RIGHT JOIN orders ON users.id = orders.user_id WHERE orders.status = 'complete'`

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get completed orders: ${err}`)
    } 
  }
}