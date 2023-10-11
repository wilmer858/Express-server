const express = require("express");
const listView = require("./list-view-router");
const listEdit = require("./list-edit-router");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
let tasks = require("./tasks.json");
const app = express();
dotenv.config();
const port = 8080;

app.use(express.json());

const users = [
  { user: "user1", password: "password1" },
  { user: "user2", password: "password2" },
];

//Ruta login para autenticacion
app.post("/login", (req, res) => {
  const { user, password } = req.body;
  const userFind = users.find(
    (u) => u.user === user && u.password === password
  );
  if (userFind) {
    const pyload = { rol: "cliente" };
    const token = jsonwebtoken.sign(pyload, process.env.SECRET_KEY);
    return res.status(200).json({ message: "bienvenido", token });
  } else {
    return res.status(401).json({ error: "Invalid user name or password" });
  }
});

//Middleware para verificar los tokens
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "debes proporcionar un token" });
  }

  try {
    const tokenDecripted = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    req.data = tokenDecripted;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Ocurrio un error con el token" });
  }
}

//Ruta listar para validacion
app.get("/listar", authMiddleware, (req, res) => {
  res.status(200).json(req.data);
});

//Middleware para gestionar métodos http validos dentro del servidor
function method(req, res, next) {
  const method = req.method;
  if (
    method === "GET" ||
    method === "POST" ||
    method === "PUT" ||
    method === "DELETE"
  ) {
    next();
  } else {
    res.status(405).json({ error: "Método de solicitud http no válido" });
  }
}

app.use(method);

//Ruta para mostrar todas las tareas
app.get("/", (req, res) => {
  res.status(200).json({ tareas: tasks });
});

//Ruta para filtrar una tarea por su id
app.get("/:id", (req, res) => {
  const id = req.params.id;
  const task = tasks.find((task) => task.id == id);
  if (task) {
    res.status(200).json({ tarea: task });
  } else {
    res.status(400).json({ error: "El valor del parámetro no es válido." });
  }
});

//Ruta generica
app.use("/task", listView, listEdit);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
