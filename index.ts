import { Server, Router, SqliteDB } from "./vendors.ts";

const app = new Server();
const router = new Router();
const db = new SqliteDB(Deno.env.get("DB_PATH") || "./api.db");

router.get('/', (ctx) => {
  ctx.response.body = "deno says hi";
});

router.get('/init', (ctx) => {
  console.log("request");

  db.query(
    "CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
  );
  
  const names = ["Peter Parker", "Clark Kent", "Bruce Wayne"];
  
  names.forEach((name) => {
    db.query("INSERT INTO people (name) VALUES (?)", [name]);
  });

  ctx.response.body = "done";
})

app.use(router.allowedMethods());
app.use(router.routes());
await app.listen({ port: 8000 });

console.log("server started on port 8000");
