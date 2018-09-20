import * as marked from 'marked'

export default ({ app, router, Vue }) => {
  Vue.prototype.$marked = marked
}
