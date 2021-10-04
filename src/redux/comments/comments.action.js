import CommentActionTypes from "./comments.types";
import { baseUrl } from "../../shared/baseUrl";


export const addComment = (dishId, rating, author, comment) => ({
    type: CommentActionTypes.ADD_COMMENT,
    payload: {
            dishId: dishId, 
            rating: rating, 
            author: author, 
            comment: comment
    }
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
}

export const addComments = (comments) => ({
    type: CommentActionTypes.ADD_COMMENTS,
    payload: comments
});
export const commentsFailed = errmess => ({
    type: CommentActionTypes.COMMENTS_FAILED,
    payload: errmess
});
