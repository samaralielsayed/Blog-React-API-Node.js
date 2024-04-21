const ImageKit = require("imagekit")
const imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  })
  



const imagekitUploadSingleImageUser= async (req, res, next) => {
    try {
        if (!req.file) {
            // return res.status(400).json({
            //     status: "failed",
            //     message: "No file uploaded."
            // });

            return next();
        }

        imageKit.upload({
            file: req.file.buffer, // Use req.file.buffer instead of req.file directly
            fileName: req.body.image,
            folder:'users'
        }, function(err, response) {
            if (err) {
                return res.status(500).json({
                    status: "failed",
                    message: "An error occurred during file upload. Please try again."
                });
            }

            // If upload successful, delete old image (if exists)
            if (req.user.image) {
                // const str = req.user.image
                // const parts = str.split(",")[1].split("=")[1];
                
                // console.log(req.user.fileId ," parts")
                imageKit.deleteFile(req.user.fileId, function(err, result) {
                    if (err) {
                        console.log("Error deleting old image:", err.message);
                    } else {
                        console.log("Old image deleted successfully");
                    }
                });
            }
            // const name=response.name
            // Update user's fileId in the database
           
            req.fileId=response.fileId;
            req.body.image = response.url ;
            console.log(response)
            // Call next middleware function
            next();
        });
    } catch (error) {
        console.log("Error uploading image to imagekit:", error.message);
        res.status(500).json({
            status: "failed",
            message: "An error occurred during file upload. Please try again."
        });
    }
};

const imagekitUploadSingleImagePost= async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }

       await imageKit.upload({
            file: req.file.buffer, // Use req.file.buffer instead of req.file directly
            fileName: req.body.image,
            folder:'posts'
        }, function(err, response) {
            if (err) {
                return res.status(500).json({
                    status: "failed",
                    message: "An error occurred during file upload. Please try again."
                });
            }
            req.fileId=response.fileId;
            req.body.image = response.url ;
            // console.log(response)
            // Call next middleware function
            next();
        });
    } catch (error) {
        console.log("Error uploading image to imagekit:", error.message);
        res.status(500).json({
            status: "failed",
            message: "An error occurred during file upload. Please try again."
        });
    }
};

const deleteImage=  async (image) => {
    console.log("hhh"+image)
  
      imageKit.deleteFile(image, function(err, result) {
            if (err) {
                console.log("Error deleting old image:", err.message);
            } else {
                console.log("Old image deleted successfully");
            }
        });
        
   
}

module.exports ={
    imagekitUploadSingleImageUser,
    imagekitUploadSingleImagePost,
    deleteImage
}