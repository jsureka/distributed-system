const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  getUser,
} = require("../controllers/userController");
const multer = require('multer');
const app=express();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));


const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post( upload.single("image"), registerUser);

router.route("/login").post(upload.array(),loginUser);

router.route("/logout").get(logout);

router.route("/user").get(getUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

module.exports = router;
