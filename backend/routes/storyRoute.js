const express = require("express");
const {
createStory, getStory
} = require("../controllers/storyController");
const { isAuthenticatedUser } = require("../middleware/auth");
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

const router = express.Router();

router.route("/story").post( isAuthenticatedUser, upload.single("image"), createStory);

router.route("/story").get(isAuthenticatedUser, getStory);

module.exports = router;
