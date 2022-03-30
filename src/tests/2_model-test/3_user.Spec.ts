import {User, Users} from '../../models/user'
import bcrypt from 'bcrypt';
// @ts-ignore
import DBMigrate from "db-migrate";

const users = new Users();
const testPassword  = '1234abc';

describe("User Model", () => {

  it('should have an index method', () => {
    expect(users.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(users.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(users.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(users.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(users.delete).toBeDefined();
  });

  it('is a create method which should add a user', async () => {
    // @ts-ignore
    const result = await users.create({
      username: 'ahmed',
      email: 'a@a.com',
      role: 'admin',
      password: testPassword,
    });

    // const hash = bcrypt.hashSync(
    //   testPassword + pepper, 
    //   parseInt(saltRounds as string)
    // );

    expect([result.id,result.username]).toEqual(['1','ahmed']);
  });

  it('is a show method which should return the correct user', async () => {
    const result = await users.show("1");


    expect([result.id,result.username]).toEqual(['1','ahmed',]);
  });

  it('is an authenticate method which should verfiy the user', async () => {
    const result = await users.authenticate('ahmed', testPassword);

    // @ts-ignore
    expect(result.username).toEqual('ahmed');
  }); 

  it('is an update method which should update a user', async () => {
    // @ts-ignore
    const result = await users.update({
      username: 'naira',
      email: 'a@a.com',
      password: 'password',
      role: 'admin',
      id: '1',
    });


  expect([result.id,result.username]).toEqual(['1','naira']);
  });

  it('is a delete method which should remove the user', async () => {
    users.delete("1");
    const result = await users.index()

    expect(result).toEqual([]);
  });


  afterAll(async function clearTestData () {
    let dbMigrate = DBMigrate.getInstance(true, { env: "test" });
    await dbMigrate.reset();
    await dbMigrate.up();
  });
});