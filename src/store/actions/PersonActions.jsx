import axios from "../../utils/axios";
import { loadPersonInfo } from "../reducers/PersonSlice";
export { removePersonInfo } from "../reducers/PersonSlice";

export const asyncLoadPerson = (id) => async (dispatch,getState) =>  {
    try{
        console.log("inside person action");
        let tvId = `/person/${id}`
        const detail =  await axios.get(tvId);
        const externalId =  await axios.get(`${tvId} + /external_ids`);
        const combinedCredits =  await axios.get(`${tvId} + /combined_credits`);
        const tvCredits =  await axios.get(`${tvId} + /tv_credits`);
        const movieCredits =  await axios.get(`${tvId} + /movie_credits`);
        let completeDetails = {
            detail: detail.data,
            externalId: externalId.data,
            combinedCredits: combinedCredits.data,
            tvCredits: tvCredits.data,
            movieCredits: movieCredits.data
        };
        console.log("Complete person Details:", completeDetails);
        dispatch(loadPersonInfo(completeDetails));
    } catch(e) {
        console.error("Error loading person:", e);
    }
}