<template lang="pug">
  q-btn(icon="add" v-bind="$attrs" @click.native="add")
    q-tooltip add notes
</template>

<style>
</style>

<script>
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
    commitId: String
  },
  methods: {
    add () {
      try {
        this.$git.notes.at(this.commitId).add(this.notes)
        this.$emit('success')
      } catch (error) {
        this.$emit('fail', error.message)
      }
    }
  }
}
</script>
