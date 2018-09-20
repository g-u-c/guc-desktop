<template lang="pug">
  q-btn(icon="create" v-bind="$attrs" @click="add")
</template>

<style>
</style>

<script>
import { run } from '@/node-utils'

/** A button to insert notes
 * @prop {String} notes notes that want to be inserted
 * @prop {String} commitId SHA-1 of commits
 * @prop {String} workingDirectory in case the application not runned in project directory
 * @fires success when notes is commited
 * @fires fail#Notes when notes fail to commit
 * @example gn-button(:notes="markdownNotes" commitId="98e34" workingDirectory="/home/user/projects")
 */
export default {
  name: 'GitNotesCreateButton',
  props: {
    notes: {
      type: String,
      required: true
    },
    commitId: String,
    workingDirectory: String
  },
  methods: {
    add () {
      const cwd = this.workingDirectory
      const sha = this.commitId
      run('git', ['notes', '--ref=utopian', 'add', '-m', this.notes, ...(sha ? [sha] : [])], { cwd })
        .then(data => this.$emit('success'))
        .catch(data => this.$emit('fail', data.toString()))
    }
  }
}
</script>
