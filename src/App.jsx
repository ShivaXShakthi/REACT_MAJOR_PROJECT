import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Trending from "./components/Trending"
import Popular from "./components/Popular"
import Movies from "./components/Movies"
import Tvshows from "./components/Tvshows"
import People from "./components/People"
import Moviedetails from "./components/Moviedetails"
import Persondetails from "./components/Persondetails"
import Trailer from "./components/templates/Trailer"
import NotFound from "./components/templates/NotFound"
import TvshowsDetails from "./components/TvshowsDetails"


function App() {
  //IFIE24, 6556CD
  return (
    <>
      <div className="bg-[#1F1E24] w-screen h-full flex">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/trending" element={<Trending/>}/>
          <Route path="/popular" element={<Popular/>}/>
          <Route path="/movie" element={<Movies/>}/>
          <Route path="/movie/details/:id" element={<Moviedetails/>}>
             <Route path="/movie/details/:id/trailer" element={<Trailer/>}></Route>
          </Route>
          <Route path="/tvshows" element={<Tvshows/>}/>
          <Route path="/tvshows/details/:id" element={<TvshowsDetails/>}>
            <Route path="/tvshows/details/:id/trailer" element={<Trailer/>}></Route>
          </Route>

          <Route path="/people" element={<People/>}/>
          <Route path="/people/details/:id" element={<Persondetails/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
