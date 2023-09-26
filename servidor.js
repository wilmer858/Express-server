const express = require("express");
const app = express();

let tasks = require("./tasks");

const port = 8000;

app.use(express.json());

app.get("/tasks", (req, res) => {
  res.status(200).send(tasks);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/tasks`);
});
