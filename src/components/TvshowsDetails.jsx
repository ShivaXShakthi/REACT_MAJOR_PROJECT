import React, { useEffect } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncLoadTv, removeTvshowInfo } from "../store/actions/TvActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./templates/Loading";
import HorizontalCards from "./templates/HorizontalCards";
import noimage from '/noimg.png'

const TvshowsDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("tv ID:", id);
  const { info } = useSelector((state) => state.tvshow);
  console.log("tv Info from Redux Store:", info);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Dispatching asyncLoadTv with ID:", id);
    dispatch(asyncLoadTv(id));
    return () => {
      dispatch(removeTvshowInfo());
      console.log("Cleanup: tv info removed from store");
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(${`https://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path || info.detail.profile_path
        }`})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[225vh] px-[10%]"
    >
      <nav className="h-[10vh] w-full text-zinc-200 flex gap-10 items-center font text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          {" "}
          <i className="ri-external-link-line"></i>{" "}
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
        >
          {" "}
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
        >
          {" "}
          imdb{" "}
        </a>
      </nav>

      <div className="w-full flex gap-10">
        <img
          className="w-[25vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[50vh] object-cover"
          src={(info.detail.backdrop_path || info.detail.poster_path) ? `https://image.tmdb.org/t/p/original/${
            info.detail.backdrop_path || info.detail.poster_path
          }` : noimage}
          alt=""
        />

        <div className="content text-white">
          <h1 className="text-5xl font-black ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.original_title}
            <span className="text-xl font-bold text-zinc-300">
              {info.detail.first_air_date.split("-")[0]}
            </span>
          </h1>

          <div className="mt-3 mb-10 flex  items-center gap-2">
            <span className="rounded-full text-xl font-semibold bg-yellow-600  w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="font-semibold text-2xl w-[60px] leading-6">
              User score
            </h1>
            <h1 className="">{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className=" text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className=" text-xl font-semibold  mb-3 mt-5">Overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className=" text-xl font-semibold  mb-3 mt-5">
            Movie Translated
          </h1>
          <p className="mb-5">{info.translations.join(", ")}</p>

          <Link
            className="py-4 px-10 bg-[#6556CD] rounded-lg"
            to={`${pathname}/trailer`}
          >
            <i className="text-xl ri-play-fill mr-3"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      <div className="w-[80%] flex-col gap-10 mt-10">
        {info.watchProviders && info.watchProviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on flatrate</h1>
            {info.watchProviders.flatrate.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-[7vh] h-[7vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on rent</h1>
            {info.watchProviders.rent.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-[7vh] h-[7vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchProviders && info.watchProviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available to buy</h1>
            {info.watchProviders.buy.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-[7vh] h-[7vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}
      </div>

      <hr className="border-none h-[1px] bg-zinc-300 mt-5" />

      <h1 className="text-3xl font-bold text-white mt-10">
        Seasons
      </h1>
      <div className="w-[100%] flex overflow-y-hidden mb-5 p-5 gap-5">
        {info.detail.seasons.length > 0 ? info.detail.seasons.map((season, index) => {
          return (
            <div key={index}>
              <img className="w-[25vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover" src={season.poster_path ? `https://image.tmdb.org/t/p/original/${season.poster_path}` : noimage} alt="" />
              <h1 className="text-2xl text-zinc-200 font-semibold">{season.name}</h1>
            </div>
          )
        }) : <h1 className="text-3xl text-white font-black text-center mt-5">No Data Found</h1>}
        </div>




      <h1 className="text-3xl font-bold text-white mt-10">
        Recommendations and Similar Stuff
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      ></HorizontalCards>

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvshowsDetails;
