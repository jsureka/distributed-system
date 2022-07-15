const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Status = require("../models/statusModel");

exports.createStatus = catchAsyncErrors(async (req, res, next) => {
  
  const status = await Status.create(req.body);

  res.status(200).json({
    success: true,
    status,
  });
});

exports.getStatus = catchAsyncErrors(async (req, res, next) => {
  const status = await Status.find();

  res.status(200).json({
    success: true,
    status,
  });
});

exports.getStatusById = catchAsyncErrors(async (req, res, next) => {
    const status = await Status.findById(req.params.id);
  
    res.status(200).json({
      success: true,
      status,
    });
  });
  
//   exports.updateStatus = catchAsyncErrors(async (req, res, next) => {
//     const status = await Status.findByIdAndUpdate();
  
//     res.status(200).json({
//       success: true,
//       status,
//     });
//   });
  