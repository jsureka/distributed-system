const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Story = require("../models/storyModel");
const crypto = require("crypto");
var Minio = require("minio");
const fs = require('fs')
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);


exports.createStory = catchAsyncErrors(async (req, res, next) => {
    var story = crypto.randomUUID();
    const user = await Story.create({user_id : req.user.id, images : [{url: story}]});
    
    var minioClient = new Minio.Client({
      endPoint: "storyobjectdb",
      port: 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
    const metadata = {
      "Content-type": "image/jpg",
    };
    minioClient.makeBucket('stories', 'us-east-1', function(err) {
      if (err) return console.log('Error creating bucket.', err)
      console.log('Bucket created successfully in "us-east-1".')
    })
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
    const user = await Story.find().sort({"createdAt":-1}).limit(10);
 
    res.status(200).json({
      success: true,
      user,
    });
  });

  exports.getImage = catchAsyncErrors(async (req, res, next) => {
    try {
      let data;
      
      var minioClient = new Minio.Client({
        endPoint: "storyobjectdb",
        port: 9000,
        useSSL: false,
        accessKey: "minioadmin",
        secretKey: "minioadmin",
      });
      minioClient.getObject("stories", req.params.id, (err, objStream) => {
        if (err) {
          return res.status(404).send({ message: "Image not found" });
        }
        objStream.on("data", (chunk) => {
          console.log("eta error 1?");
          data = !data ? new Buffer(chunk) : Buffer.concat([data, chunk]);
        });
  
        objStream.on("end", () => {
          res.writeHead(200, { "Content-Type": "image/png" });
          res.write(data);
          res.end();
        });
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error at fetching image",
      });
    }
  });