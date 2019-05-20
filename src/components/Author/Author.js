import React, { Fragment } from 'react';
import axios from 'axios';

const Author = (props) => {
    const { author } = props.location.state;
    const { name, twitter, profilePicture, books } = author;

    return ( 
        <Fragment>
            <h3>{name}</h3>
            <p>{twitter}</p>
            {/* <img src={`data:image/png;base32,${profilePicture.data}`} /> */}
            {!books && <button>Delete</button>}
        </Fragment>
    );
}

export default Author;