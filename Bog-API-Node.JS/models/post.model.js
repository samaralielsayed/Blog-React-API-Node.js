const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    title: {
        type: String,
        maxLength: 255,
        default: ""
    },
    description: {
        type: String,
        minLength: 3,
        maxLength: 1024,
        required: [true, 'post must have description']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String,
        required: [true, 'Please Upload Image'],
        minLength:3 ,
        default: "default.jpg",
        maxLength: 1024,
    },
    fileId: {
        type: String,
        default: ""

    },
    createdOn: {
        type: Date,
        default: Date.now
    },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;