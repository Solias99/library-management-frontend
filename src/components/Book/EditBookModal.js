import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class EditBookModal extends Component {
    constructor() {
        super();
    
        this.state = {
          modalIsOpen: false,
          title: '',
          summary: '',
          isbn: '',
          success: '',
          error: ''
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
      }


      componentDidMount() {
            const { title, summary, isbn } = this.props.book;
            console.log(title,summary,isbn);
            this.setState({ title, summary, isbn })
      }
    
      handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

     handleSubmit = (event) => {
        const { _id } = this.props.book;
        event.preventDefault();
        const { title, summary, isbn }  = this.state;
        axios.put(`http://localhost:3000/api/v1/books/${_id}`, {
            title,
            summary,
            isbn
        })
        .then(response => this.setState({ success: response.data.message }))
        .catch(err => this.setState({ error: err.message }));
    }

      openModal() {
        this.setState({modalIsOpen: true});
      }
    
      afterOpenModal() {
        this.subtitle.style.color = 'blue';
      }
    
      closeModal() {
        this.setState({modalIsOpen: false});
      }

    render() {
        const { title, summary, isbn } = this.state;
        console.log(title,summary,isbn);
        return (
            <Fragment>
            <button className="edit_book" onClick={this.openModal}>Edit this book</button>
            <Modal
                ariaHideApp={false}
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

            <h2 ref={subtitle => this.subtitle = subtitle}>Edit this Book</h2>
            <form onSubmit={this.handleSubmit}>
                <label>Title:</label>
                {/* title,  summary is not in state. book is in state book.title, book.summary */}
                <input 
                    name="title"
                    value={title}
                    onChange={this.handleInputChange}
                />
                <br />
                <label>Summary:</label>
                <input
                    name="summary"
                    value={summary}
                    onChange={this.handleInputChange}
                 />
                <br />
                <label>ISBN:</label>
                <input 
                    name="isbn"
                    value={isbn}
                    onChange={this.handleInputChange}
                />
                <br />
                <br />
                <button type="submit" className="submit">Submit</button>
            </form>
            <button onClick={this.closeModal}>Close</button>
            </Modal>
        </Fragment>
        );
    }
}

export default EditBookModal;