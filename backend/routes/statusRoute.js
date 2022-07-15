const express = require("express");
const {
 createStatus, getStatus
} = require("../controllers/statusController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/status").post(createStatus);

router.route("/status").get(getStatus);


module.exports = router;
