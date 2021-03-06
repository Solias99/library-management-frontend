import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faCheck, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

import Home from './components/Home';
import AddAuthor from './components/Author/AddAuthor';
import AddBook from './components/Book/AddBook';
import Author from './components/Author/Author';
import Book from './components/Book/Book';
import Authors from './components/Author/Authors';

import './styles/main.css';

library.add(faTrashAlt, faTwitter, faCheck, faSearch);


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
              <Link to="/authors" style={{ textDecoration: 'none' }}>
                <li>Authors</li>
              </Link>
            </ul>

            <Route exact path="/" component={Home} />
            <Route path="/authors" component={Authors} />
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
