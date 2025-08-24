import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./templates/Loading";
import TopNav from "./templates/TopNav";
import DropDown from "./templates/DropDown";
import Cards from "./templates/Cards";

const Movies =  () => {

  document.title = "React Major Project | Movies Page";

  const navigate = useNavigate();

  const [category, setCategory] = React.useState("now_playing");
  const [movies, setMovies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const getMovies = async () => {
    try {
      const response = await axios.get(`movie/${category}?page=${page}`);
      if (response.data.results.length > 0) {
        setMovies((prev) => [...prev, ...response.data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const refreshHandler = () => {
    if(movies.length === 0) {
        getMovies();
    } else {
        setPage(1);
        setMovies([]);
        getMovies();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category]);


   return movies.length > 0 ? (
    <>
      <div className="px-[5%] w-screen h-screen">
        <div className="w-full h-[10vh]  flex items-center justify-space-between">
          <h1 className="text-2xl font-semibold text-zinc-400">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] ri-arrow-left-line"
            ></i>
            Movies <small className="text-sm text-zinc-400">({category})</small>
          </h1>
          <TopNav />
          <DropDown
            title="Category"
            options={["now_playing", "popular", "top_rated", "upcoming"]}
            onCategoryChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <InfiniteScroll
          dataLength={movies.length}
          next={getMovies}
          loader={<h1>Loading...</h1>}
          hasMore={hasMore}
        >
          <Cards data={movies} title="movie" />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Movies;