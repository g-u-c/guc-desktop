import { Client } from 'dsteem'

export default ({ app, router, Vue, store }) => {
  // Vue.prototype.$steemClient = new Client('https://api.steemit.com')
  Vue.prototype.$steemClient = new Client('https://testnet.steem.vc', {
    addressPrefix: 'STX',
    chainId: '79276aea5d4877d9a25892eaa01b0adf019d3e5cb12a97478df3298ccdd01673'
  })
}
