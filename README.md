Here is the hosted link https://joes-games.herokuapp.com/api

For this project I have built an API to mimic a real world back-end service such as reddit. This API was built for the purpose of accessing application data programmatically and provide this information to my front end project/architecture. I have created a database using PostgreSQL and interacted with it using node-postgres and completed the project using skills such as RESTful API design and building a server with Express along with test-driven-development and error handling.

Minimum version of Node.js v15.11.0
Minimum version of postgres 12.8

TO DO

1. Copy the github link and navigate to your desired folder to store the cloned project and enter git clone LINK

2. Create two files:

   FILENAME: .env.development
   paste PGDATABASE=nc_games to line 1 of this file.

   FILENAME: .env.test
   paste PGDATABASE=nc_games_test to line 1 of this file.

3. Install all dependencies

   run: npm i

4. Seed local databse

   run: npm run setup-dbs

   run: npm run seed
