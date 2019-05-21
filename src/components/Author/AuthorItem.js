import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AuthorItem = ({ author, handleAuthorDelete }) => {
    const { name, _id, books } = author;
    console.log(books);
    return (
        <Fragment>
            <div className="author_route_container">
                <div className="author_route_list">
                    <h3>{name}</h3>
                    {books.length === 0 && <button 
                        onClick={() => handleAuthorDelete(_id)} className="author_delete">
                        <FontAwesomeIcon icon="trash-alt" />
                    </button>}
                </div>

                {books.map((book, index) => {
                    return <p key={index}>{book.title}</p>
                })}
            </div>
                
        </Fragment>
    );
}

export default AuthorItem;