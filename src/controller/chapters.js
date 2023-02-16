const {Chapter, Book} = require('../model/noteModels');
const User = require('../model/userModel');
const { handleServerError, sendJSON, emptyString } = require('./helper');

async function createChapter(req,res){
    const chapter = new Chapter({
        chapterName: req.body.chapterName,
        text: req.body.text
    });
    User.findOneAndUpdate({_id:req.user.id, "books.bookName":req.body.bookName} ,{$push : {"books.$.chapters" : chapter}} , (err)=>{
        handleServerError(res,err,201)
    });
}

async function getChapter(req,res){
    User.findOne({_id: req.user.id,"books.bookName":req.body.bookName,"books.chapters.chapterName":req.body.chapterName} , 'books.chapters.$' , (err,foundChapter)=>{
        handleServerError(res,err,200,()=>{
            try{
                sendJSON(res,foundChapter["books"][0]["chapters"], 0)
            } catch (e){
                res.send("Wrong Chapter Name")
            }
        })
    })
}

async function updateChapter(req,res){
    emptyString(res,req.body.chapterUpdateName,()=>{
        const chapter = new Chapter({
            chapterName : req.body.chapterUpdateName,
            text : req.body.updateText || ""
        })
            User.findOneAndUpdate({_id: req.user.id, "books.chapters.chapterName":req.body.chapterName}, {"books.$.chapters" : chapter},(err)=>{
                handleServerError(res,err,200);
            })
        })
}

async function deleteChapter(req,res){
    User.findOneAndUpdate({_id: req.user.id, "books.chapters.chapterName":req.body.chapterName}, {$pull : { "books.$.chapters" : {'chapterName' : req.body.chapterName}}}, (err,data)=>{
        console.log(JSON.stringify(data))
        handleServerError(res,err,200)
    })
}



module.exports = {
    createChapter,
    getChapter,
    updateChapter,
    deleteChapter
}