import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./style.css";

const HeroBanner = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { loading } = useFetch("/movie/upcoming");

  const searchQueryHandler = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      searchQueryHandler();
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <video
            mute="true"
            loop={true}
            autoPlay={true}
            className="backVid"
            src="/src/assets/backvid3.mp4"
          ></video>
        </div>
      )}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={handleKeyUp}
            />
            <button onClick={searchQueryHandler}>
              <span className="icon">search</span>
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
