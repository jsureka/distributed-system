const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const axios = require("axios");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }
  // const users = axios.get("http://127.0.0.1:8001/users")
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
   req.user = decodedData;
 // req.user = users.find({ _id : decodedData.id });

  next();
});
