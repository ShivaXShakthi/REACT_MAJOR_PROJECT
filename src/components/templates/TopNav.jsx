import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import { useEffect } from "react";
import noimg from "../../../public/noimg.png"
const TopNav = () => {
  const [query, setQuery] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const getSearches = async () => {
    try {
        if(!query || query.length <= 0){
            setSearchResults([]);
            return;
        }
      const response = await axios.get("/search/multi?query=${query}");
      console.log("Top nav ", response.data.results);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error fetching searches:", error);
    }
  };

  useEffect(() => {
    getSearches();
  },[query]);

  return (
    <>
      <div className="w-full h-[10vh] realtive flex justify-start items-center">
        <i className="text-3xl text-zinc-400 ri-search-line"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query ? query : ""}
          className="w-[50%] text-zinc-200 p-5 mx-10 text-xl border-none outline-none bg-transparent"
          type="text"
          placeholder="search anything..."
        />
        {query && (
          <i
            onClick={() => {
              setQuery(null);
            }}
            className="text-3xl text-zinc-400 ri-close-fill cursor-pointer"
          ></i>
        )}

        <div className="absolute z-[100] w-[40%] max-h-[50vh] bg-zinc-200 top-[8%] overflow-auto rounded">
          {
            (searchResults && searchResults.length > 0) ? searchResults.map((result,index) => {
                return (
                    <Link to={`${result.media_type}/details/${result.id}`} key={index} className="hover:text-black hover:bg-zinc-300 duration-300 font-semi-bold text-zinc-600  w-[100%] p-6 flex items-center justify-start border-b-2 border-zinc-100">
                        <img className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg" src={ result.backdrop_path || result.profile_path ? `https://image.tmdb.org/t/p/original/${result.backdrop_path || result.profile_path}` : noimg } alt="" />
                        <span>{result.name || result.original_name || result.title}</span>
                    </Link>
                )
            }) : null
          }
        </div>
        
      </div>
    </>
  );
};

export default TopNav;
