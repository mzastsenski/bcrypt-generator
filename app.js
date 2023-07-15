import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 4000;
const directory = new URL("frontend", import.meta.url);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(directory.pathname));
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/test", (_, res) => res.send("ok"));

app.post("/hash", (req, res) => {
  const { pass, rounds } = req.body;
  const hash = bcrypt.hashSync(pass, rounds);
  res.json(hash);
});

app.post("/compare", (req, res) => {
  const { pass, hash } = req.body;
  const compare = bcrypt.compareSync(pass, hash);
  res.send(compare);
});

app.get("*", (_, res) => res.sendFile(`${directory.pathname}/index.html`));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
