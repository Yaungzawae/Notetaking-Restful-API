const passport = require('../auth/auth.config');
const User = require('../model/userModel.js')

async function register(req,res){
    const user = await User.exists({email:req.body.email})
    if(!user){
        await User.register({email:req.body.email}, req.body.password, (err,user)=>{
            if(!err){
                passport.authenticate('local')(req,res,()=>{
                    res.sendStatus(201);
                })
            } else {
                console.log(err);
                res.sendStatus(500);
            }
        })
    } else {
        res.sendStatus(409);
    }
}

async function login(req,res){
    const user = new User({
        email : req.body.email,
        password : req.body.password
    });
    await req.login(user, (err)=>{
        if(!err){
            passport.authenticate('local')(req,res,()=>{
                res.sendStatus(200)
            })
        } 
        else {
            console.log(err);
            res.sendStatus(500)
        }
    })
}

module.exports = {
    register,
    login
}