const express=require("express")
const router=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const publisher = require("../model/publisher")
const BookDetails=require('../model/BookDetails')

router.post("/register",(req,res)=>{
    const {FirstName,LastName,OrganizationName,Email,Password}=req.body
    if(!FirstName || !LastName || !OrganizationName || !Email|| !Password) {
        res.status(422).json({err:"All fields must be Filled..."})
    }
    else{
        
        publisher.findOne({Email:Email})
            .then((savedUser)=>{
                if(savedUser){
                    res.status(422).json({err:"User Already Exists"})
                }
                else{
                
                    bcrypt.hash(Password,12)
                           .then(hashedPassword=>{
                            const publishe=new publisher({
                                FirstName,
                                LastName,
                                OrganizationName,
                                Email,
                                Password:hashedPassword,
                                
                            })
                            publishe.save()
                                .then(publishe=>{
                                    res.status(200).json({msg:"Added Successfully"})
                                })
                           })
                }
            })
    }
})


//retreving all books
router.get("/allBook",(req,res)=>{
    BookDetails.find()
        .then(Book=>res.json(Book))
  })


  // preview book
  router.get("/Preview/:Title",(req,res)=>{
    const Title=req.params.Title
   addProduct.find({Title:Title})
       .then(Book=>{
           res.json(Book)
       })
 })
//Status change to Publish
 router.post("/Publish/:id",(req,res)=>{
    const id=req.params.id
    const Publish='Published'
    findBook(id)
     function findBook(id){
      BookDetails.findByIdAndUpdate(id,{Status:Publish})
      .then(result=>{
       if(result){
         res.json("Published")
         
       }
       else res.json("error")
      })
    }
  
  })

 //deleting book means not publish
router.post('/notPublish',(req,res)=>{

    RemoveBook(req.body.Bid)
    async  function RemoveBook(Bid){
    
       const data=  await BookDetails.findByIdAndDelete(Bid)
       
      //console.log(data)
       if(data){
        res.json('ok')
       }
    
       else{
        res.json("error")
       }
    
      }
    })

module.exports=router