const express = require("express");
const {
 createStatus
} = require("../controllers/statusController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/status").post(createStatus);

module.exports = router;
