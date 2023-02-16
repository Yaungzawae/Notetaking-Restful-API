const router = require('express').Router();
const {register , login} = require('../controller/auth.js')

router.route('/register')
    .post((req,res)=>{register(req,res)});

router.route('/login')
    .post((req,res)=>{login(req,res)})

module.exports = router;