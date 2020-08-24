import store from './store.js';
import $ from 'jquery';
import api from './api.js';
import cuid from 'cuid';

function renderFilter(){
    $('main').html(` 
    
    <button class="Btns" type="submit" id="addNew">Add New</button>
    <button type="submit" id="filter" class="Btns">Filter</button>
    <div class="filterbtns">
        <input type="radio" name="choice" id="1star"> 1<span id="Fstar">&#9733;</span>
        <input type="radio" name="choice" id="2stars"> 2 <span id="Fstar">&#9733;</span>
        <input type="radio" name="choice" id="3stars"> 3 <span id="Fstar">&#9733;</span>
        <input type="radio" name="choice" id="4stars"> 4 <span id="Fstar">&#9733;</span>
        <input type="radio" name="choice" id="5stars"> 5 <span id="Fstar">&#9733;</span>
    </div>

    <ul class="bookmarks js-bookmarks">
    </ul>
`)

//bindEventListeners();

}

function filter(){
    console.log('filter');
    $('main').on('click', '#filter', function(event){
    //$('#filter').click(function(event){
        event.preventDefault();
        alert('checked');
    if(document.getElementById('1star').checked)
        store.list.filter = 1;
    else if(document.getElementById('2stars').checked)
        store.list.filter = 2;
    else if(document.getElementById('3stars').checked)
        store.list.filter = 3;
    else if(document.getElementById('4stars').checked)
        store.list.filter = 4;
    else if(document.getElementById('5stars').checked)
        store.list.filter = 5;
    else
        store.list.filter = 0;

    console.log(store.list.filter);
    render();
    // <span>&#9733;</span>
    // span {
    //     content: "\2605";
    //   }
   })
}


function generateBookmarkElement(item){
    let itemTitle = `<span class="bookmark">${item.title}</span>`;
    if (item.expanded) {
      
        return `
        <li class="js-bookmark-element_expanded" data-item-id="${item.id}">
          ${itemTitle}
          <form action="${item.url}" class="expanded-items">
            <input type="submit" value="Visit" onclick="window.location.href='${item.url}';" id="visit"/>
          </form>
          <span id="star_expanded" class="expanded-items">${item.rating}&#9733;</span>
          
          <div>
            <p>${item.desc}</p>
         </div>
        </li>`;
    }

    return `
        <li class="js-bookmark-element" data-item-id="${item.id}">
          ${itemTitle}
        <span id="star">${item.rating}&#9733;</span>
        </li>`;
}

const generateBookmarkElementString = function (bookmarks) {
    const items = bookmarks.map((item) => generateBookmarkElement(item));
    return items.join('');
  };

function render(){
    renderFilter();
    let items = store.list.bookmarks;
    console.log(store.list.bookmarks);
    if(store.list.filter > 0)
    {
        items = store.list.bookmarks.filter(function(bookmark){
            return (bookmark.rating === store.list.filter);
        })
    }
    const bookmarkElementsString = generateBookmarkElementString(items);
    $('.bookmarks').html(bookmarkElementsString);
}

function handleAddNewClick(){
    $('main').on('click', '#addNew', function(event){
        event.preventDefault();
        alert('new');
        renderNewBookmark();
    })
}

const getItemIdFromElement = function (item) {
    return $(item)
      .closest('.js-bookmark-element')
      .data('item-id');
  };

function toggleExpanded(){
    $('main').on('click', '.js-bookmark-element',function(event){
        event.preventDefault();
        alert('bookmark clicked');
        const id = getItemIdFromElement(event.currentTarget);
        console.log(id);
        console.log(store.findbyId);
        
        const item = store.findbyId(id);
        console.log(item);
        item.expanded = !(item.expanded);
        console.log(store.list.bookmarks);
        render();
    })
    $('main').on('click', '.js-bookmark-element_expanded', function(event){
        event.preventDefault();
        const id = getItemIdFromElement(event.currentTarget);
        const item = store.findbyId(id);
        console.log(item);
        alert('found');
        item.expanded = !(item.expanded);
        console.log(store.list.bookmarks);
        render();
    })
}

const renderError = function () {
    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
  };

  const generateError = function (message) {
    return `
        <section class="error-content">
          <button id="cancel-error">X</button>
          <p>${message}</p>
        </section>
      `;
  };

function renderNewBookmark(){
    console.log('new bookmark');
    $('main').html(`
        
        <h3>Add a New Bookmark</h3>
        <form class="addBookmark">
         
            <input class="bookmarkText" id="bookmarkText" type="text" value="URL" required />
        </form>
        <form class="title">
            
            <input class="bookmarkTitle" id="bookmarkTitle" type="text" value="Title" required />
        </form>
        <form class="filterbtns2">
            <input type="radio" name="choice" id="1star"> 1<span id="Fstar">&#9733;</span>
            <input type="radio" name="choice" id="2stars"> 2 <span id="Fstar">&#9733;</span>
            <input type="radio" name="choice" id="3stars"> 3 <span id="Fstar">&#9733;</span>
            <input type="radio" name="choice" id="4stars"> 4 <span id="Fstar">&#9733;</span>
            <input type="radio" name="choice" id="5stars"> 5 <span id="Fstar">&#9733;</span>
        </form>
        <form class="descriptionBox">
            <textarea id="descriptionBox" name="descriptionBox" rows="25" cols="25">Decription (optional) 
            </textarea>
        </form>

        <button type="submit" id="bookmarkSubmit">Submit</button>
    `)

    //bindEventListeners();
}

function handleNewBookmarkSubmit(){
    $('main').on('click', '#bookmarkSubmit', function(event){
        event.preventDefault();
        
        
        
        
        let id = cuid();
        let title = $('#bookmarkTitle').val();
        let url = $('#bookmarkText').val();
        let description = $('#descriptionBox').val();

        let rating = 0;
        
        if(document.getElementById('1star').checked)
            rating = 1;
        else if(document.getElementById('2stars').checked)
            rating = 2;
        else if(document.getElementById('3stars').checked)
            rating = 3;
        else if(document.getElementById('4stars').checked)
            rating = 4;
        else if(document.getElementById('5stars').checked)
            rating = 5;
        else
            throw new TypeError('you must select a filter');

        const newBookmark = {"id": `${id}`, "title": `${title}`, 
        "url": `${url}`, "desc": `${description}`, "rating": `${rating}`};

        console.log(newBookmark);
        //store.list.bookmarks.push(newBookmark);
        //console.log(store.list.bookmarks);
        api.createItem(newBookmark)
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        console.log('render');
        render();
      })
    //   .catch((error) => {
    //     store.setError(error.message);
    //     renderError();
    //   });
    })
}


function handleDeleteItemClicked(){
    $('main').on('click', '#visit', event => {
      const id = getItemIdFromElement(event.currentTarget);
  
      api.deleteItem(id)
        .then(() => {
          store.findAndDelete(id);
          render();
        })
    });
  };

function bindEventListeners(){
    filter();
    toggleExpanded();
    handleAddNewClick();
    handleNewBookmarkSubmit();
    handleDeleteItemClicked();
};

export default{
    bindEventListeners,
    filter, 
    renderFilter,
    generateBookmarkElement,
    render,
    renderError,
    generateBookmarkElementString, 
    renderNewBookmark
}

//$(bindEventListeners);