import React from "react";
import { Link } from "react-router-dom";
import noimage from '/noimg.png'

const Cards = ({data, title}) => {

    return(
    <div className="flex flex-wrap flex-shrink-0 gap-5 w-full h-full p-15 bg-[#1F1E24]">
    {data.map((d,i) =>  (
        <Link to={`/${d.media_type || title}/details/${d.id}`} className="relative w-[25vh] text-white text-2xl" key={i}>
            <img className="w-[25vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover" 
            src={ (d.backdrop_path || d.poster_path || d.profile_path )  ? 
                `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path || d.profile_path}`
                : noimage
            }
            alt="" />
            
            <h1 className="text-2xl text-zinc-200 font-semibold">{d.name || d.original_name || d.original_title || d.title}</h1>
            {d.vote_average && <div className="absolute right-[-10%] bottom-[25%] rounded-full text-xl font-semibold bg-yellow-600 text-white w-[5vh] h-[5vh] flex justify-center items-center">{(d.vote_average*10).toFixed()} <sup>%</sup></div>}
            
        </Link>

    ))}
    </div>
    );

  
};


    

export default Cards;
