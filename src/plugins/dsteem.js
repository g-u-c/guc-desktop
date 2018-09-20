import { Client } from 'dsteem'

export default ({ app, router, Vue, store }) => {
  const steemClient = new Client('https://api.steemit.com')
  Vue.prototype.$steemClient = steemClient
  // let dsteem = new Client('https://api.steemit.com')
  // store.commit('steem/dsteem', dsteem)
}
