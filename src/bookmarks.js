import $ from 'jquery';
import cuid from 'cuid';
import store from './store';
import api from './api';
import './styles.css';

function generateError(error) {
  // console.log('generating error')
  return `<div id="myModal" class="modal" aria-modal="true">
  <div class="modal-content">
   <span class="close">&#88</span>
    <p>${error}</p>
</div>
 </div>`;
};

function closeModal() {
  $('main').click('span', function() {
    console.log('x was clicked')
    $('.modal').css('display', "none");
    // render();
  })
  // $('main').click('#okBtn', function() {
  //   // event.preventDefault();
  //   console.log('ok was clicked')
  //   $('.modal').css('display', "none");
  // })
}

function renderError() {
  if (store.error) {
    let error = store.error;
    $('.modal').html(generateError(error));
    $('.modal').css('display', 'block');
  } else {
    $('.error-container').empty();
  }
};

// function handleCloseError() {
//   $('.error-container').on('click', '#cancel-error', () => {
//     store.setError(null);
//     renderError();
//   });
// };

function generateStarRating(starNum) {
  let starStr = '';
  for (let i = 0; i < 5; i++) {
    if (i < starNum) {
      starStr += '&#9733'
    } else {
      starStr += '&#9734'
    }
  }
  return starStr;
}

let generateMain = function () {
  return `<section class="upperContainer">
    <div class="newBookmark">
      <button class="buttonNew" name="buttonNB" type="button">New Bookmark</button>
    </div>
    <div class="filterBy">
      <select id="js-filter" name="filter">
        <option value="" selected="selected">Rating Filter</option>            
        <option value="1">${generateStarRating(1)}</option>
        <option value="2">${generateStarRating(2)}</option>
        <option value="3">${generateStarRating(3)}</option>
        <option value="4">${generateStarRating(4)}</option>
        <option value="5">${generateStarRating(5)}</option>                                                
      </select>
    </div>
  </section>
  <section role="tabs" class="bookmarks" aria='true'>
    <ul role="tablist" aria-label="Bookmark tabs" class="js-ulBookmarks">
      ${formBookmarkListItems()}
    </ul>
  </section>
  <div class="error-container" aria-modal="true">
          <div id="myModal" class="modal">
  <div class="modal-content">
   <span class="close">&times;</span>
    <p></p>
</div>
</div></div>  `;
}


let generateAdd = function () {
  return `<form class="addBookmarkForm">
        <fieldset name="formField">
          <label for="newBookLink">Bookmark link: </label>
          <input id="newBookLink" type="text" name="newBookLink" placeholder="http://www.newsite.com"><br>
          <br><label for="newBookNick">Site name: </label>
          <input id="newBookNick" type="text" name="newBookNick" placeholder="Nickname"><br>
          <br><label for="newBookDesc">Description: </label>
          <input id='newBookDesc' type="text" name="newBookDesc" placeholder="Description"><br>
          <br><select id="newFilter" name="addFilter">
            <option value="" selected="selected">Rating</option>            
            <option value="1">${generateStarRating(1)}</option>
            <option value="2">${generateStarRating(2)}</option>
            <option value="3">${generateStarRating(3)}</option>
            <option value="4">${generateStarRating(4)}</option>
            <option value="5">${generateStarRating(5)}</option>                                                
          </select>
          <br>
          <div class="subCancelDiv">
            <button class="buttonAddSubmit" id="submit" type="submit">Submit</button>
            <button class="buttonAddCancel" type="button">Cancel</button>
          </div>   
          <div class="error-container">
          <div id="myModal" aria-modal="true" class="modal">
  <div class="modal-content">
   <span class="close">&times;</span>
    <p></p>
</div>
</div></div>          
        </fieldset>
      </form>`;
}

let render = function () {
  //parse state instead of perimeter
  renderError();
  // let items = [...store.bookmarks];
  // if (store.toggleExpanded) {
  //   items = items.filter(item => !item.expanded)
  // }
  if (store.adding) {
    $('.js-mainWindow').html(generateAdd())
    console.log('adding now')
  } else {
    const htmlString = generateMain();
    console.log('main rendered')
    //is mainWindow the correct target?
    $('.js-mainWindow').html(htmlString);
  }
}

let initialize = function () {
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark))
      // console.log(bookmarks)
      render();
    });
}

