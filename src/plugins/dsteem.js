import { Client } from 'dsteem'

export default ({ app, router, Vue, store }) => {
  Vue.prototype.$steem = {
    client: new Client('https://api.steemit.com')
  }

  // #region Unfortunately I can't find relyable testnet that can create account easily like steem.vc
  // if (process.env.NODE_ENV === 'development') {
  //   Vue.prototype.$steem.client = new Client('https://testnet.steem.vc', {
  //     addressPrefix: 'STX',
  //     chainId: '79276aea5d4877d9a25892eaa01b0adf019d3e5cb12a97478df3298ccdd01673'
  //   })
  // }
  // #endregion after HF20 seems steem.vc appear to be dead
}
