import { DashboardQueries } from '../../models/services/dashboard';
import {  Orders } from "../../models/order";;
import { product } from "../../models/product";
import { Users } from "../../models/user";
  // @ts-ignore
import DBMigrate from "db-migrate";

const dashboard = new DashboardQueries()
const store = new Orders();
const astore = new product();
const ustore = new Users();

describe("Dashboard Model", () => {

  beforeAll(async (done) => {

      await astore.create({
      name: 'monaliza',
      description: 'davanci',
      category: 'Renaissance',
      price: 6})

      await ustore.create({
        username: 'ahmed',
        email: 'a@a.com',
        role: 'admin',
        password: 'password'})
  
      await store.create({
        status: 'complete',
        purchace_date:'2/2/2020',
        delivery_date:'3/3/2020',
        user_id: '1',
      });

      done()
  })

  it('is a get completed order method that should return the correct completed orders', async () => {
    const result = await dashboard.completedOrder()

      expect(result[0]).toEqual({ username: 'ahmed', status: 'complete' })
  });

  afterAll(async function clearTestData () {
    let dbMigrate = DBMigrate.getInstance(true, { env: "test" });
    await dbMigrate.reset();
    await dbMigrate.down();
  });
});