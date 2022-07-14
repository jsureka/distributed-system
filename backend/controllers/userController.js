const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
var Minio = require("minio");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body.name)
  const {name, email, password} = req.body
  var minioClient = new Minio.Client({
    endPoint: "127.0.0.1",
    port: 9000,
    useSSL: false,
    accessKey: "jsureka",
    secretKey: "minioadmin",
  });
  const metadata = {
    'Content-type': 'image/jpeg',
  };
  const result =  minioClient.putObject(
    "avatars",
    req.body.name,
    req.body.image,
    metadata,
    function (err, etag) {
      if (err) return console.log(err);
      console.log(etag);
    }
  );
  const user = await User.create({name, email, password});

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
