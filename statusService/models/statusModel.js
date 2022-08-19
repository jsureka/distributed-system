const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
    status: {
      type: String,
      required: [true, "Please Enter Post Description"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username:{
      type:String
    },
    user_id : {
      type : mongoose.Schema.ObjectId
    }
  });

  module.exports = mongoose.model("Status", statusSchema);
