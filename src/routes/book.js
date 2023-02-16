const { createBook, deleteBook, updateBookName, getBook } = require('../controller/books');
const { createChapter, getChapter, updateChapter, deleteChapter } = require('../controller/chapters');
const { loginRequired, checkBookExists } = require('../controller/helper');
const { Chapter } = require('../model/noteModels');

const router = require('express').Router();
router.use(loginRequired)
router.use('/chapter', checkBookExists)
router.route('/')
    .get((req,res)=>{getBook(req,res)})
    .post((req,res)=>{createBook(req,res)})
    .delete((req,res)=>{deleteBook(req,res)})
    .patch((req,res)=>{updateBookName(req,res)})

router.route('/chapter')
    .get(getChapter)
    .post(createChapter)
    .patch(updateChapter)
    .delete(deleteChapter)

module.exports = router;