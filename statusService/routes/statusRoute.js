const express = require("express");
const {
 createStatus, getStatus
} = require("../controllers/statusController");
const { isAuthenticatedUser } = require("../middleware/auth");
const multer = require('multer');
var upload = multer()

const router = express.Router();

router.route("/status").post( isAuthenticatedUser,upload.array(), createStatus);

router.route("/status").get(isAuthenticatedUser,getStatus);


module.exports = router;
