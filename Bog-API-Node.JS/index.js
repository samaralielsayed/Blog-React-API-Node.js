//express methods
const express = require("express");
const exp = express();
const cors = require('cors');

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
exp.use("/api/users",userRouter);
exp.use("/api/posts",postRouter);


exp.use(Error);
var  PORT = process.env.PORT || 8000;
//Server port connection
exp.listen(PORT, () => {
    console.log(`server connection with port number: ${PORT}`);
  });