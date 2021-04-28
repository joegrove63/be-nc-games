const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');
const categoriesRouter = require('../routers/categories.router');

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe('GET /api/categories', () => {
  test.only('This endpoint should respond with a status of 200 & all of the categories', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then((response) => {
        const categories = response.body.categories;
        expect(categories).toHaveLength(4);
        expect(categories).toEqual([
          {
            slug: 'euro game',
            description: 'Abstact games that involve little luck'
          },
          {
            slug: 'social deduction',
            description: "Players attempt to uncover each other's hidden role"
          },
          {
            slug: 'dexterity',
            description: 'Games involving physical skill'
          },
          {
            slug: "children's games",
            description: 'Games suitable for children'
          }
        ]);
        categories.forEach((category) => {
          expect(typeof category.slug).toBe('string');
          expect(typeof category.description).toBe('string');
        });
      });
  });
});
