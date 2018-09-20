<template lang="pug">
  q-btn(icon="visibility" v-bind="$attrs" @click="show")
</template>

<style>
</style>

<script>
import { run, runSync } from '@/node-utils'

/** A button to insert notes
 * @prop {String} commitId SHA-1 of commits. If not provided, it will show notes in the HEAD (current commit)
 * @prop {String} workingDirectory in case the application not runned in project directory
 * @fires success#Notes when notes can be retrieved
 * @fires fail#ErrorMessage when notes fail to be retrieved
 * @example gn-button(commitId="98e34" workingDirectory="/home/user/projects")
 */
export default {
  name: 'GitNotesCreateButton',
  props: {
    commitId: String,
    workingDirectory: String
  },
  methods: {
    show () {
      const cwd = this.workingDirectory
      const sha = this.commitId
      const getHead = [runSync('git', ['rev-parse', 'HEAD'])]
      run('git', ['notes', '--ref=utopian', 'show', ...(sha ? [sha] : getHead)], { cwd })
        .then(data => this.$emit('success'), data.stdout)
        .catch(data => this.$emit('fail', data.toString()))
    }
  }
}
</script>
