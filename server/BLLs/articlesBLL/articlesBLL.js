const articleDAL = require("../../DALs/articlesDAL");

const createArticle = (articleData) => {
  console.log(articleData);
  return articleDAL.createArticle(articleData);
};
const getAllArticles = async (page) => {
  const pagesLimit = 2;
  const startIndex = (Number(page) - 1) * pagesLimit;
  return articleDAL.getAllArticles(startIndex);
};
const getTotalAtriclesAmount = () => {
  return articleDAL.getTotalAtriclesAmount();
};
module.exports = { createArticle, getAllArticles, getTotalAtriclesAmount };
