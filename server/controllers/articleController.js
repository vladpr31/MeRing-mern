const articleBLL = require("../BLLs/articlesBLL/articlesBLL");

const createArticle = async (req, res) => {
  const articleData = {
    title: req.body.title,
    articleBody: req.body.articleBody,
    publisher: req.body.publisher || "MeRing HQ",
    date: new Date(),
    articleImage: req.file.id,
  };

  const newArticle = await articleBLL.createArticle(articleData);
  if (newArticle) {
    res.status(200).json(newArticle);
  } else {
    console.log("error creating article");
    res.status(400).json("Error creating article");
  }
};

const getAllArticles = async (req, res) => {
  const articles = await articleBLL.getAllArticles();
  if (articles) {
    res.status(200).json(articles);
  } else {
    console.log("error getting articles in getAllArticles");
    res.status(400).json("Error Retreiving Articles");
  }
};

module.exports = { createArticle, getAllArticles };
