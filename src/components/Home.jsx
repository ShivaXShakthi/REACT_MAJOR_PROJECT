import { useState } from "react";
import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../utils/axios";
import { useEffect } from "react";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import DropDown from "./templates/DropDown";
import Loading from "./templates/Loading";

const Home = () => {
  document.title = "React Major Project | Home Page";

  const [wallpaper, setWallpaper] = useState(null);
  const [trendings, setTrendings] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeader = async () => {
    try {
      const response = await axios.get("/trending/all/day");
      let random =
        response.data.results[
          (Math.random() * response.data.results.length).toFixed()
        ];
      setWallpaper(random);
    } catch (error) {
      console.error("Error fetching searches:", error);
    }
  };

  const getTrendings = async () => {
    try {
      const response = await axios.get(`/trending/${category}/day`);
      setTrendings(response.data.results);
    } catch (error) {
      console.error("Error fetching searches:", error);
    }
  };

  useEffect(() => {
    getTrendings();
    !wallpaper && getHeader();
  }, [category]);

  return wallpaper ? (
    <>
      <SideNav></SideNav>
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <TopNav></TopNav>
        <Header wallpaper={wallpaper}></Header>
        <div className="flex justify-between items-center p-5">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending </h1>
          <DropDown title="Filter" options={["tv", "movie", "all"]} onCategoryChange={(e) => setCategory(e.target.value) } />
        </div>

        <HorizontalCards data={trendings} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
