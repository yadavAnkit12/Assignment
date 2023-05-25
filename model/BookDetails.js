const mongoose=require("mongoose")

const BookDetails=new mongoose.Schema({
  Title:{
        type:String,
        required:true
    },
    Content:{
    type:String,
    required:true
    },
    Summary:{
        type:String,
        required:true
    },
    NumberOfAuthor:{
        type:Number,
        required:true
    },
    Remark:{
        type:Number,
        required:true
    },
    Status:{
        type:String
    }
})

module.exports=mongoose.model("Books",BookDetails)