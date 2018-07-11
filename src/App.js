import React, { Component } from 'react';
import './App.css';

import Drag from './Drag';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Drag Left or Right</h1>
        <Drag />
      </div>
    );
  }
}

export default App;
