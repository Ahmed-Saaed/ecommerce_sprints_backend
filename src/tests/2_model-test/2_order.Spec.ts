import { Order ,GalleryOrder , Orders } from "../../models/order";
import { item, product } from "../../models/product";
import { User ,Users } from "../../models/user";
// @ts-ignore
import DBMigrate from "db-migrate";



const store = new Orders();
const astore = new product();
const ustore = new Users();

describe("Orders Model", () => {

  beforeAll(async () => {

    await ustore.create({
    username: 'naira',
    email: 'a@a.com',
    role: 'admin',
    password: 'password'})

    await astore.create({
    name: 'monaliza',
    description: 'davanci',
    category: 'Renaissance',
    price: 6})

    // await store.create({
    //   status:'pending',
    //   user_id: '1',
    // });
  })


  it('should have an index method', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('is a create method that should add an ArtPiece order', async () => {
    // @ts-ignore
    const result = await store.create({
      status:'pending',
      user_id: '1',
    });

  expect(result).toEqual({  
      id: '1',
      status: 'pending',
      purchace_date:'2/2/2020',
      delivery_date:'3/3/2020',
      user_id: '1'
    });
  });

  it('is an show method that should return the correct ArtPiece order', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: '1',
      status:'pending',
      purchace_date:'2/2/2020',
      delivery_date:'3/3/2020',
      user_id: '1',
    });
  });


  it('is an addProduct method that should add product to gallery_order', async () => {
    const result = await store.addProduct(3, "1", "1");

    expect(result).toEqual({
      id:1,
      quantity:3,
      art_id: '1',
      order_id: '1',
    });
  });

  afterAll(async function clearTestData () {
    let dbMigrate = DBMigrate.getInstance(true, { env: "test" });
    await dbMigrate.reset();
    await dbMigrate.up();
  });
});