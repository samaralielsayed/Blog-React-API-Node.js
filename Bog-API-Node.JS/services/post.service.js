const Post = require("../models/post.model");

const getAllPostsServise = async () => {
    return await Post.find();
}
const getPostByIdServise=async(id)=>{
    return await Post.findOne(id).populate('user')
}


const AaddPostServise=async(post)=>{
    return  await Post.create(post);
}
const updatPostServise=async(id,req)=>{

    return  await Post.updateOne( id , req);
}

const deletePostServise=async(id)=>{
    return  await Post.findByIdAndDelete(id)
}


module.exports={
    getAllPostsServise,
    getPostByIdServise,
    AaddPostServise,
    deletePostServise,updatPostServise
}