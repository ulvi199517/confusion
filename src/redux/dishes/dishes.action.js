import DishActionTypes from "./dishes.types";
import { baseUrl } from "../../shared/baseUrl";

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true))

    return fetch(baseUrl + 'dishes')
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
}
export const dishesLoading = () => ({
    type: DishActionTypes.DISHES_LOADING
})
export const dishesFailed = (errmess) => ({
    type: DishActionTypes.DISHES_FAILED,
    payload: errmess
})
export const addDishes = (dishes) => ({
    type: DishActionTypes.ADD_DISHES,
    payload: dishes
})