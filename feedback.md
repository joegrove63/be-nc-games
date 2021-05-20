# BE Northcoders Portfolio Check List

## Readme

- [ ] Link to hosted version
- [ ] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `.env.test` and `.env.development` files
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

  - The above can all be sorted once you're finished and ready to show it off 😀

## General

- [ ] Remove any unnecessary `console.logs` and comments
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)
- [ ] .gitignore the `.env` files
  - Again, you can tidy everything up once you're done
  - Remember to keep a console.log in a `handle500s` error handler so you can see if there's anything you've missed going forward
  - Remember also the comments we left detailing what to do in certain files - you can do a project wide search with VS Code

## Connection to db

- ✅ Throw error if `process.env.PGDATABASE` is not set
  - Remember to extend this to also check for `process.env.DATABASE_URL` when you've hosted 👍

## Creating tables

- [ ] Use `NOT NULL` on required fields
  - I would suggest adding a `NOT NULL` restriction to any field you never want leaving blank eg. columns that reference another table
- ✅ Default `created_at` in articles/reviews and comments tables to the current date:`TIMESTAMP DEFAULT NOW()`
  - `CURRENT_TIMESTAMP` achieves the same thing 😀
- [ ] Delete all comments when the reviews they are related to is deleted: Add `ON DELETE CASCADE` to `review_id` column in `comments` table.
  - Something to think about when it comes to deleting a review 👍

## Inserting data

- ✅ Make sure util functions do not mutate data
  - Nice implementations for your utils!
- ✅ Make util functions easy to follow with well named functions and variables
  - If I'm being picky - `amendDate` could be more appropriately named `amendDates` as it accepts an array and amends multiple `created_at` properties 👍
- ✅ Test util functions
  - Nice tests for mutation!
  - I might suggest that your tests for `amendDate` provide an input that includes all properties rather than just `created_at` so you can assert the others have not been changed
- ✅ Drop tables and create tables in seed function

## Tests

- ✅ Seeding before each test
- ✅ If asserting inside a `forEach`, also has an assertion to check length is at least > 0
  - Remember to apply this if using again later on
- [ ] Ensure all tests are passing
- [ ] Cover all endpoints and errors

  - I appreciate I'm providing feedback before you've finished so understand there's nore to get in here 👍

  - `categoriesRouter` seems to have been required in by mistake
  - The tests that are here at the moment look great!
    - The last one `respond with status:404 Not Found when path does not exist` is using string interpolation syntax in a regular string - you may have already sorted this 😀
  - I might suggest that the test for "path not found" shouldn't be nested in the describe of `GET /api/categories` as it actually applies to any path that isn't an endpoint you accept 👍

## Routing

- ✅ Split into api, categories, users, comments and reviews routers
- ✅ Use `.route` for endpoints that share the same path
- [ ] Use `.all` for 405 errors (optional)
  - A nice tip for handling invalid HTTP request methods when the time comes

## Controllers

- ✅ Name functions and variables well
- ✅ Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`)
  - Controllers look great! I would suggest that instead of naming a file after each controller, you can create `category-controllers.js` and `review-controllers.js` etc. to group them together
  - On this note, I would say that `getCategories` doesn't belong in `api-controller.js` 👍
  - You are invoking `next` but not supplied a parameter for it in one controller - you may have already spotted this!

## Models

- Protected from SQL injection
  - ✅ Using parameterized queries for values in `db.query` e.g `$1` and array of variables
  - [ ] Sanitizing any data for tables/columns, e.g. whitelisting when using template literals or pg-format's `%s`
    - This will be crucial when inserting data and applying a query that represents a column
- ✅ Consistently use either single object argument _**or**_ multiple arguments in model functions
  - For now yes! Just remember to stick to this or remain consistent if you start to pass full objects to models 👍
- [ ] Use `LEFT JOIN` for comment counts

  - This will be crucial to generate the comment counts which I can see hasn't been implemented in the tests yet - it will ensure any reviews that have no comments are not left behind

  - Looks like the same issue with `${review_id}` placed in a regular string 👍

## Errors

- [ ] Use error handling middleware functions in app and extracted to separate directory/file
  - Consider extracting your error handling behaviour into separate error handling middleware functions as this can keep `app.js` tidy and you can separate behaviour associated with each error more clearly
- ✅ Consistently use `Promise.reject` in either models _**OR**_ controllers
  - Currently taking place in models which is where I'd be doing it! Carry on this trend going forward 😀

## Extra Advanced Tasks

### Easier

- [ ] Patch: Edit an article/review body
- [ ] Patch: Edit a comment body
- [ ] Patch: Edit a user's information
- [ ] Get: Search for an article/review by title
- [ ] Post: add a new user

### Harder

- [ ] Protect your endpoints with JWT authorization. We have notes on this that will help a bit, _but it will make building the front end of your site a little bit more difficult_
- [ ] Get: Add functionality to get articles/reviews created in last 10 minutes
- [ ] Get: Get all articles/reviews that have been liked by a user. This will require an additional junction table.
- [ ] Research and implement online image storage or random generation of images for topics

- The above are some suggestions of features you can implement if you'd like to take this further bneyond the README

Overall, so far so good! There are so many moving parts to this sprint and you should be really pleased with the progress you've made!

Please don't be a stranger if you have any questions regarding any of the above or anything else for that matter!

Well done Joe 🎉
