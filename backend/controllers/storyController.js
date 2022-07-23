const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const crypto = require("crypto");
var Minio = require("minio");
const fs = require('fs')
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);


exports.createStory = catchAsyncErrors(async (req, res, next) => {
    var story = crypto.randomUUID();
    const user = await User.findById(req.user.id);
    user.images.push({url : story});
    user.save();
    var minioClient = new Minio.Client({
      endPoint: "127.0.0.1",
      port: 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
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
    await unlinkFile(req.file.path);
    res.status(200).json({
      success: true,
    });
  });
  
  exports.getStory = catchAsyncErrors(async (req, res, next) => {
    const user = await User.find({images : { $exists: true, $ne: [] }, picture : {$ne : null}, _id : {$ne : req.user.id}},{ name: 1, picture: 1, images:1 } ).sort({"createdAt":-1}).limit(10);
 
    res.status(200).json({
      success: true,
      user,
    });
  });