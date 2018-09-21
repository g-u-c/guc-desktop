import * as dsteem from 'dsteem'

export default ({ app, router, Vue, store }) => {
  // TODO: switch to .env file 💪
  Vue.prototype.$steem = {
    client: new Client('https://api.steemit.com'),
    testnet: {
      client: new Client('https://testnet.steem.vc', {
        addressPrefix: 'STX',
        chainId: '79276aea5d4877d9a25892eaa01b0adf019d3e5cb12a97478df3298ccdd01673'
      })
    }
  }

  // let dsteem = new Client('https://api.steemit.com')
  // 🤔 store.commit('steem/dsteem', dsteem)
}
