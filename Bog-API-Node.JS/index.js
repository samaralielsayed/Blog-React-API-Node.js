//express methods
const express = require("express");
const exp = express();
const cors = require('cors');
const ImageKit = require("imagekit");

//env
require("dotenv").config();



//Converting from json to Object
exp.use(express.json());

exp.use(cors());
//Database

require("./db/dbConnection");


//routes all methods from routing file
const userRouter=require('./routes/users.route');
const postRouter=require('./routes/posts.route');
// const { imageKit } = require("./utils/imagekit");




// Middleware for CORS and JSON parsing
exp.use(cors());
exp.use(express.json());

// Route to authenticate with ImageKit
// ImageKit authentication rendering
// exp.get('/auth', function (req, res) {
//   try {
//       const result = imageKit.getAuthenticationParameters();
//       res.json(result);
//   } catch (error) {
//       console.error("Error generating authentication parameters:", error.message);
//       res.status(500).json({
//           status: "failed",
//           message: "Authentication failed. Please check your ImageKit configuration."
//       });
//   }
// });

exp.use("/api/users",userRouter);
exp.use("/api/posts",postRouter);

exp.use(Error);
var  PORT = process.env.PORT || 8000;
//Server port connection

exp.listen(PORT, () => {
    console.log(`server connection with port number: ${PORT}`);
  });