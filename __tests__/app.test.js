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
  test('This endpoint should respond with a status of 200 & all of the categories', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then((response) => {
        const categories = response.body.categories;
        expect(categories.length).toBeGreaterThan(0);
        categories.forEach((category) => {
          expect(category).toEqual({
            slug: expect.any(String),
            description: expect.any(String)
          });
        });
      });
  });
});

describe('not found request for api/bananas', () => {
  test('should respond status:404 when sent request not found', () => {
    return request(app)
      .get('/api/bananas')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Not Found');
      });
  });
});

describe('GET /api/reviews/:review_id', () => {
  test('respond with status:200 & the review from the specific review_id', () => {
    const review_id = 1;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(200)
      .then((response) => {
        const review = response.body.review;
        expect(review).toEqual({
          review_id: 1,
          title: 'Agricola',
          review_body: 'Farmyard fun!',
          designer: 'Uwe Rosenberg',
          review_img_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          votes: 1,
          category: 'euro game',
          owner: 'mallionaire',
          created_at: '2021-01-18T10:00:20.514Z'
        });
      });
  });
  test('respond with status:404 Not Found when path does not exist', () => {
    const review_id = 999;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe(`No review found for review_id: ${review_id}`);
      });
  });
});

describe.only('PATCH /api/reviews/:review_id', () => {
  test('responds with status: 200 & updated votes by inc_votes', () => {
    //UPDATE THE DESCRIPTION
    const review_id = 1;
    const incVotes = { inc_votes: 10 };
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .send(incVotes)
      .expect(200)
      .then(({ body }) => {
        const review = body.review;
        expect(review).toEqual({
          review_id: 1,
          title: 'Agricola',
          review_body: 'Farmyard fun!',
          designer: 'Uwe Rosenberg',
          review_img_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          votes: 11,
          category: 'euro game',
          owner: 'mallionaire',
          created_at: '2021-01-18T10:00:20.514Z'
        });
      });
  });
});

// describe('GET /api/reviews', () => {
//   test('responds with a status code:200 & an reviews array of objects', () => {
//     return request(app)
//       .get('/api/reviews')
//       .expect(200)
//       .then((response) => {
//         const { reviews } = response.body;
//         expect(reviews.length).toBeGreaterThan(0);
//         reviews.forEach((review) => {
//           expect(review).toEqual({
//             owner: expect.any(String),
//             title: expect.any(String),
//             review_id: expect.any(Number),
//             category: expect.any(String),
//             review_img_url: expect.any(String),
//             created_at: expect.any()
//           });
//         });
//       });
//   });
//   test('responds with a status code:200 & an reviews array of objects, and can accept any of the following queries - sort_by, order & category', () => {});
// });
