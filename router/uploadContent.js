const express=require("express")
const router=express.Router()
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: "dvekx7cxc",
    api_key: "858569431758214",
    api_secret: "e_I9hDuV5NsjvrdwmEZE5PQVlKM"
  });

  


router.post("/getUrl/:path",(req,res)=>{
    // Upload function
const uploadFileToCloudinary = async (file) => {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      console.log('File uploaded successfully!');
      console.log('Public URL:', result.secure_url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  // Usage example
  const fileToUpload = {
    path: req.params.path 
  };
  
  uploadFileToCloudinary(fileToUpload);
})
