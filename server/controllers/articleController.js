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
  const { page } = req.query;

  if (!page) {
    const articles = await articleBLL.getAllArticles(2);
    if (articles) {
      res.status(200).json(articles);
    } else {
      console.log("error getting articles in getAllArticles");
      res.status(400).json("Error Retreiving Articles");
    }
  } else {
    const articles = await articleBLL.getAllArticles(page);
    if (articles) {
      res.status(200).json(articles);
    } else {
      console.log("error getting articles in getAllArticles");
      res.status(400).json("Error Retreiving Articles");
    }
  }
};

const totalArticles = async (req, res) => {
  const articlesAmount = await articleBLL.getTotalAtriclesAmount();
  if (articlesAmount) {
    res.status(200).json(articlesAmount);
  } else {
    console.log("error in getting totalArticlesAmount");
    res.status(400).json("Error In Getting totalArticlesAmount");
  }
};
module.exports = { createArticle, getAllArticles, totalArticles };
