import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

const CombinedCarousel = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const [timeWindow] = useState("week");
  const { data: trendingData, loading: trendingLoading } = useFetch(
    `/trending/${endpoint}/${timeWindow}`
  );
  const { data: popularData, loading: popularLoading } = useFetch(
    `/${endpoint}/popular`
  );
  const { data: topRatedData, loading: topRatedLoading } = useFetch(
    `/${endpoint}/top_rated`
  );

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <SwitchTabs data={["Movies", "TV shows"]} onTabChange={onTabChange} />
        <span className="carouselTitle">Trending</span>
      </ContentWrapper>
      <Carousel data={trendingData?.results} loading={trendingLoading} />

      <ContentWrapper>
        <span className="carouselTitle">Popular</span>
      </ContentWrapper>
      <Carousel data={popularData?.results} loading={popularLoading} />

      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
      </ContentWrapper>
      <Carousel data={topRatedData?.results} loading={topRatedLoading} />
    </div>
  );
};

export default CombinedCarousel;
