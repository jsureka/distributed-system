const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    description: {
      type: String,
      required: [true, "Please Enter Story Description"],
    },
    storyImage: {
        public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
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
              },
              user_id: {
                type:  mongoose.Schema.ObjectId
              }
        }
    ]
  });

  module.exports = mongoose.model("Story", storySchema);
