const bodyParser = require('body-parser');
const express = require('express');
const bookRoute = require(__dirname + '/src/routes/book');
const booksRoute = require(__dirname + '/src/routes/books');
const authRoute = require(__dirname + '/src/routes/auth.js')
const db = require(__dirname + '/src/config/db.config.js')
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({extended:true}));

const passport = require(__dirname + '/src/auth/auth.config.js');
const session = require('express-session');


app.use(session({
    secret: 'Thisisasecret',
    saveUninitialized: false,
    resave:false
}))

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req,res)=>{
    res.send('Hello');
})

app.use('/auth', authRoute);
app.use('/book', bookRoute);
app.use('/books', booksRoute);

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
})