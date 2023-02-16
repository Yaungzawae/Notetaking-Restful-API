const {Book} = require('../model/noteModels');
const User = require('../model/userModel');
const { loginRequired, handleServerError, sendJSON, emptyString } = require('./helper');


// create A book
async function createBook(req,res){
        const book = new Book({
            bookName: req.body.bookName,
        })
        User.findByIdAndUpdate(req.user.id ,{$push : {books : book}}, (err) =>{handleServerError(res,err,200)})
}

// update(patch) A book
async function updateBookName(req,res){
    emptyString(res, req.body.bookUpdateName,()=>{
        User.findOneAndUpdate({user_id : req.user.id, 'books.bookName' : req.body.bookName}, 
            {$set : {'books.$.bookName' : req.body.bookUpdateName}},(err)=>{
                handleServerError(res,err,200)
            }
        ) 
    })
}

// read A book
async function getBook(req,res){
    User.findOne({user_id : req.user.id, 'books.bookName' : req.body.bookName},'books.$',(err,foundBook)=>{
        handleServerError(res,err,200,()=>{
                sendJSON(res,foundBook['books'], 0);
        })
    })
}

// delete A book
async function deleteBook(req,res){
        User.findByIdAndUpdate(req.user.id,{$pull: {books: {bookName : req.body.bookName}}},(err)=>
        {handleServerError(res,err,200)})
}


// read All boook
async function getAllBooks(req,res){
    User.findById(req.user.id,{'email':0, '_id':0, 'books.chapters' : 0},(err,foundUser)=>{
        handleServerError(res,err,200,()=>{
            sendJSON(res,foundUser['books'])
        })
    })
}

//delete AllBook
async function deleteAllBook(req,res){
        User.findByIdAndUpdate(req.user.id, { $set : {books : []}}, (err)=>{
        handleServerError(res,err,200);
    })
}


module.exports = {
    createBook,
    getBook,
    updateBookName,
    deleteBook,
    getAllBooks,
    deleteAllBook,
}
