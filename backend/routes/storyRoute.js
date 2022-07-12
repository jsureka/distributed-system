const express = require("express");
const {
createStory
} = require("../controllers/storyController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/status").post(createStory);

module.exports = router;
