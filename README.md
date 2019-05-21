## Front-end for library management system

###### Written in React.

Initially, install the packages using
`npm install`

on your local machine. Then run
`npm start`

 Make sure that React is not running on port 3000. (or anything else, for that matter, since the API should be running on 3000).

#### Design specifics

No state management libraries have been used.

The CSS is split into appropriate component-level files, all of which lie in the `styles` folder.

`App.js` has all the routes set up, along with the header.

The project is split essentially into 2 main folders, **Author** and **Book**.

AddAuthor and AddBook are used respectively as forms to make `POST` requests to the server to add data to the database. 

**Home** is the landing page, with a search bar and the list of all Books published.
The initial `/GET` call is made here to fetch all the Books with their Authors.
Each book is displayed through a common *Card* component.
The **Book** component receives props from **Card**. Via client-side routing and passing state through React Router's Link component, the book object is passed to the individual **Book** component.

State is passed down again from the Book component to the **Author** component, which displays the name and twitter handle of the Authors who have written the book.

There is also a separate **Authors** component, which maps over each author (after appropriate `/GET` request) and displays author details through **AuthorItem**.

Note: ONLY those authors who have not written a book can be deleted.

The **EditBookModal** component is used to spin up a modal on the `/book/:id` route, through which you can edit a book. 


#### Shortcomings

* Currently book remains a stateless component, and I am unable to successfully pass state up to the Home component, therefore after Editing a book, you have to refresh the page or go back to the home page to see the edited changes. (Can be resolved, potentially using `useState`) or `createPortal` to send a method down to update parent state.
* Author's profile picture not rendering. Possible workaround: change the data type of profilePicture in the backend to `String` instead of `Buffer`, to allow delivering an image through an API.


