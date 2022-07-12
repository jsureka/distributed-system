const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
    description: {
      type: String,
      required: [true, "Please Enter Post Description"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    comments : [
        {
            comment: {
                type: String,
                required: [true, "Please Enter a Comment"],
              },
              createdAt: {
                type: Date,
                default: Date.now,
              },
              username: {
                type: String
              }
        }
    ]
  });

  module.exports = mongoose.model("Status", statusSchema);
