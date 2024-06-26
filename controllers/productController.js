const { Association } = require('sequelize');
const db = require('../database/models');
const { validationResult } = require('express-validator');

const productController = {
  index: function (req, res, next) {
    console.log('GET:INDEX');
    // console.log(req.session.user.id)
    const id = req.params.id;
    let criterio = {
      include: [
        { association: "usuario" },
        {
          association: "comentarios",
          include: [{ association: 'usuario' }]
        }
      ],
      order: [[{ model: db.Comentario, as: 'comentarios' }, 'createdAt', 'DESC']]
    }

    let propietario = false
    let logueado=false
    db.Producto.findByPk(id, criterio)
      .then(function (results) {
        if (!results) {
          return res.status(404).send('Producto no encontrado en index');
        }
        // console.log(results.usuario.id)
        if (req.session.user != undefined && req.session.user.id == results.usuario.id) {
          propietario = true;
        }
        if(req.session.user != undefined){
          logueado=true
        }
        console.log(propietario);
        res.render('product', {
          producto: results,
          comentarios: results.comentarios || [],
          propietario: propietario,
          logueado:logueado,
          user: results.clienteId//req.session.user
        });
      })
      .catch(function (error) {
        console.log(error);
        return res.status(500).send('Error en el servidor en index');
      });
  },

  editProd: function (req, res) {
    let id = req.params.id;
    let filtro = {
      include: [
        { association: "usuario" }
      ]
    };
    db.Producto.findByPk(id, filtro)
    .then(function (result) {
      if (!result) {
        return res.status(404).send('Productooo no encontrado en editProd');
      }
      return res.render("product-edit", { producto: result });
    }).catch(function (err) {
      console.log(err);
      return res.status(500).send('Error en el servidor en editProd');
    });
  },

  editProdForm: function (req, res) {
    console.log('POST: editProdForm');
    let form = req.body;

    let filtroSession = {
      where: { id: req.params.id }
    };
    productupdate={
      nombreProduct:form.nombreProduct,
      imagenProduct:form.imagenProduct,
      descripcionProduct:form.descripcionProduct,
      clienteId:req.session.user.id
    }
    db.Producto.update(productupdate, filtroSession)
    .then(() => {
      return res.redirect("/product/" + req.params.id);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send('Error en el servidor en editProdForm');
    });
    
    // let errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   let filtradoEdit = {
    //     include: [
    //       { association: "usuario" }
    //     ]
    //   };

    //   db.Producto.findByPk(req.params.id, filtradoEdit)
    //   .then((resultados) => {
    //     if (!resultados) {
    //       return res.status(404).send('Productooo no encontrado en editProdForm');
    //     }
    //     return res.render('product-edit', {
    //       errors: errors.array(),
    //       old: req.body,
    //       productFind: resultados
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return res.status(500).send('Error en el servidor en editProdForm');
    //   });
    // } else {
    //   let filtroSession = {
    //     where: { id: req.params.id }
    //   };
    //   productupdate={
    //     nombreProduct:form.nombreProduct,
    //     imagenProduct:form.imagenProduct,
    //     descripcionProduct:form.descripcionProduct,
    //     clienteId:req.session.user.id
    //   }
    //   if (req.session.user) {
    //     db.Producto.update(productupdate, filtroSession)
    //       .then(() => {
    //         return res.redirect("/product/" + req.params.id);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         return res.status(500).send('Error en el servidor en editProdForm');
    //       });
    //   } else {
    //     return res.redirect("/users/profile/" + req.params.id);
    //   }
    // }
  },

  detalle: function (req, res) {
    const id = req.params.id;
    let criterio = {
      include: [
        { association: "usuario" },
        {
          association: "comentarios",
          include: [{ association: 'usuario' }]
        }
      ],
      order: [[{ model: db.Comentario, as: 'comentarios' }, 'createdAt', 'DESC']]
    }
    let condition = false;

    db.Producto.findByPk(id, criterio)
      .then(function (results) {
        if (!results) {
          return res.status(404).send('Producto no encontrado en detalle');
        }

        if (req.session.user != undefined && req.session.user.id == results.usuario.id) {
          condition = true;
        }
        res.render('product', {
          producto: results,
          comentarios: results.comentarios || [],
          condition: condition,
          user: req.session.user
        });
      })
      .catch(function (error) {
        console.log(error);
        return res.status(500).send('Error en el servidor en detalle');
      });
  },
  productAdd: function (req, res) { 
    console.log('GET:productAdd');
    res.render("product-add")
  },// Nuevo metodo
  addComment: function (req, res) { 
    console.log('post:addComment');
    const id = req.params.id;
    let {comentario} = req.body;
    newComment ={
      productId:id,
      clienteId:req.session.user.id,
      comentario:comentario
    }
    // console.log(newComment)
    db.Comentario.create(newComment)
    .then(function (db) {
      res.redirect('/product/' + id );
    })
    .catch(function (er) {
      console.log(er)
    })
   },
  create: function (req, res) {
    let { nombre, descripcion, imagen } = req.body
    if(req.session.user==undefined){
      return res.redirect('/')
    }
    let id = req.session.user.id
    

    db.Producto.create({
      clienteId: id,
      nombreProduct: nombre,
      imagenProduct: imagen,
      descripcionProduct: descripcion,

    })
    .then(function (db) {
      return res.redirect('/product/' + product.id) //revisar
    })
    .catch(function (err) {
      console.log(err)
    })
  },

  store: function (req, res) {
    //console.log('Post:store');
    //console.log(req.session)
    let form = req.body;
    let errors = validationResult(req);
    //si el usuario no está logueado vuelve a la pagina principal
    if (req.session == undefined ||req.session.user == undefined) {
      return res.redirect("/");
    }

    if (errors.isEmpty()) {
      //preparo el nuevo auto
      // lo creo porque antes se hacia el create con la variable form que tenia los imputs del formulario y no venia el usuario
      newCar ={
        nombreProduct:form.nombreProduct,
        imagenProduct:form.imagenProduct,
        descripcionProduct:form.descripcionProduct,
        clienteId:req.session.user.id
      }
      db.Producto.create(newCar)
        .then((results) => {
          return res.redirect("/product/" + results.id);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send('Error en el servidor en store');
        });
    } else {
      return res.render('product-add', { errors: errors.mapped(), old: req.body });
    }
  },

  formUpdate: function (req, res) {
    let form = req.body;
    let criterio = {
      include: [
        { association: "usuario" }
      ]
    };

    db.Producto.findByPk(form.id, criterio)
      .then(function (results) {
        if (!results) {
          return res.status(404).send('Producto no encontrado en formUpdate');
        }
        return res.render('product-edit', { producto: results });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Error en el servidor en formUpdate');
      });

  },

  update: function (req, res) {
    let form = req.body;
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let filtro = {
        where: {
          id: form.id
        }
      };
      if (req.session.user != undefined) {
        let id = req.session.user.id;
        if (form.idUsuario == id) {
          db.Producto.update(form, filtro)
            .then((result) => {
              return res.redirect("/product/id/" + form.id);
            }).catch((err) => {
              console.log(err);
              return res.status(500).send('Error en el servidor en update');
            });
        } else {
          return res.redirect("/users/profile/id/" + id);
        }
      } else {
        return res.redirect("/users/login");
      }
    } else {
      let criterio2 = {
        include: [
          { association: "usuario" }
        ]
      };

      db.Producto.findByPk(form.id, criterio2)
        .then(function (results) {
          if (!results) {
            return res.status(404).send('Producto no encontrado en update');
          }
          return res.render('product-edit', { errors: errors.mapped(), old: req.body, producto: results });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send('Error en el servidor en update 2');
        });
    }
  },

  destroy: function (req, res) {
    // let form = req.body;
    const id = req.params.id;
    let filtrado = {
      where: {
        id: id
      }
    };
    let filtradoComments = {
      where: {
        productId: id
      }
    };
    if (req.session.user != undefined) {
      db.Comentario.destroy(filtradoComments)
      .then((result) => {
        db.Producto.destroy(filtrado)
        .then((result) => {
          return res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send('Error en el servidor en destroy');
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('Error en el servidor en destroy');
      });
      
    } else {
      return res.redirect("/");
    }

    // if (req.session.user != undefined) {
    //   let id = req.session.user.id;
    //   if (form.idUsuario == id) {
    //     db.Producto.destroy(filtrado)
    //       .then((result) => {
    //         return res.redirect("/");
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         return res.status(500).send('Error en el servidor en destroy');
    //       });
    //   } else {
    //     return res.redirect("/users/profile/id/" + id);
    //   }
    // } else {
    //   return res.redirect("/users/login");
    // }
  }
}

module.exports = productController;
