const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Story = require("../models/storyModel");


exports.createStory = catchAsyncErrors(async (req, res, next) => {
    const story = await Story.create(req.body);
  
    res.status(200).json({
      success: true,
      story,
    });
  });
  
  exports.getStory = catchAsyncErrors(async (req, res, next) => {
    const story = await Story.find();
  
    res.status(200).json({
      success: true,
      story,
    });
  });