import React, { Component, Fragment } from 'react';
import axios from 'axios';

import '../../styles/form.css';

class AddAuthor extends Component {
    state = {
        name: '',
        twitter: '',
        success: '',
        error: ''
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, twitter}  = this.state;
        axios.post('http://localhost:3000/api/v1/authors', {
            name,
            twitter
        })
        .then(response => {
            console.log(response);
            if(response.data.errors) {
                this.setState({ success: '', error: response.data.message })
            }
            else {
                this.setState({ error: '', success: response.data.message })
            }
        })
        .catch(err => this.setState({ error: err.message }));
    }

    render() {
        var { name, twitter, success, error } = this.state;
        return(
            <Fragment>
                <form className="form" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                            name="name"
                            type="text" 
                            placeholder="Enter name.." 
                            value={name}
                            onChange={this.handleInputChange} />
                    </div>
                    <br />
                    <div className="form-group">
                        <label>Twitter</label>
                        <input 
                            name="twitter"
                            type="text" 
                            placeholder="twitter-handle" 
                            value={twitter}
                            onChange={this.handleInputChange} />
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

export default AddAuthor;