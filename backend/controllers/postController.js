const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Post = require("../models/postModel");

exports.createPost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.create(req.body);

  res.status(200).json({
    success: true,
    post,
  });
});

exports.getPost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.find();

  res.status(200).json({
    success: true,
    post,
  });
});

exports.getPostById = catchAsyncErrors(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
  
    res.status(200).json({
      success: true,
      post,
    });
  });
  
//   exports.updatePost = catchAsyncErrors(async (req, res, next) => {
//     const post = await Post.findByIdAndUpdate();
  
//     res.status(200).json({
//       success: true,
//       post,
//     });
//   });
  