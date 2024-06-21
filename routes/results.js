//search results
var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('search-results');
});

//buscar un producto
router.get("/search"), productController.search

module.exports = router;