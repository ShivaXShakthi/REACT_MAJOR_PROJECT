import axios from "../../utils/axios";
import { loadMovieInfo } from "../reducers/MovieSlice";
export { removeMovieInfo } from "../reducers/MovieSlice";

export const asyncLoadMovie = (id) => async (dispatch,getState) =>  {
    try{
        console.log("inside movie action");
        let movieId = `/movie/${id}`
        const detail =  await axios.get(movieId);
        const externalId =  await axios.get(`${movieId} + /external_ids`);
        const recommendations = await axios.get(`${movieId}/recommendations`);
        const similar = await axios.get(`${movieId}/similar`);
        const videos = await axios.get(`${movieId}/videos`);
        const watchProviders = await axios.get(`${movieId}/watch/providers`);
        const translations = await axios.get(`${movieId}/translations`);
        let completeDetails = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations.map(t => t.english_name),
            videos: videos.data.results.find((m) => m.type === "Trailer"),
            watchProviders: watchProviders.data.results.IN
        };
        console.log("Complete Movie Details:", completeDetails);
        dispatch(loadMovieInfo(completeDetails));
    } catch(e) {
        console.error("Error loading movie:", e);
    }
}