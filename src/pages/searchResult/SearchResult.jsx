import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./style.css";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Pagination from "../../components/pagination/Pagination";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchPageData = (page) => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${page}`).then(
      (res) => {
        setData(res);
        setCurrentPage(page);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchPageData(1);
  }, [query]);

  const handlePageChange = (page) => {
    fetchPageData(page);
  };

  return (
    <div className="searchResultsPage">
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <div className="content">
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={data?.total_pages || 1}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="resultNotFound">
              <p className="bigText">SORRY</p>
              <p className="smallText">Result not found!</p>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
