require('dotenv').config()
const mongoose = require ('mongoose')

exports.conn = async () => {
    try{
        await mongoose.connect(process.env.LOCAL_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected to DB")      
    }catch(err){
        console.log(err.message)
    }
}
