const express = require('express');
const app = express();
const {
    auth
} = require("../middleware/auth");
const {
    getposts,
    addPost,
    editPost,
    deletePost,
    getPostById
} = require('../controllers/post.controller');
const {
    resizePostImage,
    uploadPostImage
} = require('../utils/multer');
const { imagekitUploadSingleImagePost, deleteImage } = require('../utils/imagekit');


const router = express.Router();

router.get("/", getposts);
router.get("/:id",auth, getPostById);
router.post('/', auth,  uploadPostImage, resizePostImage,imagekitUploadSingleImagePost,addPost)
router.patch("/:id", auth, uploadPostImage,resizePostImage,imagekitUploadSingleImagePost,editPost);
router.delete("/:id", auth, deletePost);
module.exports = router;