var { Sequelize, DataTypes } = require("sequelize");
const S = Sequelize;
var db = new Sequelize("postgres://postgres:postgre@localhost:5432/henryblog", {
  logging: false,
});

const Page = db.define("page", {
  // Tu código acá:
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urlTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: DataTypes.ENUM("open", "closed"),
  route: {
    type: DataTypes.VIRTUAL, //un tipo de dato generado virtual y dinamicamente. No se guarda en la tabla aunque aqui si se nombre.
    get() {
      //getter. Simplemente es una funcion que si luego invoco page.route() me retorna lo que haya ingresado.
      return `/pages/${this.urlTitle}`;
    },
    set(value) {
      //el Set evita que (al ser un datatype virtual) se le intente asignar manualmente un valor.
      throw new Error("No intentes setear la route!");
    },
  },
});

// .addHook() method
Page.addHook("beforeValidate", (page, options) => {
  //Este metodo lo tengo que usar porque la tabla la cree con  funcion. Con class se pued eusar un metodo mas rapido.
  //El beforeValidate hace que antes de cargar el registro en la tabla, haga algo.
  page.urlTitle =
    page.title && page.title.replace(/\s+/g, "_").replace(/\W/g, "");
});

const User = db.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Debe ser un email valido",
      },
    },
  },
});

const Category = db.define("category", {
  // Tu código acá:
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: DataTypes.TEXT,
});

// Vincular User con Page
// Tu código acá:
User.hasMany(Page);
Page.belongsTo(User, { as: "author" });

//Vincular Page con Category
Page.belongsToMany(Category, { through: "category_page" });
Category.belongsToMany(Page, { through: "category_page" });

module.exports = {
  User,
  Page,
  Category,
  db,
};
