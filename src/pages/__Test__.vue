<template lang="pug">
  q-page.flex.flex-center
    .column.flex-center
      p {{ $t('pages.dashboard.title') }}
      gn-button(label="Create Notes")
</template>

<style>
</style>

<script>
import GnButton from '@/components/git-notes/CreateButton.vue'

export default {
  name: 'PageDashboard',
  components: {
    GnButton
  },
  meta () {
    return {
      title: 'Dashboard'
    }
  }
}
</script>
