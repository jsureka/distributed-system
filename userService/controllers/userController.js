const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
var Minio = require("minio");
const crypto = require("crypto");
const fs = require('fs')
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  console.log(req.file);
  const { name, email, password } = req.body;
  var picture = crypto.randomUUID();
  const user = await User.create({ name, email, password, picture });

  var minioClient = new Minio.Client({
    endPoint: "storyobjectdb",
    port: 9000,
    useSSL: false,
    accessKey: "minioadmin",
    secretKey: "minioadmin",
  });
  const metadata = {
    "Content-type": "image/jpg",
  };
  minioClient.makeBucket('avatars', 'us-east-1', function(err) {
    if (err) return console.log('Error creating bucket.', err)
    console.log('Bucket created successfully in "us-east-1".')
  })
  
  minioClient.fPutObject(
    "avatars",
    picture,
    req.file.path,
    metadata,
    function (err, etag) {
      if (err) return console.log(err);
      console.log(etag);
    }
  );
  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get Users
exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    success: true,
    user,
  });
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Get User Detail
exports.getSpecificUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    user,
  });
});


exports.getImage = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  console.log(user.picture);
	try {
		let data;
		
    var minioClient = new Minio.Client({
      endPoint: "storyobjectdb",
      port: 9000,
      useSSL: false,
      accessKey: "minioadmin",
      secretKey: "minioadmin",
    });
		minioClient.getObject("avatars", user.picture, (err, objStream) => {
			if (err) {
				return res.status(404).send({ message: "Image not found" });
			}
			objStream.on("data", (chunk) => {
				console.log("eta error 1?");
				data = !data ? new Buffer(chunk) : Buffer.concat([data, chunk]);
			});
			console.log("The user picture id is " + user.picture);

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