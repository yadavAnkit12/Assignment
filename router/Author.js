const express=require("express")
const router=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const Author = require("../model/Author")
const BookDetails=require("../model/BookDetails")

//signup
router.post("/authorregister",(req,res)=>{
    const {FirstName,LastName,Email,Password}=req.body
    if(!FirstName || !LastName  || !Email|| !Password) {
        res.status(422).json({err:"All fields must be Filled..."})
    }
    else{
        
        Author.findOne({Email:Email})
            .then((savedUser)=>{
                if(savedUser){
                    res.status(422).json({err:"User Already Exists"})
                }
                else{
                
                    bcrypt.hash(Password,12)
                           .then(hashedPassword=>{
                            const author=new Author({
                                FirstName,
                                LastName,
                                Email,
                                Password:hashedPassword,
                                
                            })
                            author.save()
                                .then(author=>{
                                    res.status(200).json({msg:"Added Successfully"})
                                })
                           })
                }
            })
    }
})


//login
router.post("/login",(req,res)=>{
    const {Email,Password}=req.body
    if(!Email || !Password){
        return res.status(422).json({err:"All field must be required..."})
    }
    else{
        Author.findOne({Email:Email})
            .then(dbsuer=>{
                if(!dbsuer){
                    return res.status(422).json({err:"Invalid email ID"})

                }
                else{
                    bcrypt.compare(Password,dbsuer.Password)
                          .then(domatch=>{
                            if(domatch){
                                // const token=jwt.sign({id:dbsuer._id},"backend")
                                // return res.json({token,Type})
                            }
                            else{
                                return res.status(422).json({err:"wrong password"})
                            }
                          })
                }
            })
    }
})


//adding book details 
router.post("/addBook",(req,res)=>{
    const {Title,Content,Summary,NumberOfAuthor,Remark}=req.body
    if(!Title || !Content || !Summary || !NumberOfAuthor || !Remark) {
        res.status(422).json({err:"All fields must be Filled..."})
    }
    else{
        
        BookDetails.findOne({Title:Title})
            .then((savedBook)=>{
                if(savedBook){
                    res.status(422).json({err:"Book  already Exists"})
                }
                else{
                            const Books=new BookDetails({
                               Title,
                               Content,
                               Summary,
                               NumberOfAuthor,
                               Remark
                                
                            })
                            Books.save()
                                .then(BookDetails=>{
                                    res.status(200).json({msg:"Added Successfully"})
                                })
                           
                }
            })
    }
})



module.exports=router