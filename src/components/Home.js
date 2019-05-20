import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Card from './Card';


class Home extends Component {
    state = {
        books: []  
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/books")
        .then(response => {
            this.setState({ books: response.data })
        })
        .catch(err => console.log(err));
    }

    render() {
        const { books } = this.state;
        console.log(books);
        return (
            <Fragment>
                 <div className="card-section">
                {books.map((book,index) => {
                    return <Link key={index} style={{ textDecoration: 'none' }} to={{
                        pathname: `/book/${book._id}`,
                        state: {
                            book
                        }
                    }}><Card book={book} /></Link>
                })}
                </div>
            </Fragment>
        );
    }
}
export default Home;
