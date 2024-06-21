const express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const {body} = require("express-validator")


const validationsRegister = [
    body('email').isEmail().withMessage('Debes ingresar un correo electrónico válido.').bail()
    .notEmpty().withMessage('Debes compeltar este campo con tu email'),

    body('nombre').notEmpty().withMessage('El nombre de usuario es obligatorio.'),
    body('contrasenia').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres.')
];

const validationsLogin = [
    body("email")
    .notEmpty().withMessage("Debes completar este campo con tu email").bail()
    .isEmail().withMessage("verifica que este email sea valido").bail()
   ,
   body("contrasenia")
    .notEmpty().withMessage("Completa este campo con tu contraseña")
    .isLength({min:4}).withMessage("Ingresar un minimo de 4 caracteres"),   
]

const validationsEdit = [
        body('email')
        .notEmpty().withMessage('El campo email es obligatorio.').bail()
        .isEmail().withMessage('Debe ser un email valido').bail(),
       
        body('nombre')
        .notEmpty().withMessage('Por favor, introduzca un nombre de usuario'),
        
        body('contrasenia')
        .notEmpty().withMessage('El campo Contraseña es obligatorio.').bail()
        .isLength({ min: 4 }).withMessage('La contraseña debe tener más de 4 caracteres')
    ]

router.get("/register", usersController.register);
router.post("/register",validationsRegister, usersController.store);
router.get("/login", usersController.loginGet); //login
router.post("/login",validationsLogin, usersController.login); //checkuser
router.post("/logout", usersController.logout);

router.get("/profile/:id", usersController.profile)

router.get('/edit/:id', usersController.profileEdit);
router.post('/edit/:id', usersController.update);
  

module.exports = router;

