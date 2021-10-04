import CommentActionTypes from './comments.types';

export const Comments = (state = {errmess: null, comments: [] }, action) => {
    switch(action.type) {
        case CommentActionTypes.ADD_COMMENTS:
            return {
                ...state,
                isLoading: false, errMess: null, comments: action.payload
            }
        case CommentActionTypes.COMMENTS_FAILED:
                return {
                    ...state,
                    isLoading: false, errMess: action.payload, comments: []
                }
        case CommentActionTypes.ADD_COMMENT:
            let comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            return {
                ...state, comments: state.comments.concat(comment)};
        default:
            return state;
    }
} 