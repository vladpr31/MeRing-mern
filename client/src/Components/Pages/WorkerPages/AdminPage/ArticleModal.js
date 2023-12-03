import React, { useState } from "react";
import { createArticle } from "../../../../api/api";
const ArticleModal = () => {
  const [article, setArticle] = useState({
    title: "",
    articleBody: "",
    articleImage: null,
  });
  const formData = new FormData();
  const handleArticleInputs = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "articleTitle":
        setArticle((prevState) => ({
          ...prevState,
          title: value,
        }));
        break;
      case "articleBody":
        setArticle((prevState) => ({
          ...prevState,
          articleBody: value,
        }));
        break;
      case "articleImage":
        setArticle((prevState) => ({
          ...prevState,
          articleImage: e.target.files[0],
        }));
        break;
      default:
        setArticle({
          title: "",
          articleBody: "",
          articleImage: null,
        });
    }
  };

  const handleArticle = () => {
    formData.append("title", article.title);
    formData.append("articleBody", article.articleBody);
    formData.append("articleImage", article.articleImage);
    createArticle(formData);
  };
  return (
    <div className="bg-white bg-opacity-40 p-6 rounded-lg w-full h-full">
      <form
        method="dialog"
        className="modal-box flex flex-col mx-auto w-full h-full"
      >
        <div className="flex justify-end p-2 mb-2">
          <button className=" bg-blue-500 w-fit px-2 py-1 text-white rounded-lg">
            X
          </button>
        </div>
        <div className="bg-base-300 flex flex-col justify-center items-center p-2 rounded-2xl">
          <label htmlFor="articleTitle">Article Title</label>
          <input
            type="text"
            id="articleTitle"
            className="bg-white rounded-2xl w-full p-2"
            onChange={handleArticleInputs}
          />
          <label htmlFor="articleBody">Article Body</label>
          <textarea
            id="articleBody"
            className="h-[300px] w-full p-2 rounded-xl resize-none"
            onChange={handleArticleInputs}
          />
          <label htmlFor="articleImage">Article Image</label>
          <input
            type="file"
            id="articleImage"
            className="file:bg-blue-500 file:text-white file:rounded-2xl file:hover:cursor-pointer file:active:scale-[0.8]"
            onChange={handleArticleInputs}
            name="articleImage"
          />
        </div>
        <button className="btn btn-primary mt-2" onClick={handleArticle}>
          Upload Article
        </button>
      </form>
    </div>
  );
};

export default ArticleModal;

/*
Elevating Care: Introducing Our New Patient Rooms

At Our Clinic, we're excited to introduce newly designed rooms
dedicated to enhancing your privacy and comfort. These modern
spaces are thoughtfully crafted to provide a tranquil environment
for your healthcare experience. With a focus on creating a secure
and personalized setting, these rooms offer a heightened level of
comfort, ensuring that your journey to wellness is not only
effective but also conducted with the utmost consideration for
your privacy. Step into a space designed exclusively for your
well-being at Our Clinic's new patient rooms


*/
