import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

import Home from './components/Home';
import AddAuthor from './components/Author/AddAuthor';
import AddBook from './components/Book/AddBook';
import Author from './components/Author/Author';
import Book from './components/Book/Book';

import './styles/main.css';

library.add(faTrashAlt, faTwitter, faCheck);


class App extends Component {
  render() {
    return (
        <Router>
          <Fragment>
            {/* Header */}
            <Link 
            to="/" 
            style={{ textDecoration: 'none' }}
            >
              <h1 className="header">House of Words</h1>
            </Link>

            <ul className="links">
              <Link to="/add-author" style={{ textDecoration: 'none' }}><li>Add an Author</li></Link>
              <Link to="/add-book" style={{ textDecoration: 'none' }}><li>Add a Book</li></Link>
            </ul>

            <Route exact path="/" component={Home} />
            <Route path="/add-author" component={AddAuthor} />
            <Route path="/add-book" component={AddBook} />
            <Route path="/book/:id" component={Book} />
            <Route path="/author/:id" component={Author} />
          </Fragment>
        </Router>
    );
  }
}

export default App;
