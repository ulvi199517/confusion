import {baseUrl} from '../../shared/baseUrl';

export const postFeedback = (feedback) => (dispatch) => {
       return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(feedback),
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
    .then(response => {
        console.log('Feedback', response);
        alert('Thank you for your feedback\n' + JSON.stringify(response));
    })
    .catch(error => {
        console.log('Post comments', error.message);
        alert('Your comment could not be posted\nError ' + error.message)
    })
}