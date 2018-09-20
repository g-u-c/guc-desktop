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
                :style="`background-image: url('https://steemitimages.com/u/${config.steemName}/avatar')!important; background-size: 42px!important; background-position: center center;`"
              )
            q-item-main
              q-input(
                v-model="config.steemName"
                float-label="steem name"
                placeholder="steem name"
                )
          q-item
            q-item-side(color='secondary' style="margin-left:-1px")
              q-btn(
                round
                :style="`background-image: url('https://github.com/${config.gitUser}.png')!important; background-size: 42px 42px!important;`"
              )
            q-item-main
              q-input(
                v-model="config.gitUser"
                float-label="github username"
                placeholder="@"
                :before="[{icon: 'fas fa-fingerprint'}]"
                @change="avatarBackgroundCSS('github')"
                )
          q-input(
            v-model="config.gitRepo"
            float-label="git repository"
            placeholder="https://github.com/"
            :before="[{icon: 'fab fa-git-square'}]"
            )
          q-chips-input(
            float-label="tags"
            :value="tags"
            @change="val => { tags = val }"
            :before="[{icon: 'fas fa-tag'}]"
            hide-underline
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
          style="right: 18px; bottom: 18px"
          icon="cloud_upload"
          @click.native="publish"
        )
</template>

<style>
  .q-tabs-bar{
    border-bottom-width:6px!important;
    height: 6px!important;
  }
</style>

<script>
export default {
  name: 'PageDashboard',
  data () {
    return {
      model: 'Start here',
      mdModel: 'Start here',
      tags: ['utopian-io', 'development'],
      config: {
        steemName: 'nothingismagick',
        gitUser: 'nothingismagick',
        gitRepo: 'https://github.com/g-u-c/guc-desktop'
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
        // console.log(val)
        this.makeMarkdown(val)
      },
      immediate: true
    }
  },
  mounted () {
    this.avatarBackgroundCSS('steem')
    this.avatarBackgroundCSS('github')
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
      this.$q.notify(`Tab: ${tab}`)
    },
    publish () {
      this.$q.notify(this.mdModel)
    },
    avatarBackgroundCSS: async function (tgt) {
      if (typeof tgt === 'undefined') {
        return `background: #417CE4!important; background-size: 32px 32px!important;`
      } else if (tgt === 'github') {
        return `background: #417CE4!important; background-image: url('https://github.com/nothingismagick.png')!important; background-size: 32px 32px!important;`
      } else if (tgt === 'steem') {
        await this.$steemClient.database.getAccounts({ usernames: this.steemName }).then((props) => {
          console.log(`${props}`)
          this.props = props
        })
      }
    }
  }
}
</script>
