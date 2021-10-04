import DishActionTypes from "./dishes.types";
import { baseUrl } from "../../shared/baseUrl";

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true))

    return fetch(baseUrl + 'dishes')
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
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)))
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