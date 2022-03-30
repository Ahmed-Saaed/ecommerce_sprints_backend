import {item, product} from '../../models/product'
  // @ts-ignore
import DBMigrate from "db-migrate";


const productStore = new product();


describe("item Model", () => {
  it('should have an index method', () => {
    expect(productStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(productStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(productStore.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(productStore.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(productStore.delete).toBeDefined();
  });

  it('is a create method that should add a item', async () => {
    // @ts-ignore
    const result = await productStore.create({
      name: 'monaliza',
      description: 'davanci',
      category: 'Renaissance',
      price: 6,
    });

  expect(result).toEqual({  
      id: '1',
      name: 'monaliza',
      description: 'davanci',
      category: 'Renaissance',
      price: 6
    });
  });

  it('is an show method that should return the correct item', async () => {
    const result = await productStore.show(1);
    expect(result).toEqual({
      id: '1',
      name: 'monaliza',
      description: 'davanci',
      category: 'Renaissance',
      price: 6,
    });
  });

  it('it is an update method which should update the item', async () => {
    const result = await productStore.update({
      id: '1',
      name: 'the scream',
      description: 'munch',
      category: 'Expressionism',
      price: 8,
    });

    expect(result).toEqual({
      id: '1',
      name: 'the scream',
      description: 'munch',
      category: 'Expressionism',
      price: 8,
    });
  });

  it('is a delete method which should remove the item', async () => {
    await productStore.delete("1");
    const result = await productStore.index()

    expect(result).toEqual([]);
  });

  afterAll(async function clearTestData () {
    let dbMigrate = DBMigrate.getInstance(true, { env: "test" });
    await dbMigrate.reset();
    await dbMigrate.up();
  });
});