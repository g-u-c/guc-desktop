import * as marked from 'marked'
// import * as Showdown from 'showdown'
// import * as showdown from 'showdown'
import TurndownService from 'turndown/lib/turndown.umd.js'
import * as turndownPluginGfm from 'turndown-plugin-gfm'

// const TurndownService = require('turndown')

export default ({ app, router, Vue }) => {
  Vue.prototype.$marked = marked
  // Vue.prototype.$showdown = new showdown.Converter()
  const gfm = turndownPluginGfm.gfm
  const turndownService = new TurndownService()
  turndownService.use(gfm)
  Vue.prototype.$turndown = turndownService
}
