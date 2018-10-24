<template lang="pug">
  q-btn(icon="cloud_download" v-bind="$attrs" @click.native="fetch")
    q-tooltip fetch notes
</template>

<style>
</style>

<script>
import { fetch } from './index'

/** A button to fetch/pull notes
 * @prop {String} [workingDirectory=process.cwd()] in case the application not runned in project directory
 * @fires String#success when notes is succesfully fetched/pulled/downloaded/updated
 * @fires String#fail when fetch/pull/download/update notes fail
 * @example gn-fetch-button(workingDirectory="/home/user/projects")
 */
export default {
  name: 'GitNotesFetchButton',
  props: {
    workingDirectory: String
  },
  methods: {
    fetch () {
      fetch(this.workingDirectory)
        .then(data => this.$emit('success'))
        .catch(data => this.$emit('fail', data.toString()))
    }
  }
}
</script>
