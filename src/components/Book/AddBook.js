import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import _ from 'lodash/core';
import axios from 'axios';


import '../../styles/form.css';

const options = [
    { value: 'chocolate', label: 'chocolate' },
    { value: 'strawberry', label: 'strawberry' }
];

class AddBook extends Component {
    state = {
        title: '',
        summary: '',
        isbn: '',
        authors: [],
        options: [],
        success: '',
        error: ''
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/v1/authors`)
        .then(response => {
            var authors = response.data;
            console.log(authors);
            authors = _.pick(authors, ['_id', 'name']);
            console.log(authors);

            this.setState({ options: response.data })
        })
        .catch(err => console.log(err));
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSelectChange = (option) => {
        this.setState({ authors: option })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { title, summary, isbn, authors, success, error }  = this.state;
        axios.post('http://localhost:3000/api/v1/books', {
            title,
            summary,
            isbn,
            authors,
        })
        .then(response => this.setState({ success: response.data.message }))
        .catch(err => this.setState({ error: err.message }));
    }

    render() {
        var { title, summary, isbn, authors, success, error }  = this.state;
    
        // console.log(this.state);
        return(
            <Fragment>
                <form className="form" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label>Book title</label>
                        <input 
                            name="title"
                            type="text" 
                            placeholder="Enter title.." 
                            value={title}
                            onChange={this.handleInputChange} />
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Summary:</label>
                        <input 
                            name="summary"
                            type="textarea"
                            rows="3" 
                            placeholder="Summary.." 
                            value={summary}
                            onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>ISBN:</label>
                        <input 
                            name="isbn"
                            type="text" 
                            placeholder="13 digit ISBN" 
                            value={isbn}
                            onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Authors:</label>
                        <Select 
                            isMulti={true}
                            value={authors}
                            onChange={this.handleSelectChange}
                            options={options}
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="submit">Submit</button>
                    </div>
                </form>
                {error && <p className="error-notif">{error}</p>}
                {success && <p className="success-notif">{success}</p>}
            </Fragment>
        );
    }
}

export default AddBook;