 const mongoose =require('mongoose');

 require('dotenv').config();

 exports.dbconnection = ()=>{
    mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser:true,
        useunifiedTopology:true
    })
    .then(()=>{console.log('Db connected succesfully')})
    .catch((err)=>{
        console.log('error in db connection');
        console.error(err)
    })
 }