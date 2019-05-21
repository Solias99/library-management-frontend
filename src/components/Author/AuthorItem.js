import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AuthorItem = ({ author  }) => {
    const { name, _id, books } = author;
    console.log(books);
    return (
        <Fragment>
            <div className="author_route_list">
                <p>{name}</p>
                {books.length === 0 && <button className="author_delete">
                     <FontAwesomeIcon icon="trash-alt" />
                </button>}
                
            </div>
        </Fragment>
    );
}

export default AuthorItem;