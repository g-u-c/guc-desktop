<script>
import SteemPostButton from '@/components/steem/PostButton.vue'
import * as Notes from '@/components/git-notes'

const isPlainObject = obj => !!obj && obj.constructor === Object

export default {
  name: 'ActionButton',
  props: ['content', 'config', 'postTitle', 'postTags'],
  components: {
    SteemPostButton,
    ...Notes
  },
  computed: {
    cwd: () => process.cwd(),
    notes () {
      if (isPlainObject(this.content)) return this.content.body
      else return this.content
    },
    postBody () {
      if (isPlainObject(this.content)) return this.content.header + this.content.body + this.content.footer
      else return this.content
    }
  }
}
</script>

<template lang="pug">
  div
    notes-create-button.droplet(
      round
      class="fixed"
      size="md"
      color="positive"
      style="right: 280px; bottom: 30px"
      :notes="notes"
      :commitId="config.commitId"
      @success="$q.notify('created')"
      @fail="message => $q.notify(message)"
    )
    notes-remove-button.droplet(
      round
      class="fixed"
      size="md"
      color="positive"
      style="right: 150px; bottom: 30px"
      :commitId="config.commitId"
      @success="$q.notify('removed')"
      @fail="message => $q.notify(message)"
    )
    steem-post-button.droplet(
      round
      class="fixed"
      size="24px"
      color="blue"
      style="right: 200px; bottom: 20px"
      :username="config.steemAccount"
      :title="postTitle"
      :body="postBody"
      :postingKey="config.steemPostingKey"
      :password="config.steemPassword"
      :tags="postTags"
      @success="$q.notify('published')"
      @fail="message => $q.notify(message)"
    )
    notes-fetch-button.droplet(
      round
      class="fixed"
      size="md"
      color="positive"
      style="right: 330px; bottom: 30px"
      :workingDirectory="cwd"
      @success="$q.notify('notes updated')"
      @fail="message => $q.notify(message)"
    )
    notes-push-button.droplet(
      round
      class="fixed"
      size="md"
      color="positive"
      style="right: 100px; bottom: 30px"
      :workingDirectory="cwd"
      @success="$q.notify('pushed')"
      @fail="message => $q.notify(message)"
    )
</template>

<style scoped>
  .droplet {
    border: 5px solid #fff;
    box-shadow: none!important;
    z-index: 2000;
  }
</style>
