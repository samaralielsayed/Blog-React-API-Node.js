
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
  if (file) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("only images", 400), false);
    }

  }
 
};
const uploaduser = multer({ storage: multerStorage, fileFilter: multerFilter });
const uploadUserImage = uploaduser.single("image");
const resizeUserImage = async (req, res, next) => {
try{
  // console.log("==============================================")
  // console.log("req.file",req.file)

  if (req.file && req.file.fieldname=="image") {
    
    const filename = ` user-${uuidv4()}-${Date.now()}.jpeg`;
  
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      // .toFile(`uploads/users/${filename}`);
  
  
  
     req.body.image = filename;
    //  console.log("req.body.image==============")
    //  console.log(req.body.image)
    }
    next();

}catch(error){
  console.log(error.message)
  res.status(404).json("Invalid request"+ error.message)
        return;
}

};

///////////////////////////////////////////////////////////


const uploadPostImage = uploaduser.single("image");
const resizePostImage = async (req, res, next) => {
try{
  // console.log("==============================================")
  // console.log("req.file",req)

  if (req.file && req.file.fieldname=="image") {
    
    const filename = ` post-${uuidv4()}-${Date.now()}.jpeg`;
  
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      // .toFile(`uploads/posts/${filename}`);
  
  
  
     req.body.image = filename;
    //  console.log("req.body.image==============")
    //  console.log(req.body.image)
    }
    next();

}catch(error){
  console.log(error.message)
  res.status(404).json("Invalid request"+ error.message)
        return;
}

};
module.exports = {  
    uploadUserImage,
    resizeUserImage,
    uploadPostImage,
    resizePostImage
  };