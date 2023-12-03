const articleDAL = require("../../DALs/articlesDAL");

const createArticle = (articleData) => {
  return articleDAL.createArticle(articleData);
};
const getAllArticles = async () => {
  return articleDAL.getAllArticles();
};

module.exports = { createArticle, getAllArticles };
