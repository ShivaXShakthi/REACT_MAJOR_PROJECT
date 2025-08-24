import React, { useEffect } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  asyncLoadPerson,
  removePersonInfo,
} from "../store/actions/PersonActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./templates/Loading";
import HorizontalCards from "./templates/HorizontalCards";
import noimage from "/noimg.png";
import DropDown from "./templates/DropDown";

const Persondetails = () => {
    const [category, setCategory] = React.useState("movie");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("person ID:", id);
  const { info } = useSelector((state) => state.person);
  console.log("Person Info from Redux Store:", info);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Dispatching asyncLoadPerson with ID:", id);
    dispatch(asyncLoadPerson(id));
    return () => {
      dispatch(removePersonInfo());
      console.log("Cleanup: Person info removed from store");
    };
  }, [id]);
  return info ? (
    <div className="px-[5%] w-screen h-[180vh] bg-[#1F1E24]">
      <nav className="h-[10vh] w-full text-zinc-200 flex gap-10 items-center font text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex gap-10">
        <div className="w-[30%]">
          <img
            className="w-[40vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[55vh] object-cover"
            src={
              info.detail.profile_path
                ? `https://image.tmdb.org/t/p/original/${info.detail.profile_path}`
                : noimage
            }
            alt=""
          />
          <hr className="border-none h-[1px] bg-zinc-300 mt-10" />
          <div className="text-2xl text-white flex gap-x-5">
            <a target="_blank" href={`https://en.wikipedia.org/wiki/${info.externalId.wikidata_id}`}>
              {" "}
              <i className="ri-earth-fill"></i>{" "}
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalId.facebook_id}`}
            >
              {" "}
              <i className="ri-facebook-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalId.instagram_id}`}
            >
              {" "}
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://x.com/${info.externalId.twitter_id}`}
            >
              {" "}
              <i className="ri-twitter-fill"></i>
            </a>
          </div>

            <h1 className="text-2xl text-zinc-400 font-semibold my-5">Person Info : </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">Known For : </h1>
            <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>

            <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender : </h1>
            <h1 className="text-zinc-400">{info.detail.gender === 2 ? "Male" : "Female"}</h1>

            <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday : </h1>
            <h1 className="text-zinc-400">{info.detail.birthday}</h1>

            <h1 className="text-lg text-zinc-400 font-semibold mt-3">Deathday : </h1>
            <h1 className="text-zinc-400">{info.detail.deathday ? info.detail.deathday : "Still alive"}</h1>

            <h1 className="text-lg text-zinc-400 font-semibold mt-3">Place of Birth : </h1>
            <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>


            <h1 className="text-lg text-zinc-400 font-semibold mt-3">Also known as : </h1>
            <h1 className="text-zinc-400">{info.detail.also_known_as.join(", ")}</h1>

        </div>
        <div className="w-[70%]">
            <h1 className="text-6xl text-zinc-400 font-black my-5">{info.detail.name} </h1>
            <h1 className="text-xl text-zinc-400 font-semibold ">Biography : </h1>
            <p className="text-zinc-400 mt-5">{info.detail.biography}</p>


            <h1 className="text-lg text-zinc-400 font-semibold mt-5 ">Known For : </h1>
            <HorizontalCards data={info.combinedCredits.cast} title={"person"} />

            <div className="w-full flex justify-between">
                <h1 className="text-xl text-zinc-400 font-semibold mt-5 ">Acting : </h1>
                <DropDown title="category" options={["tv", "movie" ]} onCategoryChange={(e) => setCategory(e.target.value)} /> 
            </div>

            <div className="w-full text-zinc-400 h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5">
                {info[category+ "Credits"].cast.map((d,i) =>
                    (<li key={i} className="hover:text-white p-5 duration-300 cursor-pointer">
                        <Link to={`/${category === "tv" ? "tvshows" : category }/details/${d.id}`} className="">
                            <span>{" "} {d.name || d.title || d.original_name || d.original_title}</span>
                            <span className="block ml-5 mt-3">Character Name : {d.character}</span>
                        </Link>
                </li>) 
            )}
                


            </div>


        </div>
      </div>

      
    </div>
  ) : (
    <Loading />
  );
};

export default Persondetails;
