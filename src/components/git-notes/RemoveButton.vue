<template lang="pug">
  q-btn(icon="delete" v-bind="$attrs" @click="remove")
</template>

<style>
</style>

<script>
import { run } from '@/node-utils'

/** A button to remove notes
 * @prop {String} commitId SHA-1 of commits. If not provided, it will remove notes in the HEAD (current commit)
 * @prop {String} workingDirectory in case the application not runned in project directory
 * @fires success when notes is removed
 * @fires fail#ErrorMessage when notes fail to removed
 * @example gn-button(commitId="98e34" workingDirectory="/home/user/projects")
 */
export default {
  name: 'GitNotesRemoveButton',
  props: {
    commitId: String,
    workingDirectory: String
  },
  methods: {
    remove () {
      const cwd = this.workingDirectory
      const sha = this.commitId
      run('git', ['notes', '--ref=utopian', 'remove', ...(sha ? [sha] : [])], { cwd })
        .then(data => this.$emit('success'))
        .catch(data => this.$emit('fail', data.toString()))
    }
  }
}
</script>
