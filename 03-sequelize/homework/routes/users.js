const { Page, User } = require("../models");
const router = require("express").Router();

router.get("/", async function (req, res) {
  // Modificar para renderizar todas los usuarios que se encuentren
  // dento de la base de datos
  // Tu código acá:
  var users = await User.findAll();
  res.render("users", { users });
});

router.get("/:id", async function (req, res) {
  // Modificar para renderizar los datos del usuario seleccionado
  // Tu código acá:
  var id = req.params.id;
  var user = await User.findByPk(id, { include: Page }); // Busco por primary key con la ID y INCLUYO traerme el Page de ese PK
  res.render("unUsuarioEnParticular", { user });
});

module.exports = router;
