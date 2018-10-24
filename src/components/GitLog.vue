<template lang="pug">
  q-btn.droplet(
    rounded
    class="fixed"
    size="12px"
    color="faded"
    style="left: 5px; bottom: 40px"
    @click.native="popup = !popup"
  ) {{config.commitId}}
</template>

<script>
// [WIP]
export default {
  name: 'GitLog',
  props: ['config'],
  data: () => ({
    popup: false
  }),
  methods: {
    checkout () {
      this.$emit('commitId', this.commitId)
    }
  }
}
</script>

<style scoped>
  .droplet {
    border: 5px solid #fff;
    box-shadow: none!important;
    z-index: 2000;
  }
</style>
