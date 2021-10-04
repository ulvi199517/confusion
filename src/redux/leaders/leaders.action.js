import LeaderActionTypes from "./leaders.types";
import { baseUrl } from "../../shared/baseUrl";

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true))

    return fetch(baseUrl + 'leaders')
    .then(response => {
        if(response.ok) {
            return response;
        } else {
            let error = new Error('Error' + response.status + ': ' + response.statusText)
            error.response = response;
            throw error;
        }
    }, error => {
        let errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
    type: LeaderActionTypes.LEADERS_LOADING
});
export const addLeaders = (leaders) => ({
    type: LeaderActionTypes.ADD_LEADERS,
    payload: leaders
});
export const leadersFailed = errmess => ({
    type: LeaderActionTypes.LEADERS_FAILED,
    payload: errmess
});
