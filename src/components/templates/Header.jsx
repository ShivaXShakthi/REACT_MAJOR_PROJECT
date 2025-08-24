import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({wallpaper}) => {
    return (
        <div style={{
            background : `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(${`https://image.tmdb.org/t/p/original/${wallpaper.backdrop_path || wallpaper.profile_path}`})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }} className="w-full h-[50vh] flex flex-col justify-end p-[10%] items-start p-5">
            <h1 className='w-[70%] text-5xl font-black text-white'>{wallpaper.name || wallpaper.original_name || wallpaper.title}</h1>
            <p className='mb-3 w-[70%] text-white mt-3'>{wallpaper.overview.slice(0,200)}...<Link to={`/${wallpaper.media_type}/details/${wallpaper.id}}`} className="text-blue-400">more</Link></p>
            <p className='text-white'>
                <i className="text-yellow-400 ri-megaphone-fill"></i>{wallpaper.release_date || "No Information"}
                <i className="text-yellow-400 ml-5 ri-album-fill"></i>{wallpaper.media_type.toUpperCase()}
            </p>
            <Link to={`/${wallpaper.media_type === "movie" ? wallpaper.media_type :   wallpaper.media_type + "shows"}/details/${wallpaper.id}/trailer`} className='bg-[#6556CD] p-4 rounded text-white font-semibold mt-5'>Watch Trailer</Link>
        </div>
    )
};

export default Header;
