const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.Auth= (req, res, next) =>{
    try {
        // extract token
        const token = req.body.token;
        if (!token){
            return res.status(401).json({
                success: false,
                message:'token missing'
            })
        }
        try {
            // verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode)

            req.user = decode

        } catch (error) {
            return res.status(401).json({
                success: false,
                message:'token is invalid'
            })
            
        }
        next();
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message:'something went wrong while verifing the token'
        })
    }
}


exports.isStudent = (req, res, next ) => {
    try {


        if(req.user.role !== "Student"){
            return res.status(401).json({
                success: false,
                message: 'this is a protected rout for students'
            })
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'user role is not matching for student'
        })
    }
    
}


exports.isAdmin = (req, res, next ) => {
    try {


        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success: false,
                message: 'this is a protected rout for Admin'
            })
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'user role is not matching for Admin'
        })
    }
   
}