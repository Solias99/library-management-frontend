import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from './Card';


class Home extends Component {
    state = {
        books: [],
        query: '',
        filtered: [],
        success: '',
        error: '',
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/books")
        .then(response => {
            this.setState({ books: response.data, filtered: response.data })
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

    handleInputChange = (event) => {
        const query = event.target.value;
        console.log(query);
        this.setState(prevState => {
            const filteredData = prevState.books.filter(element => {
              return element.title.toLowerCase().includes(query.toLowerCase()) || element.summary.toLowerCase().includes(query.toLowerCase()) || element.isbn.toLowerCase().includes(query.toLowerCase());
            });
      return {
        query,
        filtered: filteredData
      };
    });
    }

    render() {
        const { books, success, error, query, filtered } = this.state;
        return (
            <Fragment>
                <div className="search">
                    <input type="text" className="search_bar" value={query} placeholder="Search..." onChange={this.handleInputChange} />

                    <FontAwesomeIcon icon="search" className="search_icon" />
                </div>
                 <div className="card-section">
                {filtered.map((book,index) => {
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
