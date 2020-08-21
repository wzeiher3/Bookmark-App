# mark-force-bookmarks-app
Bookmarks application for Thinkful
I built this application for the Thinkful bootcamp Engineering Immersion program.
The user stories were completed and the details are below.
The functionality is limited as servers are wiped every 24 hours, but you can add bookmarks as well as delete them, and sort them by the user-applied rating.


USER STORIES:
As a user:

I can add bookmarks to my bookmark list. Bookmarks contain:
(completed)
title
url link
description
rating (1-5)
(completed)
I can see a list of my bookmarks when I first open the app
(completed, main renders on load)

All bookmarks in the list default to a "condensed" view showing only title and rating
I can click on a bookmark to display the "detailed" view
(completed, all bookmarks condense and expand with mouse and keyboard)

Detailed view expands to additionally display description and a "Visit Site" link
I can remove bookmarks from my bookmark list
(completed, detailed view shows delete button to remove bookmark)

I receive appropriate feedback when I cannot submit a bookmark
(the appropiate error message pops up as a modal to let user know about the error, clicking anywhere else closes modal)

Check all validations in the API documentation (e.g. title and url field required)
I can select from a dropdown (a <select> element) a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection
(completed, the dropdown menu filters the displayed bookmarks by minimum rating)