let getId = function (bookmark) {
  return $(bookmark)
    .closest('.jsBookmarkElement')
    .data('bookmark-id')
}

let handleAdd = function () {
  $('.js-mainWindow').on('click', '.buttonNew', function () {
    //set adding equal to true
    store.adding = true;
    // console.log(store.adding)
    render();
  })
}

let handleCancelAdd = function () {
  $('.js-mainWindow').on('click', '.buttonAddCancel', function () {
    store.adding = false;
    render();
  });
}

let handleExpandCancel = function () {
  $('.js-mainWindow').on('click', '.exitExpand', function (event) {
    let id;
    id = getId(event.currentTarget);
    store.toggleExpanded(id);
    render();
  });
}

let handleExpandClick = function () {
  $('.js-mainWindow').on('click', '.jsBookmarkElement', function (event) {
    let id;
    id = getId(event.currentTarget);
    store.toggleExpanded(id);
    render();
  });
}

let handleSubmitBookmark = function () {
  $('.js-mainWindow').on('submit', '.addBookmarkForm', function (event) {
    event.preventDefault();
    let newBookmark = {
      id: cuid(),
      title: `${$(this).find('#newBookNick').val()}`,
      rating: `${$(this).find('#newFilter').val()}`,
      url: `${$(this).find('#newBookLink').val()}`,
      desc: `${$(this).find('#newBookDesc').val()}`
    };
    // console.log(newBookmark)
    api.createBookmark(newBookmark)
      .then((newBM) => {
        console.log(newBM)
        store.addBookmark(newBM);
        store.adding = false;
        render();
      })
      .catch((err) => {
        store.setError(err.message);
        renderError();
      });
  });
}
//cancel the page and render bookmark home page state
const cancelClicked = function () {
  $('js-mainWindow').on('click', '.buttonAddCancel', function () {
    store.adding = false;
    render();
  })
}

const handleDelete = function () {
  $('.js-mainWindow').on('click', '.buttonDel', function (event) {
    event.preventDefault();
    const id = getId(event.currentTarget)
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id)
        // console.log(store.bookmarks)
        render();
        // console.log(store.bookmarks)
      })
      .catch((error) => {
        store.setError(error.message)
        render();
      })
  })

}

let handleFilterSelection = function () {
  $('.js-mainWindow').on('change', '#js-filter', function () {
    let filter = $(this).val();
    store.setFilter(filter);
    render();
  })
}

let handleErrorButtonEmpty = function () {
  $('.js-mainWindow').on('click', '#cancelError', function () {
    store.clearError();
    render()
  })
}

let formBookmarkListItems = function () {
  let itemString = '';
  console.log(store.bookmarks)
  store.bookmarks.forEach(function (bookmark) {
    if (bookmark.rating >= store.filter) {
      if (bookmark.expanded) {
        itemString += `<li class="jsBookmarkElement" data-bookmark-id="${bookmark.id}">${bookmark.title}
              <p>Visit Site: <a  target="_blank" href=${bookmark.url}>${bookmark.url} </a></p>
              <p>Rating: ${generateStarRating(bookmark.rating)}</p>
              <p>${bookmark.desc}</p>
              <div class="deleteBookmark">
                <label for="buttonDelete">Delete/Collapse</label>
                <button class="buttonDel" name="buttonDelete" type="button">Delete</button>
                <button class="exitExpand" name="exitExpanded" type="button">Collapse</button>
            </div>                    
          </li>`
      }
      else {
        itemString += `<button class="jsBookmarkElement" data-bookmark-id="${bookmark.id}">
                               <span class="stars">${generateStarRating(bookmark.rating)}</span>
                               ${bookmark.title}
                             </button>`;
      }
    }
  })
  return itemString;
}

// const render = function() {
//     renderError();
//     let items = [...store.bookmarks];
//     // if (store.filter) {
//     //     items = items.filter(item => !item.expanded);
//     // } filter items by 

//     const bookmarkString = generateBookmarkString(items);
//     $('.js-bookmarks-list').on('click')
// }

let bindEventListeners = function () {
  handleAdd();
  handleExpandClick();
  handleSubmitBookmark();
  cancelClicked();
  handleDelete();
  handleFilterSelection();
  handleErrorButtonEmpty();
  handleCancelAdd();
  closeModal();
  // handleExpandCancel();
}

export default {
  initialize,
  bindEventListeners,
  render,
}


