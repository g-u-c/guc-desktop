<template lang="pug">
  #q-app
    router-view
</template>

<script>
import { remote } from 'electron'
const { Menu, MenuItem } = remote

// #region enable copy-paste on right click
const menu = new Menu()
menu.append(new MenuItem({ label: 'Copy', role: 'copy', click () { console.log('Copied') } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'Paste', role: 'paste' }))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup({ window: remote.getCurrentWindow() })
}, false)
// #endregion

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
