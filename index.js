import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css');

import Header from './src/Header';

class App extends React.Component {
  render() {
    return (
      <div className="content">
        <Header />
        <div className="main">
          <h3>Enter a city and State</h3>
          <input type="text" /> <br/>

          <button>Get Weather</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app-root'));


