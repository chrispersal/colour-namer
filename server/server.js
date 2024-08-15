import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pg from "pg";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.get("/", function (request, response) {
  response.json(
    "Radical simply means grasping things at the root. - Angela Davis"
  );
});
app.get("/colournames", async function (request, response) {
  const data = await db.query(`SELECT * FROM colournames`);
  response.json(data.rows);
});

app.listen(8080, () => console.log("Running on port 8080"));
