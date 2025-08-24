import axios from "../../utils/axios";
import { loadTvshowInfo } from "../reducers/TvshowSlice";
export { removeTvshowInfo } from "../reducers/TvshowSlice";

export const asyncLoadTv = (id) => async (dispatch,getState) =>  {
    try{
        console.log("inside tv action");
        let tvId = `/tv/${id}`
        const detail =  await axios.get(tvId);
        const externalId =  await axios.get(`${tvId} + /external_ids`);
        const recommendations = await axios.get(`${tvId}/recommendations`);
        const similar = await axios.get(`${tvId}/similar`);
        const videos = await axios.get(`${tvId}/videos`);
        const watchProviders = await axios.get(`${tvId}/watch/providers`);
        const translations = await axios.get(`${tvId}/translations`);
        let completeDetails = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations.map(t => t.english_name),
            videos: videos.data.results.find((m) => m.type === "Trailer"),
            watchProviders: watchProviders.data.results.IN
        };
        console.log("Complete tv Details:", completeDetails);
        dispatch(loadTvshowInfo(completeDetails));
    } catch(e) {
        console.error("Error loading tv:", e);
    }
}