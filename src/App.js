import React, { Component } from 'react';

import fetch from 'node-fetch'
import cc from 'cryptocompare'
import { observable, useStrict, action } from 'mobx';
import { observer } from 'mobx-react';

import newState from './store'

import logo from './logo.svg';
import './App.css';

@observer
class App extends Component {

  componentWillMount() {
    newState.fetchApi()
    // cc.priceMulti(['BTC', 'ETH', 'XRP', 'LTC', 'DASH', 'ZEC'], ['USD', 'EUR'])
    // .then(prices => {
    //   debugger
    // })
  }
  render() {
    debugger
    console.log(newState.obj)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
