import {observable, action, useStrict, runInAction, extendObservable} from 'mobx';
import fetch from 'node-fetch'
import cc from 'cryptocompare'

useStrict(true);
class Store {
  @observable obj = {};
  @observable hisArr = [];
  @observable priceFlag = false;
  @observable showLine = false;
  @observable canshowLine = false;

  @action showHideLine = (cb) => {
    this.showLine = !this.showLine
    cb()
  }
  @action fetchApi = async () => {
    const prices = await cc.priceMulti(['BTC', 'ETH', 'XRP', 'LTC', 'DASH', 'ZEC'], ['USD'])
    runInAction( () => {
      this.priceFlag = true
      this.obj = prices
    })
  }
  @action histoDay = async (key) => {
    this.canshowLine = false
    const arr = await cc.histoDay(key, 'USD')
    runInAction( () => {
      this.canshowLine = true
      this.hisArr = arr
    })
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