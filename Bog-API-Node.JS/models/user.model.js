const { string } = require("joi");
const {mongoose} = require("mongoose");
const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please Enter Your Name'],
        minLength: 3,
        maxLength: 50,
    },
    email:{
        type:String,
        required:[true, 'Please Enter Your Email'],
        unique:true,
        minLength: 3,
        maxLength: 255,
    },
    image:{
        type:String,
        required: [true, 'Please Upload Image'],
        minLength: 5,
        default:"default.jpg",
        maxLength: 1024,
    },
    passwordHash:{
        type:String,
        required:[true, 'Please Enter Your Password'],
        minLength: 3,
        maxLength: 1024,
    },
    fileId:{
        type:String,
        default:""

    },
    createdOn:{
        type: Date,
        default: Date.now
    },
   
    
});
const User=mongoose.model('User',userSchema);
module.exports=User;