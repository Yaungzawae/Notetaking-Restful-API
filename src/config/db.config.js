const mongoose = require('mongoose')
mongoose.set('strictQuery' , 'false');

const db = mongoose.connect('mongodb://127.0.0.1:27017/takeNotes', err=>{
    if(err){
        console.log(err)
    }
})

module.exports = db;

