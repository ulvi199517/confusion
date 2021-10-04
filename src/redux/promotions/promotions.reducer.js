import PromotionActionTypes from './promotions.types';

export const Promotions = (state = {isLoading: true,errMess: null,promotions: []}, action) => {
    switch(action.type) {
        case PromotionActionTypes.ADD_PROMOS:
            return {
                ...state,
                isLoading: false, errMess: null, promotions: action.payload
            }
        case PromotionActionTypes.PROMOS_LOADING:
            return {
                ...state,
                isLoading: true, errMess: null, promotions: []
            }
        case PromotionActionTypes.PROMOS_FAILED:
            return {
                ...state,
                isLoading: false, errMess: action.payload, promotions: []
            }
        default:
            return state;
    }
} 