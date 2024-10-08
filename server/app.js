const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors  = require("cors")



const error = require('./middleware/error')
// routers
const productsRouter  = require("./router/transactionRouter")
const connectTODatabase = require('./config/dataBase')



const app = express()



if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "config/config.env" });
  }
 
app.use(cors({
  credentials: true,
  origin:[process.env.ORIGIN_1,process.env.ORIGIN_2,process.env.ORIGIN_3]
  
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

 

//connection to the database 
connectTODatabase()




app.get("/",(req,res)=>{
    res.send("🐲🐲 Working fine 🐲🐲")
    console.log("🐲🐲 Working fine 🐲🐲")
})
 


  
app.use("/api/v1", productsRouter)
 
 

 
 
 
 app.use(error)
module.exports = app
