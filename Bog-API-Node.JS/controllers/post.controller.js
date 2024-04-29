const Post = require("../models/post.model");
const {
  AaddPostServise,
  getPostByIdServise,
  deletePostServise,
  updatPostServise
} = require("../services/post.service");
const {
  deleteImage
} = require("../utils/imagekit");


const {
  validateCreatePost,
  validateUpdatePost
} = require("../validation/post.validator");

// const getposts = async (req, res) => {
//   const queryStringObj = { ...req.query};
//   console.log(queryStringObj);
//   console.log(req.params.id);
//   const excludesFildes = ["page", "sort", "limit", "fields"];
//   excludesFildes.forEach((field) => delete queryStringObj[field]);
//   let queryStr = JSON.stringify(queryStringObj);
//   queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//   console.log(queryStr);
//   const page = req.query.page * 1 || 1;
//   const limit = req.query.limit * 1 || 6;
//   const skip = (page - 1) * limit;
//   const endIndex = page * limit;
//   const pagination = {};
//   const documentCount = await Post.countDocuments();
//   pagination.currentPage = page;
//   pagination.limit = limit;
//   pagination.numberPages = Math.ceil(documentCount / limit);
//   //next page
//   if (endIndex < documentCount) {
//     pagination.nextPage = page + 1;
//   }
//   if (skip > 0) {
//     pagination.prevPage = page - 1;
//   }
//   const paginationResult = pagination;
//   let mongooseQuery = Post.find(JSON.parse(queryStr))
//     .skip(skip)
//     .limit(limit)
//     .populate("user"); //sorting
//   //console.log(mongooseQuery)
//   if (req.query.sort) {
//     const sortBy = req.query.sort.split(",").join(" ");
//     mongooseQuery = mongooseQuery.sort(sortBy);
//   } else {
//     mongooseQuery = mongooseQuery.sort("-createAt");
//   }
//   //fields
//   if (req.query.fields) {
//     const fields = req.query.fields.split(",").join(" ");
//     mongooseQuery = mongooseQuery.select(fields);
//   } else {
//     mongooseQuery.select("-__v");
//   }
//   //search
//   if (req.query.keyword) {
//     let query = {};
//     if (Post.modelName === "Post") {
//       query.$or = [
//         { title: { $regex: req.query.keyword, $options: "i" } },
//         { description: { $regex: req.query.keyword, $options: "i" } },
//       ];
//     } else {
//       query = { name: { $regex: req.query.keyword, $options: "i" } };
//     }
//     mongooseQuery = Post.find(query);
//   }
//   const posts = await mongooseQuery;
//   res
//     .status(200)
//     .json({ results: posts.length, paginationResult, data: posts });
// };

