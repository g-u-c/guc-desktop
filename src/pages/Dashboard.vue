<template lang="pug">
  q-page
    q-tabs(
      @select="select"
      align="justify"
      position="top"
      )
      q-tab(default slot="title" name="Config" icon="fas fa-cogs" label="Config")
      q-tab(slot="title" name="Editor" icon="fas fa-pen-nib" label="Editor")
      q-tab(slot="title" name="Preview" icon="far fa-eye" label="Preview")
      q-tab-pane.q-pa-sm(name="Config")
        .col-6.full-width
          q-item
            q-item-side(color='secondary' style="margin-left:-1px")
              q-btn(
                round
                v-if="config.steemName"
                :style="`background-image: url('https://steemitimages.com/u/${config.steemName}/avatar')!important; background-size: 42px!important; background-position: center center;`"
              )
            q-item-main
              q-input(
                v-model="config.steemName"
                float-label="steem name"
                placeholder="Which Steem account will you use to post?"
                )
          q-item
            q-item-side(color='secondary' style="margin-left:-1px")
              q-btn(
              round
              v-if="config.steemPostingKey"
              icon="fas fa-key"
              )
            q-item-main
              q-input(
              type="password"
              v-model="config.steemPostingKey"
              float-label="steem posting key"
              placeholder="Don't use your master key!"
              )
          q-item
            q-item-side(color='secondary' style="margin-left:-1px")
              q-btn(
              round
              v-if="config.gitUser"
              :style="`background-image: url('https://github.com/${config.gitUser}.png')!important; background-size: 42px 42px!important;`"
              )
            q-item-main
              q-input(
                v-model="config.gitUser"
                float-label="github username"
                placeholder="Enter your username, not an orgname!"
                )
          q-item
            q-item-side(color='secondary' style="margin-left:-1px")
              q-btn(
              round
              v-if="config.gitRepo"
              icon="fab fa-git-square"
              )
            q-item-main
              q-input(
                v-model="config.gitRepo"
                float-label="git repository"
                placeholder="Use a complete repo like https://github.com/g-u-c/guc-desktop"
                )
          q-item
            q-item-side(color='secondary' style="margin-left:-1px")
              q-btn(
              round
              v-if="tags"
              icon="fas fa-tag"
              )
            q-item-main
              q-field(:count="5", :max-count="5" :max="6")
                q-chips-input(
                color="secondary"
                float-label="tags"
                v-model="tags"
                @input="steemTag"
                )
      q-tab-pane.q-pa-sm(name="Editor")
        q-editor(
        v-model="model"
        )
      q-tab-pane.q-pa-sm(name="Preview")
        .row
          .col-12.full-width
            div {{ tags }}
            div {{ mdModel }}
        q-fab(
          color="secondary"
          class="fixed"
          style="right: 30px; bottom: 110px"
          icon="cloud_upload"
          @click.native="publish"
        )
</template>

<style>
  .q-tabs-bar {
    border-bottom-width:6px!important;
    height: 6px!important;
  }
  .q-chip {
    margin:0 10px 0 0!important;
  }
</style>

<script>
// import { debounce } from 'quasar'
import path from 'path'
import { remote } from 'electron'

const filePath = path.join(remote.app.getPath('userData'), '/some.file')
console.log(filePath)

export default {
  name: 'PageDashboard',
  data () {
    return {
      model: 'Start here',
      mdModel: 'Start here',
      tags: ['utopian-io', 'development'],
      config: {
        steemName: '',
        steemPostingKey: '',
        gitUser: '',
        gitRepo: ''
      },
      props: {
        maximum_block_size: this.main().catch()
      }
    }
  },
  meta () {
    return {
      title: 'Dashboard'
    }
  },
  watch: {
    model: {
      handler (val, oldVal) {
        this.makeMarkdown(val)
      },
      immediate: true
    }
  },
  mounted () {
  },
  methods: {
    main: async function () {
      await this.$steemClient.database.getChainProperties().then((props) => {
        console.log(`Maximum blocksize consensus: ${props.maximum_block_size} bytes`)
        this.props = props
      })
    },
    makeMarkdown (data) {
      this.mdModel = this.$marked(data)
    },
    select (tab) {
      // this.$q.notify(`Tab: ${tab}`)
    },
    publish () {
      // this.$q.notify(this.mdModel)
    },
    /** A function to lowercase, hyphenate and truncate the tags
     *
     */
    steemTag () {
      this.tags.forEach((tag, index) => {
        this.tags[index] = tag.toLowerCase()
          .replace(/[_— ]/g, '-')
          .replace(/[^a-z0-9+-]/gi, '')
      })
      this.tags = this.tags.slice(0, 5)
    }
  }
}
</script>
