import DishActionTypes from "./dishes.types";
import {DISHES} from '../../shared/dishes.data';

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true))

    setTimeout(() => {
        dispatch(addDishes(DISHES))
    }, 2000);
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