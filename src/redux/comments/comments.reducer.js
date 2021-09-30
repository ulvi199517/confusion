import {COMMENTS} from '../../shared/comments.data';
import CommentActionTypes from './comments.types';

export const Comments = (state = COMMENTS, action) => {
    switch(action.type) {
        case CommentActionTypes.ADD_COMMENT:
            let comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return state.concat(comment);
        default:
            return state;
    }
} 