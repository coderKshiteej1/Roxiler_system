const mongoose = require("mongoose")


const connectTODatabase = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log(`Connected to Database`);
        return true; 
    } catch (err) {
        console.log(`db error ${err}`);
        return false;
    }
} 

module.exports = connectTODatabase
