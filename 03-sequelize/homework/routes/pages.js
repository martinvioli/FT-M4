const router = require("express").Router();
const { Page, User } = require("../models");

// SEQUELIZE SE MANEJA CON PROMESAS, POR LO QUE USO ASYNC O USO PROMESAS ANIDADAS.
router.post("/", async function (req, res) {
  // Modificar para que cuando se clickee el botón de "SUBMIT" se cree un nuevo post
  // tomando los datos desde el form y agregándolo a la base de datos
  // (Debe incluir también la categoría a la/s cual/es pertenece)
  // Tu código acá:

  var { authorEmail, authorName, title, content, categories } = req.body;

  if (authorEmail && authorName && title && content && categories) {
    // Verifico que se hayan completado todos los campos
    var [user, create] = await User.findOrCreate({
      // Me lo traigo en array porque se usaria USER en caso de que exista el usuario, y CREATE en caso de que no. Esto lo hace automatico sequelize. Con eso verifico si existe el usuario o si hay que crearlo, ya que TODO POST necesita un usuario.
      where: { name: authorName, email: authorEmail },
    });
    var page = await Page.create({
      // Creo el registrode la pagina
      title,
      content,
    });

    await user.addPage(page); // Agrego la pagina en referencia al usuario. Estaria usando la tabla intermedia.
    await page.addCategories(categories); // Agrego las categorias a la pagina y viceversa.

    res.status(302).redirect(page.route); // Redirecciono al route (que estableci en todas las instancias de page)
  } else {
    // En caso de que falten campos por completar y se envie igualmente
    return res.render("error", {
      message: "Faltan introducir campos y/u categorias",
    });
  }
});

router.get("/add", function (req, res) {
  res.render("addpage");
});

router.get("/:urlTitle", function (req, res) {
  // Modificar para que cuando se seleccione un "Page" en particular se muestren
  // los datos asociados al mismo
  // Tu código acá:
  Page.findOne({ where: { urlTitle: req.params.urlTitle } }).then((page) => {
    res.render("page", { page });
  });
});

module.exports = router;
