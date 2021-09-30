import {DISHES} from '../shared/dishes.data'
import {PROMOTIONS} from '../shared/promotions.data';
import {LEADERS} from '../shared/leaders.data';
import {COMMENTS} from '../shared/comments.data';

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    leaders: LEADERS,
    promotions: PROMOTIONS
}
export const Reducer = (state = initialState, action) => {
    return state;
}