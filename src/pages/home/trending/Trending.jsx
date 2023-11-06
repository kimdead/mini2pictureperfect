import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

const Trending = () => {
  const [mediaType, setMediaType] = useState("movie");
  const [timeWindow, setTimeWindow] = useState("week");

  const { data: movieData, loading: movieLoading } = useFetch(
    `/trending/${mediaType}/${timeWindow}`
  );

  const onTabChange = (tab) => {
    const newMediaType = tab === "Movies" ? "movie" : "tv";
    setMediaType(newMediaType);
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Movies", "TV shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={movieData?.results} loading={movieLoading} />
    </div>
  );
};

export default Trending;
