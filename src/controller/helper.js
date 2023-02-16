const User = require("../model/userModel");

function exists(parameter){
    if(parameter!== undefined){
        return true;
    } else {
        return false;
    }
}

function emptyString(res, str, query){
    if( str === null || str.match(/^ *$/) !== null){
        res.send("empty string")
    } else {
        query();
    }
}

function loginRequired(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.send('Please create an account first.')
    }
};

function handleServerError(res,err,httpCode, query){
    if(!err){
        console.log(query);
        console.log(exists(query))
        if(exists(query)){
            query()
        } else {
        res.sendStatus(httpCode)
        }
    } else {
        console.log(err);
        res.sendStatus(500);
    }
}

function sendJSON(res, foundData, returnJson){
    if(foundData || foundData==null){
        if(exists(foundData[returnJson])){
            foundData = foundData[returnJson];
        }
        console.log(foundData)
        res.json(foundData)
    } else {
        res.sendStatus(409)
    }
}

async function checkBookExists(req,res,next){
    const exists =await User.exists({_id:req.user.id, "books.bookName":req.body.bookName});
    if(exists){
        next();
    } else {
        res.send('No existing book. Please create one first.')
    }
}

module.exports = {
    loginRequired,
    handleServerError,
    sendJSON,
    emptyString,
    checkBookExists
}