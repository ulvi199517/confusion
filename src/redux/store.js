import {combineReducers, createStore, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes/dishes.reducer';
import { Promotions } from './promotions/promotions.reducer';
import { Leaders } from './leaders/leaders.reducer';
import { Comments } from './comments/comments.reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms/forms.reducer';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
        );

        
    return store;
}