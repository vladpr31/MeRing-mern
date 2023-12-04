import React, { useEffect, useState } from "react";
import { getAllArticles } from "../../../../api/api";
import ArticleImage from "./ArticleImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
//import for pagination
//import {getTotalArticlesAmount } from "../../../../api/api";
// import Pagination from "../../../../Pagination/Pagination";
const ArticleSection = () => {
  const [articles, setArticles] = useState([]);

  // For Pagination
  // const [currPage, setCurrPage] = useState(1);
  // const [total, setTotal] = useState();
  useEffect(() => {
    const fetchLatestNews = async () => {
      if (articles.length <= 0) {
        const news = await getAllArticles();
        // For Pagination ->
        // const maxPages = await getTotalArticlesAmount();
        // if (maxPages.data) {
        //   setTotal(maxPages.data);
        // }
        if (news?.data?.length > 0) {
          setArticles(news.data);
        }
      }
    };
    fetchLatestNews();
  }, []);
  return (
    <section className="mt-12 py-10 px-8">
      <h2 className="mb-16 text-center text-2xl font-bold">Latest articles</h2>
      {articles.length > 0 ? (
        articles.map((article, index) => {
          if (index % 2 == 0) {
            return (
              <motion.div
                className="mb-16 flex flex-wrap"
                key={index}
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2 }}
              >
                <div className="mb-6 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-6/12 lg:pr-6">
                  <div className="ripple relative overflow-hidden rounded-lg bg-cover bg-[50%] bg-no-repeat shadow-lg dark:shadow-black/20">
                    <ArticleImage image={article.articleImage} />
                  </div>
                </div>

                <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 lg:pl-6">
                  <h3 className="mb-4 text-2xl font-bold">{article.title}</h3>

                  <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
                    Published on:{" "}
                    <u>{new Date(article.date).toLocaleDateString("en-GB")}</u>{" "}
                    at:{" "}
                    {new Date(article.date).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    by
                    {" " + article.publisher}
                  </p>
                  <p className="mb-6 text-neutral-500 dark:text-neutral-300">
                    {article.articleBody}
                  </p>
                </div>
              </motion.div>
            );
          } else {
            return (
              <div
                className="mb-16 flex flex-wrap lg:flex-row-reverse"
                key={index}
              >
                <div className="mb-6 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-6/12 lg:pl-6">
                  <div
                    className="ripple relative overflow-hidden rounded-lg bg-cover bg-[50%] bg-no-repeat shadow-lg dark:shadow-black/20"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    <ArticleImage image={article.articleImage} />
                  </div>
                </div>

                <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 lg:pr-6">
                  <h3 className="mb-4 text-2xl font-bold">{article.title}</h3>

                  <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
                    Published on:{" "}
                    <u>{new Date(article.date).toLocaleDateString("en-GB")}</u>{" "}
                    at:{" "}
                    {new Date(article.date).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    by
                    {" " + article.publisher}
                  </p>
                  <p className="text-neutral-500 dark:text-neutral-300">
                    {article.articleBody}
                  </p>
                </div>
              </div>
            );
          }
        })
      ) : (
        <div className="text-center p-2">
          No News (Development: You can create new News Article from the Admin
          Panel)
        </div>
      )}

      {
        // pagination works, fetches on demand but look bad when only 1 article on next page.
        /* {total && total > 0 ? (
          <div className="flex justify-center mx-auto">
            <Pagination
              currentPage={currPage}
              totalCount={total}
              pageSize={2}
              onPageChange={(page) => setCurrPage(page)}
            />
          </div>
        ) : null} */
      }
      <div className="text-center text-gray-500">
        <a href="/news" className="text-center underline">
          Other News <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </a>
      </div>
    </section>
  );
};

export default ArticleSection;
