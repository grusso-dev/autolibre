const db = require('../database/models');
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersController = {

    loginGet: function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        } else {
            res.render('login', { error: null });
        }
    },

    login: function (req, res) {
        let { email, contrasenia, rememberMe } = req.body;

        db.User.findOne({
            where: { email: email },
            raw: true
        }).then(function (resultados) {
            if (resultados !== null) {
                let comparacionContra = bcrypt.compareSync(contrasenia, resultados.contrasenia);
                if (comparacionContra) {
                    req.session.user = {
                        id: resultados.id,
                        nombre: resultados.nombre,
                        email: resultados.email
                    };
                    if (rememberMe === 'on') {
                        res.cookie('rememberUser', resultados.id, {
                            maxAge: 1000 * 60 * 15
                        });
                    }
                    res.redirect('/');
                } else {
                    res.redirect('/users/register');
                }
            } else {
                res.redirect('/users/register');
            }
        }).catch(function (err) {
            console.log(err);
            res.redirect('/users/register');
        });
    },

    register: function (req, res, next) {
        if (req.session.user) {
            return res.redirect('/');
        } else {
            return res.render("register", {
                old: {},
                errors: {}
            });
        }
    },


    store: (req, res) => {
        let errors = validationResult(req);
        let form = req.body;
        if (errors.isEmpty()) {
            let userPrueba = {
                nombre: form.nombre,
                email: form.email,
                contrasenia: bcrypt.hashSync(form.contrasenia, 10),
                fechaNacimiento: form.fechaNacimiento,
                numeroDocumento: form.numeroDocumento,
                foto: form.foto,
            };
            db.User.create(userPrueba)
                .then((result) => {
                    req.session.user = result;
                    return res.redirect("/")
                }).catch((err) => {
                    return console.log(err);
                });
        } else {
            return res.render("register", { errors: errors.mapped, old: req.body });
        }
    },
    
    profileEdit: function (req, res, next) {
        if (req.session.user) {
            let id = req.session.user.id;
    
            db.User.findByPk(id)
                .then(function (user) {
                    if (user) {
                        res.render('profile-edit', { user: user });
                    } else {
                        res.status(404).send('Usuario no encontrado');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(500).send('Error en el servidor');
                });
        } else {
            res.redirect("/users/login");
        }
    },
    
    
    
    update: function (req, res) {
        let form = req.body;
        let errors = validationResult(req);
    
        if (errors.isEmpty()) {
            let hashedPassword = bcrypt.hashSync(form.contrasena, 10);
    
            db.User.update({
                email: form.email,
                usuario: form.nombre,
                contrasenia: hashedPassword,
                fecha_nacimiento: form.fechaNacimiento,
                nro_documento: form.numeroDocumento,
                foto_perfil: form.foto
            }, {
                where: { id: req.session.user.id }
            }).then(() => {
                res.redirect("/users/profile/"+ user.id);
            }).catch((err) => {
                console.log(err);
                res.status(500).send('Error en el servidor');
            });
        } else {
            db.User.findByPk(req.session.user.id)
                .then(function (user) {
                    if (user) {
                        res.render('profile-edit', { user: user, errors: errors.mapped(), old: req.body });
                    } else {
                        res.status(404).send('Usuario no encontrado');
                    }
                }).catch(function (error) {
                    console.log(error);
                    res.status(500).send('Error en el servidor');
                });
        }
    },
    

    profile: function (req, res) {
        let idUsuario = req.params.id;
        let relaciones = { include: [{ association: 'productos' }, { association: 'comentarios' }], 
        order: [[{model: db.Producto, as: 'productos'}, 'createdAt', 'DESC']] };
        
    
        db.User.findByPk(idUsuario, relaciones)
            .then(function (result) {
                let condition = false;
    
                if (req.session.user != undefined && req.session.user.id == result.idUsuario) {
                    condition = true;
                    console.log("hola")
                }
    
               return res.render('profile', { user: result, condition: condition });
            })
            .catch(function (err) {
                console.error('Error al buscar usuario:', err);
                res.status(500).send('Error en el servidor');
            });
    },
    
    
    

    logout: function (req, res) {
        req.session.destroy();
        res.clearCookie("rememberUser");
        res.redirect("/");
    }
};

module.exports = usersController;
