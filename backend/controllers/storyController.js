const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const crypto = require("crypto");
var Minio = require("minio");

exports.createStory = catchAsyncErrors(async (req, res, next) => {
    var story = crypto.randomUUID();
    const user = await User.findById(req.user.id);
    user.images.push({url : story});
    user.save();
    var minioClient = new Minio.Client({
      endPoint: "127.0.0.1",
      port: 9000,
      useSSL: false,
      accessKey: "xcn392T2HkviIPiQ",
      secretKey: "6BKSAkzwI4fN5aMMBt6W9sIWXMdPxgQs",
    });
    const metadata = {
      "Content-type": "image/jpg",
    };
    minioClient.fPutObject(
      "stories",
      story,
      req.file.path,
      metadata,
      function (err, etag) {
        if (err) return console.log(err);
        console.log(etag);
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });
  
  exports.getStory = catchAsyncErrors(async (req, res, next) => {
    const user = await User.find({},{ name: 1, picture: 1, images:1 } );
 
    res.status(200).json({
      success: true,
      user,
    });
  });