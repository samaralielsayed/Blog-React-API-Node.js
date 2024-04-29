const express = require('express');
const app = express();
const {
    auth
} = require("../middleware/auth");
const {
    createUser,
    updateCurrentUserProfile,
    login,
    getAllUsers,
    getCurrentUserProfile,
    logoutUser
} = require('../controllers/user.controller');
const {
    getposts
} = require('../controllers/post.controller');
const {
    uploadUserImage,
    resizeUserImage
} = require('../utils/multer');
const {
    imagekitUploadSingleImageUser
} = require('../utils/imagekit');

const router = express.Router();
router.use("/:userId/posts", getposts);
router.post("/register", createUser);
router.get("/", getAllUsers);
router.post('/login', login)
// router.post('/logout', logoutUser)
router.get(
    "/Profile",
    auth,
    getCurrentUserProfile
  );
router.patch("/update", auth, uploadUserImage, resizeUserImage, imagekitUploadSingleImageUser, updateCurrentUserProfile);
module.exports = router;