const addPost = async (req, res) => {
  try {

    const {
      error,
      value
    } = validateCreatePost(req.body);
    if (error) {
      res.status(400).json({
        message: "Invalid form field.."
      })
      return;
    }
    const user = req.user;
    if (!user) {
      res.status(403).json({
        message: "Token is not valid!",

      });
      return;
    }
    const fileId = req.fileId
    // const user=curentUser
    const post = await AaddPostServise({
      ...req.body,
      user: user._id,
      fileId
    })
    res.json({
      status: "success",
      post: post
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deletePost = async (req, res) => {
  try {
    const user = req.user;

    console.log(user);

    const {
      id
    } = req.params;

    if (!user) {
      res.status(403).json({
        message: "Token is not valid!",

      });
      return;
    }

    const post = await getPostByIdServise({
      _id: id,
    });
    if (!post) {
      res.status(422).json("Post not Founded");
      return;
    }
    if (post.user.id !== user.id) {
      res.status(403).json("You can delete only your post!");
      return;
    }
    await deleteImage(post.fileId)
    await deletePostServise({
      _id: id,
    })

    res.json({
      status: "success",
      message: "Post has been deleted!"
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const editPost = async (req, res) => {
  try {

    const {
      error,
      value
    } = validateUpdatePost(req.body);

    if (error) {
      res.status(400).json({
        message: "Invalid form field.."
      })
      return;
    }

    const user = req.user;


    if (!user) {
      res.status(403).json({
        message: "Token is not valid!",

      });
      return;
    }

    const {
      id
    } = req.params;

    const post = await getPostByIdServise({
      _id: id,
    });
    if (!post) {
      res.status(422).json("Post not Founded");
      return;
    }
    if (post.user.id !== user.id) {
      res.status(403).json("You can update only your post!");
      return;
    }
    const image = req.body.image;
    console.log(post + ";;;;")
    if (req.body.image) {
      await deleteImage(post.fileId)
    }
    const fileId = req.fileId
    const updatedPost = await updatPostServise({
        _id: id,
      }, {
        ...req.body,
        user: user._id,
        fileId
      }

    );
    const findNewPost = await getPostByIdServise({
      _id: id,
    });
    res.json({
      status: "success",
      message: ' post deleted successfuly'
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getposts = async (req, res) => {
  let filterObj = {};
  if (req.params.userId) filterObj = {
    user: req.params.userId
  };
  const queryStringObj = {
    ...req.query,
    ...filterObj
  };
  //console.log(queryStringObj)
  const excludesFildes = ["page", "sort", "limit", "fields", "keyword"];
  excludesFildes.forEach((field) => delete queryStringObj[field]);
  let queryStr = JSON.stringify(queryStringObj);

  //console.log(queryStr)
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  //console.log(queryStr)

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit;
  const endIndex = page * limit;
  const pagination = {};
  let documentCount;

  let query = {};
  //search
  if (req.query.keyword) {
    if (Post.modelName === "Post") {
      query.$or = [{
          title: {
            $regex: req.query.keyword,
            $options: "i"
          }
        },
        {
          description: {
            $regex: req.query.keyword,
            $options: "i"
          }
        },
      ];
    } else {
      query = {
        title: {
          $regex: req.query.keyword,
          $options: "i"
        }
      };
    }
  }
  //console.log(queryStr)
  if (req.params.userId) {
    query = {
      ...query,
      ...filterObj
    };
  }
  const parsed = JSON.parse(queryStr);
  query = {
    ...query,
    ...parsed
  };

  //build query
  let mongooseQuery = Post.find(query);
  let allPosts = await mongooseQuery;
  //console.log(allPosts );

  //sorting
  // const sortBy = req.query.sort ?
  //   req.query.sort.split(",").join(" ") :
  //   "-createdAt";
  let sortBy = req.query.sort || "-_id";
  sortBy = sortBy.split(",").join(" ");

  mongooseQuery = Post
    .find(query)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .populate("user");

  //fields
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    mongooseQuery = mongooseQuery.select(fields);
  } else {
    mongooseQuery.select("-__v");
  }

  //excute
  const posts = await mongooseQuery;

  documentCount = allPosts.length;

  pagination.currentPage = page;
  pagination.limit = limit;
  pagination.numberPages = Math.ceil(documentCount / limit);
  //next page
  if (endIndex < documentCount) {
    pagination.nextPage = page + 1;
  }
  if (skip > 0) {
    pagination.prevPage = page - 1;
  }
  const paginationResult = pagination;
  res.status(200).json({
    status: "success",
    results: posts.length,
    documentCount,
    paginationResult,
    posts: posts,
  });
}

const getPostById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const post = await getPostByIdServise({
      _id: id,
    });
    if (!post) {
      res.status(422).json("Post not Founded");
      return;
    }

    res.json({
      status: "success",
      post: post
    });
  } catch (error) {
    res.status(404).json({
      message: 'Post By Id',
      message: error.message,
    });
  }

}


module.exports = {
  getposts,
  addPost,
  deletePost,
  editPost,
  getPostById
};