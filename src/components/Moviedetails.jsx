import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncLoadMovie, removeMovieInfo } from "../store/actions/MovieActions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./templates/Loading";
import HorizontalCards from "./templates/HorizontalCards";
import noimage from '/noimg.png'

const Moviedetails = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Movie ID:", id);
  const { info } = useSelector((state) => state.movie);
  console.log("Movie Info from Redux Store:", info);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Dispatching asyncLoadMovie with ID:", id);
    dispatch(asyncLoadMovie(id));
    return () => {
      dispatch(removeMovieInfo());
      console.log("Cleanup: Movie info removed from store");
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
      className="relative w-screen h-[150vh] px-[10%]"
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
            <h1 className="text-5xl font-black ">{info.detail.name ||
                info.detail.title || 
                info.detail.original_name ||
                info.original_title}
                <span className="text-xl font-bold text-zinc-300">{info.detail.release_date.split("-")[0]}</span></h1>
        
        <div className="mt-3 mb-10 flex  items-center gap-2">
                <span className="rounded-full text-xl font-semibold bg-yellow-600  w-[5vh] h-[5vh] flex justify-center items-center">{(info.detail.vote_average*10).toFixed()} <sup>%</sup></span>
                <h1 className="font-semibold text-2xl w-[60px] leading-6">User score</h1>
                <h1 className="">{info.detail.release_date}</h1>
                <h1>{info.detail.genres.map(g => g.name).join(', ')}</h1>
                <h1>{info.detail.runtime}min</h1>
        </div>

        <h1 className=" text-xl font-semibold italic text-zinc-200">{info.detail.tagline}</h1>


        <h1 className=" text-xl font-semibold  mb-3 mt-5">Overview</h1>
        <p>{info.detail.overview}</p>


        <h1 className=" text-xl font-semibold  mb-3 mt-5">Movie Translated</h1>
        <p className="mb-5">{info.translations.join(', ')}</p>

        <Link className="py-4 px-10 bg-[#6556CD] rounded-lg" to={`${pathname}/trailer`}>
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
                <img key={index} title={w.provider_name}
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
                <img key={index} title={w.provider_name}
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
                <img key={index} title={w.provider_name}
                  className="w-[7vh] h-[7vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                />
              ))}
            </div>
          )}
      </div>

      <hr className="border-none h-[1px] bg-zinc-300 mt-5"/>

<h1 className="text-3xl font-bold text-white mt-10">Recommendations and Similar Stuff</h1>"
    <HorizontalCards data=
      {info.recommendations.length>0 ? info.recommendations : info.similar }></HorizontalCards>

<Outlet/>
    </div>
    
  ) : (
    <Loading />
  );
};

export default Moviedetails;
