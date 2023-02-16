const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    chapterName: String,
    text: String
})

const Chapter = mongoose.model('chapter', chapterSchema);

const bookSchema = new mongoose.Schema({
    bookName: String,
    chapters: [{ type : chapterSchema, ref : Chapter}]
})

const Book = mongoose.model("book", bookSchema);

module.exports = {
    Chapter,
    Book
}