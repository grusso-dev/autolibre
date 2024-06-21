//productos y -add

var express = require('express');
var router = express.Router();
const productController = require("../controllers/productController");

const {body} = require("express-validator");
const validationsEditAdd = [
    body('nombreProduct')
        .notEmpty().withMessage('Este campo es obligatorio.'),
    body('descripcionProduct')
        .notEmpty().withMessage('Este campo es obligatorio.'),
    body('imagenProduct')
        .notEmpty().withMessage('Este campo es obligatorio.').bail()
        .isURL().withMessage('El campo Imagen debe ser una URL válida.')  
]

// agregamos el id para buscar por prod. 
router.get("/add", productController.productAdd);
router.get("/:id", productController.index);
router.get("/edit/:id", productController.editProd);
router.get('/view/:id', productController.detalle); 
router.get('/destroy', productController.destroy);

router.post("/")
router.post('/add', productController.store)
router.post('/edit/:id', validationsEditAdd, productController.editProdForm);
router.post('/destroy', productController.destroy);

module.exports = router;
