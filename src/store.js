import {observable, action, useStrict, runInAction, extendObservable} from 'mobx';
import fetch from 'node-fetch'
import cc from 'cryptocompare'

useStrict(true);
class Store {
  @observable obj = {};
  @observable number = 0;
  @action add = () => {
    this.number++;
  }
  @action fetchApi = async () => {
    const prices = await cc.priceMulti(['BTC', 'ETH', 'XRP', 'LTC', 'DASH', 'ZEC'], ['USD', 'EUR'])
    runInAction( () => {
      this.obj = prices
    })
    // cc.priceMulti(['BTC', 'ETH', 'XRP', 'LTC', 'DASH', 'ZEC'], ['USD', 'EUR'])
    // .then(prices => {
    //   debugger
    // })
    // const response = await fetch('http://47.93.83.7:8000/index2/?format=json&platform=mobile')
    // const json = await response.json()
    // runInAction( () => {
    //   this.obj = json.genres
    // })
  } 
}

const newStore = new Store();

export default newStore

//way-2

// export default extendObservable(this, {
//   people: [],
//   loading: false,
//   loadPeople: action(async () => {
//     const response = await fetch('http')
//     const json = await response.json()
//     runInAction( () => {
//       this.people = json.results
//     })
//   })
// })