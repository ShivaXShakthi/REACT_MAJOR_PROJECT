import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player'
import NotFound from './NotFound'

const Trailer = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    
    const category = pathname.includes("movie") ? "movie" : "tvshow";
    const ytvideo = useSelector(state => state[category].info.videos);
    return ( 
        <div className="bg-[rgba(0,0,0,0.9)] absolute top-0 left-0 z-[100]  w-screen h-screen">
            <Link
          onClick={() => navigate(-1)}
          className="text-3xl absoulte hover:text-[#6556CD] ri-close-fill text3xl text-white"
        ></Link>

        {ytvideo ? 
            <ReactPlayer controls height={750} width={1650} src={`https://www.youtube.com/watch?v=${ytvideo.key}`}></ReactPlayer> 
            : <NotFound/>}
        </div> 
    )
}   

export default Trailer