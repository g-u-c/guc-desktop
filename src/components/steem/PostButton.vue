<template lang="pug">
  q-fab(
    color="secondary"
    class="fixed"
    style="right: 30px; bottom: 110px"
    icon="cloud_upload"
    @click.native="publish"
  )
</template>

<script>
import { PrivateKey } from 'dsteem'

/** Creates an account, note that almost no validation is done.
 * @prop {String} username - username of the account
 * @prop {String} password - password of the account
 * @prop {Array<String>} tags - The main tag for the post
 * @prop {String} title - Title of the post
 * @prop {String} body - body (content) of the post.
 * @fires TransactionConfirmation#success - when successfully post
 * @fires ??#fail - when failed
 */
export default {
  name: 'SteemPostButton',
  props: {
    username: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    // 🐛BUG: can't get `PrivateKey.fromString(this.postingKey)` work 😢
    // postingKey: {
    //   type: String,
    //   required: true
    // },
    password: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      validator: _ => _.every(tag => typeof tag === 'string'),
      required: true
    }
  },
  methods: {
    publish () {
      this.$steem.testnet.client.broadcast.comment({
        author: this.username,
        body: this.body,
        title: this.title,
        json_metadata: JSON.stringify({
          tags: this.tags
        }),
        parent_author: '',
        parent_permlink: this.tags[0],
        permlink: new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase()
      }, PrivateKey.fromLogin(this.username, this.password, 'posting'))
        .then(result => this.$emit('success', result))
        .catch(error => this.$emit('fail', error))
    }
  }
}
</script>
