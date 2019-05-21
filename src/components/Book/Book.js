import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../styles/book.css';

import EditBookModal from './EditBookModal';


const Book = (props) => {
    const { book } = props.location.state; 
    const { authors, created, isbn, summary, title } = book;
    return (
        <Fragment>
            <div className="book_container">
                <div className="book_subcontainer">
                    <h3>{title}</h3>
                </div>

                <div className="book_subcontainer">
                    <p className="book_subtitle">Created On:</p>
                    <p> {created.substring(0,10)}</p>
                </div>

                <div className="book_subcontainer">
                    <p className="book_subtitle">ISBN:</p>
                    <p>{isbn}</p>
                </div>

                <div className="book_subcontainer">
                    <p className="book_subtitle">Summary</p>
                    <p>{summary}</p> 
                </div>

                <ul className="book_author_list">
                    <li className="book_subtitle">Authors: </li>
                    {authors.map((author,index) => {
                        return <li key={index}>
                        <FontAwesomeIcon icon="check" className="check_icon" />
                        <Link
                            to={{
                                pathname: `/author/${author._id}`,
                                state: {
                                    author
                                }
                            }}
                            className="book_author_item"
                        >
                        {author.name}
                        </Link>
                        </li>
                    })}  
                </ul>
                <EditBookModal book={book}/>     
            </div>    
        </Fragment>
    );
}

export default Book;