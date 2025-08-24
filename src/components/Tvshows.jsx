import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./templates/Loading";
import TopNav from "./templates/TopNav";
import DropDown from "./templates/DropDown";
import Cards from "./templates/Cards";

const Tvshows =  () => {

  document.title = "React Major Project | Tv shows Page";

  const navigate = useNavigate();

  const [category, setCategory] = React.useState("airing_today");
  const [tvshows, setTvshows] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const getTvshows = async () => {
    try {
      const response = await axios.get(`tv/${category}?page=${page}`);
      if (response.data.results.length > 0) {
        setTvshows((prev) => [...prev, ...response.data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching tv shows:", error);
    }
  };

  const refreshHandler = () => {
    if(tvshows.length === 0) {
        getTvshows();
    } else {
        setPage(1);
        setTvshows([]);
        getTvshows();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category]);


   return tvshows.length > 0 ? (
    <>
      <div className="px-[5%] w-screen h-screen">
        <div className="w-full h-[10vh]  flex items-center justify-space-between">
          <h1 className="text-2xl font-semibold text-zinc-400">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] ri-arrow-left-line"
            ></i>
            Tv shows <small className="text-sm text-zinc-400">({category})</small>
          </h1>
          <TopNav />
          <DropDown
            title="Category"
            options={["airing_today", "on_the_air", "popular", "top_rated"]}
            onCategoryChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <InfiniteScroll
          dataLength={tvshows.length}
          next={getTvshows}
          loader={<h1>Loading...</h1>}
          hasMore={hasMore}
        >
          <Cards data={tvshows} title="tvshows" />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Tvshows;