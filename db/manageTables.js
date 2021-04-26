const db = require('./connection');

const createTables = () => {
  return db
    .query(
      `
    CREATE TABLE categories (
        slug VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
        description VARCHAR(255) NOT NULL
    )`
    )
    .then(() => {
      return db.query(
        `
        CREATE TABLE users (
            username VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
            avatar_url VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL
        )`
      );
    })
    .then(() => {
      return db.query(
        `
        CREATE TABLE reviews (
            review_id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            review_body VARCHAR(1000) NOT NULL,
            designer VARCHAR(255) NOT NULL,
            review_img_url VARCHAR(255) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
            votes INT DEFAULT 0,
            category VARCHAR(255) REFERENCES categories(slug),
            owner VARCHAR(255) REFERENCES users(username),
            created_at TIMESTAMP
        )`
      );
    })
    .then(() => {
      return db.query(`
      CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY NOT NULL,
        author VARCHAR(255) REFERENCES users(username),
        review_id INT REFERENCES reviews(review_id),
        votes INT DEFAULT 0,
        created_at TIMESTAMP,
        body VARCHAR(500) NOT NULL
      )`);
    });
};

const dropTables = () => {
  return db.query(`DROP TABLE IF EXISTS comments`).then(() => {
    return db.query(`DROP TABLE IF EXISTS reviews`).then(() => {
      return db.query('DROP TABLE IF EXISTS users').then(() => {
        return db.query('DROP TABLE IF EXISTS categories');
      });
    });
  });
};

module.exports = { createTables, dropTables };
