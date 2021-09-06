const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

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
            description: expect.any(String),
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
      .then(({ body }) => {
        const review = body.review;
        expect(review).toEqual({
          review_id: 1,
          title: 'Agricola',
          review_body: 'Farmyard fun!',
          designer: 'Uwe Rosenberg',
          comment_count: '0',
          review_img_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          votes: 1,
          category: 'euro game',
          owner: 'mallionaire',
          created_at: '2021-01-18T10:00:20.514Z',
        });
      });
  });
  test('respond with status:404 Not Found when review id does not exist', () => {
    const review_id = 999;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe(`No review found for review_id: ${review_id}`);
      });
  });
  test('respond with status:400 Bad Request when given an invalid review id', () => {
    const review_id = 'notAnId';
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad Request :(');
      });
  });
});

describe('PATCH /api/reviews/:review_id', () => {
  test('responds with status: 200 & updated votes by inc_votes', () => {
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
          created_at: '2021-01-18T10:00:20.514Z',
        });
      });
  });
  test('respond with status:404 Not Found when resource does not exist', () => {
    const review_id = 999;
    const incVotes = { inc_votes: 10 };
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .send(incVotes)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe(`No review found for review_id: ${review_id}`);
      });
  });
  test('respond with status:400 Bad Request when given an invalid id', () => {
    const review_id = 'notAnId';
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad Request :(');
      });
  });
  test('respond with status:400 Bad Request when missing inc_votes on request body', () => {
    const review_id = 1;
    const incVotes = {};
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .send(incVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad Request :( Missing required fields');
      });
  });
  test('respond with status:400 Bad Request when more than one property', () => {
    const review_id = 1;
    const incVotes = { inc_votes: 1, name: 'Mitch' };
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .send(incVotes)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          'Bad Request :( More than one property is not allowed'
        );
      });
  });
});

describe('GET /api/reviews', () => {
  test('responds with a status:200 & an reviews array of objects', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then((response) => {
        const { reviews } = response.body;
        expect(reviews.length).toBeGreaterThan(0);
        reviews.forEach((review) => {
          expect(review).toEqual({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(String),
          });
        });
      });
  });
  test('responds with a status:200 & a reviews array of objects, default sort_by(date) & default order(descending)', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then((response) => {
        const { reviews } = response.body;
        expect(reviews).toBeSortedBy('created_at', {
          descending: true,
        });
      });
  });
  test('responds with a status:200 & a reviews array of objects, and can be filtered by a sort_by query', () => {
    const query = 'review_id';
    return request(app)
      .get(`/api/reviews?sort_by=${query}`)
      .expect(200)
      .then((response) => {
        const { reviews } = response.body;
        expect(reviews).toBeSortedBy(`${query}`, {
          descending: true,
        });
      });
  });
  test('responds with a status:200 & a reviews array of objects, and can be filtered asc or desc', () => {
    return request(app)
      .get(`/api/reviews?order=asc`)
      .expect(200)
      .then((response) => {
        const { reviews } = response.body;
        expect(reviews).toBeSortedBy('created_at', {
          descending: false,
        });
      });
  });
  test('responds with a status:200 & a reviews array of objects, filtered by sort_by(review_id) filtered asc', () => {
    const query = 'review_id';
    return request(app)
      .get(`/api/reviews?sort_by=${query}&order=asc`)
      .expect(200)
      .then((response) => {
        const { reviews } = response.body;
        expect(reviews).toBeSortedBy('review_id', {
          descending: false,
        });
      });
  });
  test('responds with a status:200 & an array of ONLY review objects with the category in the query', () => {
    const query = 'dexterity';
    return request(app)
      .get(`/api/reviews?category=${query}`)
      .expect(200)
      .then((response) => {
        const { reviews } = response.body;
        expect(reviews.length).toBe(1);
        expect(reviews[0].category).toBe('dexterity');
      });
  });
  test('responds with a status:400 Bad Request when sort_by does not exist ', () => {
    return request(app)
      .get(`/api/reviews?sort_by=not-a-column`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad Request :( Invalid sort_by query');
      });
  });
  test('responds with a status:400 Bad Request when given an invalid order query ', () => {
    return request(app)
      .get(`/api/reviews?order=hello`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad Request :( Invalid order query');
      });
  });
  test('responds with a status:400 Bad Request when category given is not in the database ', () => {
    return request(app)
      .get(`/api/reviews?category=children's game`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          'Bad Request :( Category does not exist or does not have any reviews associated with it'
        );
      });
  });
});

