const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

router.post("/createArticle", articleController.createArticle);
router.get("/getArticles", articleController.getAllArticles);

module.exports = router;
