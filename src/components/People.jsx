import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./templates/Loading";
import TopNav from "./templates/TopNav";
import Cards from "./templates/Cards";

const People =  () => {

  document.title = "React Major Project | People Page";

  const navigate = useNavigate();


  const [people, setPeople] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const getPeople = async () => {
    try {
      const response = await axios.get(`person/popular?page=${page}`);
      if (response.data.results.length > 0) {
        setPeople((prev) => [...prev, ...response.data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  const refreshHandler = () => {
    if(people.length === 0) {
        getPeople();
    } else {
        setPage(1);
        setPeople([]);
        getPeople();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, []);


   return people.length > 0 ? (
    <>
      <div className="px-[5%] w-screen h-screen">
        <div className="w-full h-[10vh]  flex items-center justify-space-between">
          <h1 className="text-2xl font-semibold text-zinc-400">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] ri-arrow-left-line"
            ></i>
            People
          </h1>
          <TopNav />
        </div>
        <InfiniteScroll
          dataLength={people.length}
          next={getPeople}
          loader={<h1>Loading...</h1>}
          hasMore={hasMore}
        >
          <Cards data={people} title="people" />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default People;