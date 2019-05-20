import React, { Fragment, Component } from 'react';
import axios from 'axios';

class App extends Component {

  componentDidMount() {
    axios.get("http://localhost:3000/api/v1/books").then(response => console.log(response));
  }
  
  render() {
    return(
      <Fragment>
        <div>Hello</div>
      </Fragment>
    );
  }
}

export default App;
