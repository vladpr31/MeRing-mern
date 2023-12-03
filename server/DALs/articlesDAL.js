const ArticleDB = require("../models/articleModel");

const createArticle = (articleData) => {
  const newArticle = new ArticleDB(articleData);
  newArticle.save();
  return newArticle;
};
const getAllArticles = async (startIndex) => {
  const articles = ArticleDB.find({})
    .populate("articleImage")
    .find()
    .sort({ _id: -1 }) //_id:-1 sort from newest.
    .limit(2); //limits to return 8 pages per find().
  // .skip(startIndex); //skip the startIndex.
  return articles;
};
const getTotalAtriclesAmount = () => {
  return ArticleDB.countDocuments({});
};
module.exports = { createArticle, getAllArticles, getTotalAtriclesAmount };
