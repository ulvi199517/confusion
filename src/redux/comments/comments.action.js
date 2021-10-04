import CommentActionTypes from "./comments.types";
import { baseUrl } from "../../shared/baseUrl";


export const addComment = comment => ({
    type: CommentActionTypes.ADD_COMMENT,
    payload: comment
});
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        credentials: 'same-origin'
    })
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
    .then(response => dispatch(addComment(response)))
    .catch(error => {
        console.log('Post comments', error.message);
        alert('Your comment could not be posted\nError ' + error.message)
    })
}

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
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
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)))
}

export const addComments = (comments) => ({
    type: CommentActionTypes.ADD_COMMENTS,
    payload: comments
});
export const commentsFailed = errmess => ({
    type: CommentActionTypes.COMMENTS_FAILED,
    payload: errmess
});
