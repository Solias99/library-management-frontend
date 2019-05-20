import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Book = (props) => {
    const { book } = props.location.state;
    const { authors, created, isbn, summary, title } = book;
    console.log(book);
    return (
        <Fragment>
            <h3>{title}</h3>
            <p>{created}</p>
            <p>{isbn}</p>
            <p>{summary}</p> 
            <ul>
                {authors.map((author,index) => {
                    return <li>
                    <Link
                        key={index}
                        to={{
                            pathname: `/author/${author._id}`,
                            state: {
                                author
                            }
                        }}
                     >
                     {author.name}
                     </Link>
                     </li>
                })}  
            </ul>         
        </Fragment>
    );
}

export default Book;