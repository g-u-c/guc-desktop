import { notes } from 'fluent-git'
import { remote } from 'electron'

export default ({ app, router, Vue, store }) => {
  Vue.prototype.$git = {
    notes: notes({
      ref: 'utopian',
      preferLocal: false, // TODO: make the default to false in fluent-git, or not 🤔
      env: { HOME: remote.process.env['HOME'] } // because git use $HOME to determine global config filepath
    })
  }
}
