import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import _ from 'lodash/core';
import axios from 'axios';


import '../../styles/form.css';

class AddBook extends Component {
    state = {
        title: '',
        summary: '',
        isbn: '',
        author_list: [],
        options: [],
        success: '',
        error: ''
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/v1/authors`)
        .then(response => {
            var authors = response.data;
            var options = [];
            var keysMap = {
                _id: 'value',
                name: 'label'
            };

            for(let i=0;i<authors.length;i++) {
                var renamedOptions = this.renameKeys(keysMap, authors[i]);
                options.push(_.pick(renamedOptions, ['value', 'label']));
            }
            this.setState({ options })
        })
        .catch(err => console.log(err));
    }

    renameKeys = (keysMap, obj) => Object
        .keys(obj)
        .reduce((acc, key) => ({
            ...acc,
            ...{ [keysMap[key] || key]: obj[key] }
    }), {});

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSelectChange = (option) => {
        this.setState({ author_list: option })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { title, summary, isbn, author_list }  = this.state;
        var authors = [];
        for(let i=0;i<author_list.length;i++){
            authors.push(author_list[i].value);
        }
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
        var { title, summary, isbn, author_list, success, error, options }  = this.state;
        
        console.log(this.state);
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
                            className="select"
                            isMulti={true}
                            value={author_list}
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