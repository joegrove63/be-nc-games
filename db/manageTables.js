const db = require('./connection');

const createTables = () => {
  return db
    .query(
      `
    CREATE TABLE categories (
        slug VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
        description VARCHAR(255)
    )`
    )
    .then(() => {
      return db
        .query(
          `
        CREATE TABLE users (
            username VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
            avatar_url VARCHAR(255),
            name VARCHAR(255) NOT NULL
        )`
        )
        .then(() => {
          return db.query(`
            CREATE TABLE reviews (
                review_id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                review_body VARCHAR(1000),
                designer VARCHAR(255),
                review_img_url VARCHAR(255) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
                votes INT DEFAULT 0,
                category VARCHAR(255) REFERENCES categories(slug),
                owner VARCHAR(255) REFERENCES users(username),
                created_at TIMESTAMP DEFAULT TIMESTAMP
            )`);
        });
    });
};
