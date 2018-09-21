<template lang="pug">
  div
    q-btn {{commitId}}
</template>

<script>
export default {
  name: 'GitLog',
  props: ['commitId'],
  methods: {
    checkout () {
      this.$emit('commitId', this.commitId)
    }
  }
}
</script>
