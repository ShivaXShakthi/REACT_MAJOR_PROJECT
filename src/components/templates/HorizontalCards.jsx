import React from "react";
import { Link } from "react-router-dom";
import noimage from '/noimg.png'

const HorizontalCards = ({ data, onCategoryChange }) => {

    return (

        


        <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
          
            {
                (data && data.length > 0) ? data.map((item, index) => {
                    return (
                        <Link to={`/${item.media_type}/details/${item.id}`} className="min-w-[15%] h-[50vh] mr-5 mb-5 bg-zinc-900" key={index} >
                            <img className="w-full  object-cover h-[55%]" src={ item.backdrop_path || item.poster_path ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.poster_path}` : noimage} alt="" />
                            <div className="text-white p-3 h-[45%] overflow-y-auto">
                                <h1 className="text-xl font-semibold mt-3">{item.title || item.name || item.original_name || item.original_title}</h1>
                                <p className='mb-3 mt-3'>{item.overview && item.overview.slice(0,50)}...<span className="text-zinc-500">more</span></p>
                            </div>
                        </Link>
                    );  
                }) : <h1 className="text-3xl text-white font-black text-center mt-5">No Data Found</h1>
            }

        </div>
    );
};

export default HorizontalCards;
