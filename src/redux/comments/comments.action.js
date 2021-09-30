import CommentActionTypes from "./comments.types";

export const addComment = (dishId, rating, author, comment) => ({
    type: CommentActionTypes.ADD_COMMENT,
    payload: {
            dishId: dishId, 
            rating: rating, 
            author: author, 
            comment: comment
    }
});