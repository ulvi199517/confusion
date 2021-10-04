import PromotionActionTypes from "./promotions.types";
import { baseUrl } from "../../shared/baseUrl";

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true))

    return fetch(baseUrl + 'promotions')
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
    .then(promotions => dispatch(addPromotions(promotions)))
    .catch(error => dispatch(promosFailed(error.message)))
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
