const mongoose=require("mongoose")

const publisher=new mongoose.Schema({
  FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    OrganizationName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Publisher",publisher)