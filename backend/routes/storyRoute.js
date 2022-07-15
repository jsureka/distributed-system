const express = require("express");
const {
createStory, getStory
} = require("../controllers/storyController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/story").post(createStory);

router.route("/story").get(getStory);

module.exports = router;
