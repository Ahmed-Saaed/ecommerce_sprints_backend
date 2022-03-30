import supertest from 'supertest';
import app from '../../server';
  // @ts-ignore
import DBMigrate from "db-migrate";

const request = supertest(app);

describe('users route endpoints responses', () => {
  it('the users index endpoint should return a status of 200', (): void => {
    request
      .get('/users')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('the users show endpoint should return a status of 200', (): void => {
    request
      .get('/users/1')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('the users create endpoint should return a status of 200', (): void => {
    request
      .post('/users')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('the users update endpoint should return a status of 200', (): void => {
    request
      .put('/users/1')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('the users authenticate endpoint should return a status of 200', (): void => {
    request
      .post('/users/authenticate')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });

  it('the users delete endpoint should return a status of 200', (): void => {
    request
      .delete('/users/1')
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
