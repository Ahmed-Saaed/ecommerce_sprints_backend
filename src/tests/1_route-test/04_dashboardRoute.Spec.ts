import supertest from 'supertest';
import app from '../../server';
  // @ts-ignore
import DBMigrate from "db-migrate";

const request = supertest(app);

describe('dashboard routes endpoints responses', () => {
  it('the completed endpoint should return a status of 200', (): void => {
    request
      .get('/completed')
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