import supertest from 'supertest';
import app from '../../server';
  // @ts-ignore
import DBMigrate from "db-migrate";

const request = supertest(app);

describe('orders route endpoints responses', () => {
  it('the orders index endpoint should return a status of 200', (): void => {
    request
      .get('/orders')
      .then((response) => {
        expect(response.status).toBe(200);
      });
    });

    it('the orders create endpoint should return a status of 200', (): void => {
      request
        .post('/orders')
        .then((response) => {
          expect(response.status).toBe(200);
        });
    });

  it('the orders show endpoint should return a status of 200', (): void => {
    request
      .get('/orders/1')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });


  it('the orders addproduct endpoint should return a status of 200', (): void => {
    request
      .post('/orders/1/products')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });


  it('the orders delete endpoint should return a status of 200', (): void => {
    request
      .delete('/orders/1')
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
