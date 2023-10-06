const express = require("express");
const router = express.Router();

let tasks = require("./tasks.json");

//Middleware para validar parametros
function validarEstadoParam(req, res, next) {
  const estado = req.params.estado;
  if (estado === "completas" || estado === "incompletas") {
    next();
  } else {
    res
      .status(400)
      .send("Estado no válido. Debe ser 'completas' o 'incompletas'.");
  }
}

//Ruta para obtener tareas completadas o incompletas
router.get("/:estado", validarEstadoParam, (req, res) => {
  const estado = req.params.estado;
  if (estado === "completas" || estado === "incompletas") {
    const filteredTasks = tasks.filter((task) => {
      return estado === "completas"
        ? task.isCompleted === true
        : task.isCompleted === false;
    });
    res.status(200).send(filteredTasks);
  } else {
    res
      .status(400)
      .send("Estado no válido. Debe ser 'completas' o 'incompletas'.");
  }
});

//router.use(validateparams);
module.exports = router;
