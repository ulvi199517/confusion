import LeaderActionTypes from './leaders.types';

export const Leaders = (state = {isLoading: true,errMess: null,leaders: []}, action) => {
    switch(action.type) {
        case LeaderActionTypes.ADD_LEADERS:
            return {
                ...state,
                isLoading: false, errMess: null, leaders: action.payload
            }
        case LeaderActionTypes.LEADERS_LOADING:
            return {
                ...state,
                isLoading: true, errMess: null, leaders: []
            }
        case LeaderActionTypes.LEADERS_FAILED:
            return {
                ...state,
                isLoading: false, errMess: action.payload, leaders: []
            }
        default:
            return state;
    }
} 