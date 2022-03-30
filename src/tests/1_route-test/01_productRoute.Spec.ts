import supertest from 'supertest';
import app from '../../server';
  // @ts-ignore
import DBMigrate from "db-migrate";

const request = supertest(app);

describe('product route endpoints responses', () => {
  it('the product get endpoint should return a status of 200', (): void => {
    request
      .get('/product')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('the product show endpoint should return a status of 200', (): void => {
    request
      .get('/product/1')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('the product post endpoint should return a status of 200', (): void => {
    request
      .post('/product')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('the product update endpoint should return a status of 200', (): void => {
    request
      .put('/product/1')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('the product delete endpoint should return a status of 200', (): void => {
    request
      .delete('/product/1')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  afterAll(async function clearTestData () {
    let dbMigrate = DBMigrate.getInstance(true, { env: "test" });
    await dbMigrate.reset();
    await dbMigrate.up();
  });
});
