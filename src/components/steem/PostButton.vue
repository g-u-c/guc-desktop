<template lang="pug">
  q-btn(icon="cloud_upload" v-bind="$attrs" @click.native="publish")
    q-tooltip post to Steem
</template>

<script>
import { PrivateKey } from 'dsteem'

/** Creates an account, note that almost no validation is done.
 * @prop {String} username - username of the account
 * @prop {String} [password] - password of the account. Must be filled if postingKey is missing
 * @prop {String} [postingKey] - posting key of the account. Must be filled if password is missing
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
    postingKey: {
      // required: true,
      type: String
    },
    password: {
      // required: true, // because of postingKey
      type: String
    },
    tags: {
      type: Array,
      validator: _ => _.every(tag => typeof tag === 'string'),
      required: true
    }
  },
  methods: {
    publish () {
      const key = this.postingKey ? PrivateKey.fromString(this.postingKey) : PrivateKey.fromLogin(this.username, this.password, 'posting')
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
      }, key)
        .then(result => this.$emit('success', result))
        .catch(error => this.$emit('fail', error))
    }
  }
}
</script>
