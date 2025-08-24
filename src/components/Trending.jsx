import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import DropDown from "./templates/DropDown";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import Loading from "./templates/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {

  document.title = "React Major Project | Trending Page";

  const navigate = useNavigate();

  const [category, setCategory] = React.useState("all");
  const [duration, setDuration] = React.useState("day");
  const [trendings, setTrendings] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const getTrendings = async () => {
    try {
      const response = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if (response.data.results.length > 0) {
        setTrendings((prev) => [...prev, ...response.data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching trendings:", error);
    }
  };

  const refreshHandler = () => {
    if(trendings.length === 0) {
        getTrendings();
    } else {
        setPage(1);
        setTrendings([]);
        getTrendings();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trendings.length > 0 ? (
    <>
      <div className="px-[5%] w-screen h-screen">
        <div className="w-full h-[10vh]  flex items-center justify-space-between">
          <h1 className="text-2xl font-semibold text-zinc-400">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] ri-arrow-left-line"
            ></i>
            Trending
          </h1>
          <TopNav />
          <DropDown
            title="Category"
            options={["all", "movie", "tv"]}
            onCategoryChange={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <DropDown
            title="Duration"
            options={["week", "day"]}
            onCategoryChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <InfiniteScroll
          dataLength={trendings.length}
          next={getTrendings}
          loader={<h1>Loading...</h1>}
          hasMore={hasMore}
        >
          <Cards data={trendings} title="category" />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Trending;
