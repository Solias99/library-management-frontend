import React, { Fragment } from 'react';
import axios from 'axios';

import '../../styles/author.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Author = (props) => {
    const { author } = props.location.state;
    const { name, twitter, profilePicture, books } = author;

    return ( 
        <Fragment>
            <div className="author_container">
                <h3>{name}</h3>
                <a href={twitter} target="_blank">
                    <div className="twitter_flex">
                    <FontAwesomeIcon icon={['fab', 'twitter']} className="twitter_icon"/>
                    <a href={`https://twitter.com/${twitter}`} target="_blank">{twitter}</a>
                    </div>
                </a>
            {/* <img src={`data:image/png;base32,${profilePicture.data}`} /> */}
            </div>
        </Fragment>
    );
}

export default Author;