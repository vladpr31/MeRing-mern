import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import useWindowSize from "../../../../hooks/useWindowSize";
import { getSpecialtiesData } from "../../../../api/api";
import Pagination from "../../../../Pagination/Pagination";
import Loader from "../../../UI/Loader";
import DoctorSearch from "../../../UI/DoctorSearch";

const NewAppointment = () => {
  const { id } = useParams();
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const [serachInput, setSearchInput] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 20;
    const lastPageIndex = firstPageIndex + 20;
    return categories.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, categories]);

  const searchHandler = (input) => {
    setSearchInput(input);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      let { data: categories } = await getSpecialtiesData();
      if (categories) {
        categories = categories.map((category) => {
          return category.name;
        });
        setCategories(categories);
      }
    };
    fetchCategories();
  }, []);

  if (categories.length <= 0) {
    return <Loader />;
  }
  return (
    <div className={`px-8 py-20 mx-auto  flex flex-col justify-between w-full`}>
      <DoctorSearch
        categories={categories}
        searchHandler={searchHandler}
        userId={id}
        key={Math.random()}
      />

      <div
        className={`grid auto-rows-fr ${
          isMobile ? "grid-cols-3 p-5" : "grid-cols-4 p-10"
        } gap-5 h-full`}
      >
        {currentPageData.map((category, index) => {
          return (
            <div
              key={index}
              className="bg-white shadow-xl w-full rounded-lg p-2 text-center flex items-center justify-center text-[auto] hover:bg-blue-500 hover:scale-110 hover:duration-300 hover:text-white"
            >
              <Link
                to={`/user/${id}/new-appointment/${category
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
                className="w-full"
              >
                {category}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalCount={categories.length}
          pageSize={20}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default NewAppointment;
