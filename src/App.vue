<template lang="pug">
  #q-app
    router-view
</template>

<script>
export default {
  name: 'App',
  meta () {
    return {
      titleTemplate: title => `Git-Utopian-Contributor - ${title}`,
      meta: {
        description: { name: 'description', content: '' },
        viewport: {
          name: 'viewport',
          content: this.$q.platform.is.desktop
            ? 'width=device-width'
            : 'width=device-width, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1' +
              (this.$q.platform.is.cordova ? ', viewport-fit=cover' : '')
        }
      }
    }
  }
}
</script>
