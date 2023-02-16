const { getAllBooks, deleteAllBook } = require('../controller/books');
const { loginRequired } = require('../controller/helper');


const router = require('express').Router();
router.use(loginRequired)
router.route('/')
    .get(getAllBooks)
    .delete(deleteAllBook)

module.exports = router; 