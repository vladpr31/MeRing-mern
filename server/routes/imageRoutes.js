const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
router.get("/image/:filename", imageController.getImage);

module.exports = router;
