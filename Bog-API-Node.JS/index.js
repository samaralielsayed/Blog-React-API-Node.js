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
//Server port connection
exp.listen(process.env.Port, () => {
    console.log(`server connection with port number: ${process.env.Port}`);
  });