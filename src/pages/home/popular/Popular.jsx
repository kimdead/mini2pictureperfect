import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

const CarouselSection = () => {
  const [endpoint, setEndpoint] = useState("movie");
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
      <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      <ContentWrapper>
        <span className="carouselTitle">Popular</span>
      </ContentWrapper>
      <Carousel
        data={popularData?.results}
        loading={popularLoading}
        endpoint={endpoint}
      />

      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
      </ContentWrapper>
      <Carousel
        data={topRatedData?.results}
        loading={topRatedLoading}
        endpoint={endpoint}
      />
    </div>
  );
};

export default CarouselSection;
