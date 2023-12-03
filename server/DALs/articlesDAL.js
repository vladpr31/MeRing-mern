const { default: mongoose } = require("mongoose");
const ArticleDB = require("../models/articleModel");

const createArticle = (articleData) => {
  const newArticle = new ArticleDB(articleData);
  newArticle.save();
  return newArticle;
};
const getAllArticles = async () => {
  return ArticleDB.find({}).populate("articleImage");
};
module.exports = { createArticle, getAllArticles };
