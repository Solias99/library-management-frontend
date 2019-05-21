import React, { Fragment } from 'react';

import '../styles/card.css';

const Card = ({ book }) => {
    const { title, summary, isbn, authors, _id } = book;
    return (
        <Fragment>
            <div className="card">
                <h3 className="card_title">{title}</h3>
                <p className="card_summary">{summary}</p>
                <p className="card_isbn">ISBN: <span>{isbn}</span></p>
                <ul className="card_author_list">
                    {authors.map((author,index) => {
                        return <li className="card_author_name"key={index}>{author.name}</li>
                    })}
                </ul>
                <button className="card_delete">Delete</button>
            </div>
        </Fragment>
    );
}

export default Card;

