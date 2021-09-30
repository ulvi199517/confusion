import {combineReducers, createStore} from 'redux';
import { Dishes } from './dishes/dishes.reducer';
import { Promotions } from './promotions/promotions.reducer';
import { Leaders } from './leaders/leaders.reducer';
import { Comments } from './comments/comments.reducer';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        })
        );
    return store;
}