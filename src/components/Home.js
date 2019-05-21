import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Card from './Card';


class Home extends Component {
    state = {
        books: [],
        success: '',
        error: ''  
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/books")
        .then(response => {
            this.setState({ books: response.data })
        })
        .catch(err => console.log(err));
    }

    handleBookDelete = (_id) => {
        axios.delete(`http://localhost:3000/api/v1/books/${_id}`)
        .then(response => this.setState({ success: response.data.message }))
        .catch(err => this.setState({ error: err.message}));

        console.log(_id);
        const { books } = this.state;
        const data = books.filter(book => book._id !== _id);
        this.setState({ books: data });
    }

    render() {
        const { books, success, error } = this.state;
        console.log(books);
        return (
            <Fragment>
                 <div className="card-section">
                {books.map((book,index) => {
                    return <Card key={index} book={book} handleBookDelete={this.handleBookDelete} />
                })}
                </div>
                {error && <p className="error-notif">{error}</p>}
                {success && <p className="success-notif">{success}</p>}
            </Fragment>
        );
    }
}
export default Home;
