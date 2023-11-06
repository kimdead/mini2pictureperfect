import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";

import "./style.css";

import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";

import Pagination from "../../components/pagination/Pagination"; // Import your Pagination component

let filters = {};

const sortbyData = [
  { value: "original_title.asc", label: "Title (A-Z)" },
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Score Descending" },
  { value: "vote_average.asc", label: "Score Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum(1); // Set the page number to 1 for initial data
      setLoading(false);
    });
  };

  const onPageChange = (newPage) => {
    setPageNum(newPage); // Update the page number
    fetchData(newPage);
  };

  const fetchData = (page) => {
    filters = {
      ...filters,
      page,
    };
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    fetchInitialData();
  };

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="filters">
            <Select
              isMulti={false}
              name="genres"
              value={genre}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              isClearable={true}
              isSearchable={false}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isSearchable={false}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <>
                <div className="content">
                  {data?.results?.map((item, index) => {
                    if (item.media_type === "person") return;
                    return (
                      <MovieCard
                        key={index}
                        data={item}
                        mediaType={mediaType}
                      />
                    );
                  })}
                </div>
                <Pagination
                  currentPage={pageNum}
                  totalPages={data.total_pages}
                  onPageChange={onPageChange}
                />
              </>
            ) : (
              <span className="resultNotFound">Sorry, Results not found!</span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Explore;
