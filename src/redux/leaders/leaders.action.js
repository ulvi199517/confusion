import LeaderActionTypes from "./leaders.types";
import { baseUrl } from "../../shared/baseUrl";

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true))

    return fetch(baseUrl + 'leaders')
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
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
