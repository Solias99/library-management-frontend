import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import '../styles/card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Card = ({ book, handleBookDelete }) => {
    const { title, summary, isbn, authors, _id } = book;


    return (
        <Fragment>
            <div className="card">
                <Link style={{ textDecoration: 'none' }} to={{
                        pathname: `/book/${_id}`,
                        state: {
                            book,
                        }
                    }}><h3 className="card_title">{title}</h3>
                    </Link>
                <p className="card_summary">{summary}</p>
                <p className="card_isbn">ISBN: <span>{isbn}</span></p>
                <ul className="card_author_list">
                    {authors.map((author,index) => {
                        return <li className="card_author_name" key={index}>{author.name}</li>
                    })}
                </ul>
                <button className="card_delete"
                        onClick={() => handleBookDelete(_id)}>
                     <FontAwesomeIcon icon="trash-alt" />
                </button>
            </div>
        </Fragment>
    );
}

export default Card;

