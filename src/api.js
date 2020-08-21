import { data } from "jquery";

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/markf'

const listApiFetch = function(...args) {
    let error;
    return fetch(...args)
        .then(res => {
            if (!res.ok) {
                error = { code: res.status }
            
            if (!res.headers.get('content-type').includes('json')) {
                error.message = res.statusText;
                return Promise.reject(error);
            }
        }
        return res.json();
    })
    .then(data => {
        if (error) {
            error.message = data.message;
            return Promise.reject(error)
        }
        return data;
    })
};

let getBookmarks = function() {
    // console.log('bookmarks being fetched')
    return listApiFetch(`${BASE_URL}/bookmarks`);
  }

let createBookmark = function(bookmark) {
    const newBookmark = JSON.stringify(bookmark)
    return listApiFetch(BASE_URL + '/bookmarks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: newBookmark,
    })
};

const deleteBookmark = function(id) {
    return listApiFetch(BASE_URL + '/bookmarks/' + id, {
        method: 'DELETE'
    })
}

export default {
    listApiFetch,
    getBookmarks,
    createBookmark,
    deleteBookmark,
};


