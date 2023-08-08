const express = require('express');

const router = express.Router();

const {login ,signup} =require('../controllers/auth');
const {Auth ,isStudent, isAdmin} =require('../middlewares/Auth');


router.post('/signup',signup);
router.post('/login',login);


router.get('/test', Auth, (req, res)=>{
    res.json({
        success:true,
        message:'welcome to protected route for TEST'
    })
})

// protected route

router.get('/student', Auth, isStudent, (req, res)=>{
    res.json({
        success:true,
        message:'welcome to protected route for student'
    })
})


router.get('/admin', Auth, isAdmin, (req, res)=>{
    res.json({
        success:true,
        message:'welcome to protected route for Admin'
    })
})

module.exports =router;