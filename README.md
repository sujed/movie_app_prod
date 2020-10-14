### Movie app

##### How to run?

1. Make sure you have mysql installed.
2. Run `npm i `
3. Remove \_ in `/config/_config.env` file
   1. Fill out the variables with your data.
4. Set up knex.js.

   1. Run the migrations from the root folder:
      - `knex migrate:latest`
      - `knex seed:run`

5. Run `npm start`.
6. Open your browser on http://localhost:4000

---

Extra:
[Postman online API docs](https://documenter.getpostman.com/view/10381878/TVRoWkWp)
