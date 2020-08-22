import $ from 'jquery';
import 'normalize.css';
import './index.css';

import api from './api.js';
import store from './store.js';
import bm from './bookmark.js';


function main(){
    console.log("hello");
    api.getItems()
    .then((items) => {
      items.forEach(function(item){
        item.expanded = false;
        item.rating = 3; 
        store.addBookmark(item);
      });
      bm.render();
    });

    
    bm.render();
    console.log(store.list.bookmarks);
    bm.bindEventListeners();
} 

$(main);