<template lang="pug">
  q-btn(icon="delete" v-bind="$attrs" @click.native="remove")
    q-tooltip remove notes
</template>

<style>
</style>

<script>
/** A button to remove notes
 * @prop {String} [commitId=HEAD] SHA-1 of commits. If not provided, it will remove notes in the HEAD (current commit)
 * @prop {String} [workingDirectory=process.cwd()] in case the application not runned in project directory
 * @fires #success when notes is removed
 * @fires String#fail when notes fail to removed
 * @example gn-remove-button(commitId="98e34" workingDirectory="/home/user/projects")
 */
export default {
  name: 'GitNotesRemoveButton',
  props: {
    commitId: String
  },
  methods: {
    remove () {
      try {
        this.$git.notes.at(this.commitId).remove()
        this.$emit('success')
      } catch (error) {
        this.$emit('fail', error.message)
      }
    }
  }
}
</script>
