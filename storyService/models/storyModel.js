const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  user : {
    user_id : {
      type : mongoose.Schema.ObjectId
    },
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    images : [
      {
        url : {
          type: String
        }
      }
    ]
  }
});

  module.exports = mongoose.model("Story", storySchema);
