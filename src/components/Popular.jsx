import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./templates/Loading";
import TopNav from "./templates/TopNav";
import DropDown from "./templates/DropDown";
import Cards from "./templates/Cards";

const Popular =  () => {

  document.title = "React Major Project | Popular Page";

  const navigate = useNavigate();

  const [category, setCategory] = React.useState("movie");
  const [popular, setPopular] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const getPopular = async () => {
    try {
      const response = await axios.get(`/${category}/popular?page=${page}`);
      if (response.data.results.length > 0) {
        setPopular((prev) => [...prev, ...response.data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching popular:", error);
    }
  };

  const refreshHandler = () => {
    if(popular.length === 0) {
        getPopular();
    } else {
        setPage(1);
        setPopular([]);
        getPopular();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category]);


   return popular.length > 0 ? (
    <>
      <div className="px-[5%] w-screen h-screen">
        <div className="w-full h-[10vh]  flex items-center justify-space-between">
          <h1 className="text-2xl font-semibold text-zinc-400">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] ri-arrow-left-line"
            ></i>
            Popular
          </h1>
          <TopNav />
          <DropDown
            title="Category"
            options={["movie", "tv"]}
            onCategoryChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <InfiniteScroll
          dataLength={popular.length}
          next={getPopular}
          loader={<h1>Loading...</h1>}
          hasMore={hasMore}
        >
          <Cards data={popular} title="category" />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Popular;