import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

app.post("/colournames", async function (request, response) {
  console.log(request.body);
  const name = request.body.name;
  const hexcode = request.body.hexcode;
  const huegroup = request.body.huegroup;
  await db.query(
    `INSERT INTO colournames (name, hexcode, huegroup) VALUES ($1, $2, $3)`,
    [name, hexcode, huegroup]
    // Group is the rough type of colour, Name is the colour name, and hexcode is the #XXXXXX value
  );
  response.json("POST endpoint here.");
});

app.listen(8080, () => console.log("Running on port 8080"));
