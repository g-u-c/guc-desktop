<template lang="pug">
  q-btn(icon="cloud_upload" v-bind="$attrs" @click.native="push")
    q-tooltip push notes
</template>

<style>
</style>

<script>
import { push } from './index'

/** A button to push notes
 * @prop {String} [workingDirectory=process.cwd()] in case the application not runned in project directory
 * @fires #success when notes is succesfully fetched/pulled/downloaded/updated
 * @fires String#fail when fetch/pull/download/update notes fail
 * @example gn-push-button(workingDirectory="/home/user/projects")
 */
export default {
  name: 'GitNotesFetchButton',
  props: {
    workingDirectory: String
  },
  methods: {
    push () {
      push(this.workingDirectory)
        .then(data => this.$emit('success'))
        .catch(data => this.$emit('fail', data.toString()))
    }
  }
}
</script>
