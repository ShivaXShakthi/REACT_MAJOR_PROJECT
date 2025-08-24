import { Link } from "react-router-dom";

const SideNav = () => {



    return (
        <>
            <div className="w-[20%] h-screen border-r-2 border-zinc-400 p-10">
                <h1 className="text-2xl font-bold text-white">
                    <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
                    <span>SCSDB</span>
                </h1>
                <nav className="flex flex-col text-zinc-400 text-xl gap-3">
                    <h1 className="text-white font-semibold text-xl mt-10 mb-5">New Feeds</h1>
                    <Link to="/trending" className="hover:bg-[#6556CD] rounded-lg p-3 text-white duration-300"><i className="mr-2 ri-fire-fill"></i>Trending</Link>
                    <Link to="/popular" className="hover:bg-[#6556CD] rounded-lg p-3 text-white duration-300"><i className="mr-2 ri-bard-fill"></i>Popular</Link>
                    <Link to="/movie" className="hover:bg-[#6556CD] rounded-lg p-3 text-white duration-300"><i className="mr-2 ri-film-fill"></i>Movies</Link>
                    <Link to="/tvshows" className="hover:bg-[#6556CD] rounded-lg p-3 text-white duration-300"><i className="mr-2 ri-tv-2-fill"></i>Tv shows</Link>
                    <Link to="/people" className="hover:bg-[#6556CD] rounded-lg p-3 text-white duration-300"><i className="mr-2 ri-team-fill"></i>People</Link>
                </nav>

                <hr className="mt-2 border-none h-[1px] bg-zinc-400" />

                <nav className="flex flex-col text-zinc-400 text-xl gap-3">
                    <h1 className="text-white font-semibold text-xl mt-10 mb-5">Website Information</h1>
                    <Link className="hover:bg-[#6556CD] rounded-lg p-3 text-white duration-300"><i className="mr-2 ri-information-2-fill"></i>About</Link>
                    <Link className="hover:bg-[#6556CD] rounded-lg p-3 text-white duration-300"><i className="mr-2 ri-phone-fill"></i>Contact Us</Link>
                </nav>
            </div>
        </>
    )
}

export default SideNav;