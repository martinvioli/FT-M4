const { Page, Category } = require("../models");
const router = require("express").Router();

router.get("/", async function (req, res) {
  // Modificar para devolver los datos de todas las categorias existentes
  // Tu código acá:
  var categorias = await Category.findAll();
  await res.json(categorias);
});

router.get("/:idCategory", async function (req, res) {
  // Modificar para que cuando se seleccione una "Category" en particular se muestren
  // todas las páginas que estén dentro de dicha categoría
  // Tu código acá:
  var id = req.params.idCategory;
  var datos = await Category.findByPk(id, { include: Page });
  await res.json(datos);
});

module.exports = router;
