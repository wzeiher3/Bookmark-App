/*User Stories:
As a user:

I can see a list of my bookmarks when I first open the app
add a default bookmark to google*
All bookmarks in the list default to a "condensed" view showing only title and rating
I can click on a bookmark to display the "expanded" view

I can add bookmarks to my bookmark list via displaying add bookmark state when
NewBookmark button is clicked. Bookmarks contain:

title
url link
description
rating (1-5)

Detailed view expands to display description and a "Visit Site" link

I can delete bookmarks from my bookmark list (in expanded view add delete functionality)

I receive appropriate feedback when I cannot submit a bookmark(if there are errors, throw the error to a modal on screen)

Check all validations in the API documentation (e.g. title and url field required)
I can select from a dropdown (a <select> element) a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection
*/
import $ from 'jquery';
import './styles.css';
import list from './bookmarks';

const main = function () {
    list.initialize();
    list.bindEventListeners();
    // list.render();
  };
  
  $(main);
  