describe('GET /api/reviews/:review_id/comments', () => {
  test('responds with status:200 & an array of comments for the given review_id, with the below properties', () => {
    const review_id = 2;
    return request(app)
      .get(`/api/reviews/${review_id}/comments`)
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments.length).toBe(3);
        expect(comments[0]).toEqual({
          comment_id: 1,
          votes: 16,
          created_at: '2017-11-22T12:43:33.389Z',
          author: 'bainesface',
          body: 'I loved this game too!',
        });
      });
  });
  test('responds with status:200 & an empty array when existing review_id with no reviews', () => {
    const reviewIdWithNoComments = 1;
    return request(app)
      .get(`/api/reviews/${reviewIdWithNoComments}/comments`)
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toEqual([]);
      });
  });
  test('responds with status:404 when given review_id that does not exist', () => {
    const review_id = 999;
    return request(app)
      .get(`/api/reviews/${review_id}/comments`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Review id does not exist');
      });
  });
  test('responds with status:400 when given invalid review_id', () => {
    const review_id = 'banana';
    return request(app)
      .get(`/api/reviews/${review_id}/comments`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad Request :(');
      });
  });
});

describe('POST /api/reviews/:review_id/commments', () => {
  test('responds with status:200 & and responds with the posted comment', () => {
    const review_id = 1;
    const reqBody = {
      username: 'dav3rid',
      body: 'lovely stuff!',
    };
    return request(app)
      .post(`/api/reviews/${review_id}/comments`)
      .send(reqBody)
      .expect(200)
      .then(({ body }) => {
        const { postedComment } = body;
        expect(postedComment).toEqual({
          comment_id: expect.any(Number),
          author: reqBody.username,
          review_id: review_id,
          votes: expect.any(Number),
          created_at: expect.any(String),
          body: reqBody.body,
        });
      });
  });
  test('responds with status:400 Bad Request when missing required fields in the sent body', () => {
    const review_id = 1;
    const reqBody = {};
    return request(app)
      .post(`/api/reviews/${review_id}/comments`)
      .send(reqBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad Request - Missing required fields');
      });
  });
  test('responds with status:400 Bad Request when missing required fields in the sent body', () => {
    const review_id = 1;
    const reqBody = { body: 'ive forgotten to put my username' };
    return request(app)
      .post(`/api/reviews/${review_id}/comments`)
      .send(reqBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad Request - Missing required fields');
      });
  });
  test('responds with status:400 Bad Request when given a username that does not exist', () => {
    const review_id = 1;
    const reqBody = { username: 'usernamedoesnotexist', body: 'lovely stuff!' };
    return request(app)
      .post(`/api/reviews/${review_id}/comments`)
      .send(reqBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad Request :(');
      });
  });
  test('responds with status:400 Bad Request when the given review id does not exist', () => {
    const review_id = 999;
    const reqBody = { username: 'dav3rid', body: 'lovely stuff!' };
    return request(app)
      .post(`/api/reviews/${review_id}/comments`)
      .send(reqBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Bad Request :(');
      });
  });
});

describe('GET /api', () => {
  test('status: 200, responds with json representation of all the available endpoints of the api', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({ body }) => {
        expect(Object.keys(body).length).toBe(7); // need to update as I add endpoints to endpoints.json
        expect(body).toEqual({
          'GET /api': expect.any(Object),
          'GET /api/categories': expect.any(Object),
          'GET /api/reviews': expect.any(Object),
          'GET /api/reviews/:review_id': expect.any(Object),
          'PATCH /api/reviews/:review_id': expect.any(Object),
          'GET /api/reviews/:review_id/comments': expect.any(Object),
          'POST /api/reviews/:review_id/comments': expect.any(Object),
        });
      });
  });
});
