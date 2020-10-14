### Movie app

##### How to run?

1. Make sure you have mysql installed.
   2.Create mysql database.
2. In /backend/ run `npm i `
3. Remove \_ in `/backend/config/_config.env` file
   1. Fill out the variables with your data.
4. Set up knex.js

   - (if knex is not globaly installed, install it. `npm i -g knex`).

   1. Run the migrations from the /backend folder:
      - `knex migrate:latest`
      - `knex seed:run`

5. In /backend run `npm start`.
6. Open your browser on http://localhost:4000

---

Extra:
[Postman API docs (online)](https://documenter.getpostman.com/view/10381878/TVRoWkWp)
