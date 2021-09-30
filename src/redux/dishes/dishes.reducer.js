// import {DISHES} from '../../shared/dishes.data'
import DishActionTypes from "./dishes.types";

export const Dishes = (state = {isLoading: true,errMess: null,dishes: []}, action) => {
    switch(action.type) {
        case DishActionTypes.ADD_DISHES:
            return {
                ...state,
                isLoading: false, errMess: null, dishes: action.payload
            }
        case DishActionTypes.DISHES_LOADING:
            return {
                ...state,
                isLoading: true, errMess: null, dishes: []
            }
        case DishActionTypes.DISHES_FAILED:
            return {
                ...state,
                isLoading: false, errMess: action.payload, dishes: []
            }
        default:
            return state;
    }
} 