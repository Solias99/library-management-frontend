import React, { Component, Fragment } from 'react';
import axios from 'axios';

import AuthorItem from './AuthorItem';

import '../../styles/authors.css';

class Authors extends Component {
    state = {
        authors: []
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/v1/authors`).then(response => {
            this.setState({ authors: response.data })
        })
    }

    handleAuthorDelete = (_id) => {
        console.log(_id);
        axios.delete(`http://localhost:3000/api/v1/authors/${_id}`)
            .then(response => console.log(response.data.message))
            .catch(err => console.log(err.message));

        const { authors } = this.state;
        const data = authors.filter(author => author._id !== _id);
        this.setState({ authors: data });
    }

    render() {
        const { authors } = this.state;
        return (    
            <Fragment>
                <p className="note"><span>Note:</span> You can only remove an author if he/she has no books associated.</p>
                {authors.map((author, index) => {
                    return <AuthorItem key={index} author={author} handleAuthorDelete={this.handleAuthorDelete} />
                })}
            </Fragment>
        );
    }
}

export default Authors;