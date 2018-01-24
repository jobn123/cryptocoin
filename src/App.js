import React, { Component } from 'react';

import fetch from 'node-fetch'
import cc from 'cryptocompare'
import { observable, useStrict, action } from 'mobx';
import { observer } from 'mobx-react';
import ContentLoader from 'react-content-loader'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts';

import newState from './store'

import logo from './logo.svg';
import { link } from 'fs';
import './App.css';

@observer
class App extends Component {

  componentWillMount() {
    newState.fetchApi()
  }
  showSection(key) {
    // newState.histoDay(key)
    newState.showHideLine(() => {
      if (newState.showLine) {
        newState.histoDay(key)
      }
    })
  }
  renderCoinLists() {
    const prices = newState.obj
    const liArr = []
    for (const key in prices) {
      if (prices.hasOwnProperty(key)) {
        const element = prices[key]
        liArr.push(<li key={ key } onClick={ () => {this.showSection(key)}}>
          <span>{ key }</span>
          <span className="usdprice">{ element.USD }$</span>
        </li>)
      }
    }
    return (
      <div>
        <ul className="priceul">
          { liArr }
        </ul>
      </div>
    )
  }
  renderCharts() {
    if (!newState.showLine) return

    const data = newState.hisArr
    return (
      <LineChart width={730} height={250} data={data}
          margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="high" stroke="#8884d8" />
          <Line type="monotone" dataKey="low" stroke="#82ca9d" />
        </LineChart>
    )
  }
  render() {
    const MyLoader = () => (
      <ContentLoader>
        {/* Pure SVG */}
        <rect x="0" y="0" rx="4" ry="4" width="100%" height="30" />
        <rect x="0" y="35" rx="4" ry="4" width="100%" height="30" />
        <rect x="0" y="70" rx="3" ry="3" width="100%" height="30" />
        <rect x="0" y="105" rx="3" ry="3" width="100%" height="30" />
        <rect x="0" y="140" rx="3" ry="3" width="100%" height="30" />
        <rect x="0" y="175" rx="3" ry="3" width="100%" height="30" />
      </ContentLoader>
    )
    if (newState.priceFlag) {
      return (
        <div className="App">
          { this.renderCoinLists() }
          { this.renderCharts() }
        </div>
      );
    }
    return (
      <MyLoader />
    )
  }
}

export default App;
