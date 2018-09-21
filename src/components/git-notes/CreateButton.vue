<template lang="pug">
  q-btn(icon="create" v-bind="$attrs" @click.native="add")
</template>

<style>
</style>

<script>
import { add } from './index'

/** A button to insert notes
 * @prop {String} notes notes that want to be inserted
 * @prop {String} [commitId=HEAD] commitId SHA-1 of commits. If not provided, it will add notes in the HEAD (current commit)
 * @prop {String} [workingDirectory=process.cwd()] in case the application not runned in project directory
 * @fires #success when notes is committed
 * @fires String#fail when notes fail to commit
 * @example gn-create-button(:notes="markdownNotes" commitId="98e34" workingDirectory="/home/user/projects")
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
      add(this.notes, cwd, sha)
        .then(data => this.$emit('success'))
        .catch(data => this.$emit('fail', data.toString()))
    }
  }
}
</script>
