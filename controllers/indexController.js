const db = require('../database/models');

// explicación en clase para buscar los titulos
const op = db.Sequelize.Op;

const indexController = {
  index: function (req, res, next) {

    let filtro = {
      order: [['createdAt', 'DESC']],
      include: [
          { association: "comentarios" },
          { association: "usuario" }
        ]
      }
    db.Producto.findAll(filtro)
      .then(function (resultados) {
        return res.render("index", { productos: resultados });
      })
      .catch(function (error) {
        console.log(error);
      });
  },


  search: function (req, res) {
    let search = req.query.search;

    let filtrado = {
      where: {
        [op.or]: [
          { nombreProduct: { [op.like]: "%" + search + "%" } },
          { descripcionProduct: { [op.like]: "%" + search + "%" } }
        ]
      },
      order: [["createdAt", "DESC"]],
            include: [
                { association: "comentarios" },
                { association: "usuario"}
            ]
    }


    db.Producto.findAll(filtrado)
    .then((result) => {
      if (result.length === 0 || !search) {
        return res.render('search-results', { productos: [], error: "No hay resultados para su criterio de búsqueda", search: search });
      } else { 
        return res.render('search-results', { productos: result, error: null, search: search });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.send("Error al buscar productos");
    });
}}

module.exports = indexController;
