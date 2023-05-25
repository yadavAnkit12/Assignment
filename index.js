const express=require('express')
const app=express()
const cors=require("cors")
const mongoose=require("mongoose")
app.use(cors())
app.use(express.json())


//connecting to mongoDB
var mongoURI = 'mongodb+srv://ay1222926:12345@cluster0.tnt93fc.mongodb.net/'
const connectToMongo =  () => {
     mongoose.connect(mongoURI)
     .then( ()=>
        console.log("mongoDB connected Successful")
    )
}

connectToMongo()
app.use(require("./router/savingPublisher"))
app.use(require("./router/Author"))



//creating server
app.listen(4000,()=>console.log("sever is running"))