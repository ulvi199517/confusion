import PromotionActionTypes from "./promotions.types";
import { baseUrl } from "../../shared/baseUrl";

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true))

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promotions => dispatch(addPromotions(promotions)))
}

export const promosLoading = () => ({
    type: PromotionActionTypes.PROMOS_LOADING
});
export const addPromotions = (promos) => ({
    type: PromotionActionTypes.ADD_PROMOS,
    payload: promos
});
export const promosFailed = errmess => ({
    type: PromotionActionTypes.PROMOS_FAILED,
    payload: errmess
});
