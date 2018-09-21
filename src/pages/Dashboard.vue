<template lang="pug">
  q-page
    q-tabs(
      @select="select"
      align="justify"
      position="top"
      )
      q-tab(default slot="title" name="Config" icon="fas fa-cogs" label="Config")
      q-tab(slot="title" name="Edit" icon="fas fa-pen-nib" label="Edit")
      q-tab(slot="title" name="Review" icon="far fa-eye" label="Review")
      q-tab(slot="title" name="Inform" icon="far fa-question-circle" label="Inform")
      q-tab-pane.q-pa-sm.row(name="Config")
        q-item.col-md-6
          q-item-side(color='secondary' style="margin-left:-1px")
            q-btn(
              round
              v-if="config.steemAccount"
              :style="`background-image: url('https://steemitimages.com/u/${config.steemAccount}/avatar')!important; background-size: 42px!important; background-position: center center;`"
            )
          q-item-main
            q-input(
              v-model="config.steemAccount"
              float-label="Steem account"
              placeholder="Which Steem account will you use to post?"
              )
        q-item.col-md-6
          q-item-side(color='secondary' style="margin-left:-1px")
            q-btn(
            round
            v-if="config.gitUser"
            :style="`background-image: url('https://github.com/${config.gitUser}.png')!important; background-size: 42px 42px!important;`"
            )
          q-item-main
            q-input(
            v-model="config.gitUser"
            float-label="Github username"
            placeholder="Enter your username, not an orgname!"
            )
        q-item.col-md-6
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
            float-label="Steem posting key"
            placeholder="Don't use your master key!"
            )

        q-item.col-md-6
          q-item-side(color='secondary' style="margin-left:-1px")
            q-btn(
            round
            v-if="config.gitRepo"
            icon="fab fa-git-square"
            )
          q-item-main
            q-input(
              v-model="config.gitRepo"
              float-label="GIT repository"
              placeholder="Use a complete repo like https://github.com/g-u-c/guc-desktop"
              )
        q-item.col-md-6
          q-item-side(color='secondary' style="margin-left:-1px")
            q-btn(
            round
            v-if="config.gitRepo"
            icon="fas fa-folder"
            )
          q-item-main
            q-input(
            v-model="config.workingDirectory"
            float-label="Working Directory"
            placeholder="Where is the project located on your development machine?"
            )
        q-item.col-md-6
          q-item-side(color='secondary' style="margin-left:-1px")
            q-btn(
            round
            v-if="config.gitRepo"
            icon="fas fa-hashtag"
            )
          q-item-main
            q-input(
            v-model="config.commitId"
            float-label="Commit ID"
            placeholder="c0ffee"
            )
      q-tab-pane.q-pa-sm.row(name="Edit")
        q-item.col-md-12
          q-item-side(color='secondary' style="margin-left:-1px")
            q-btn(
            round
            v-if="tags"
            icon="fas fa-feather"
            )
          q-item-main
            q-field(:count="5", :max-count="5" :max="5")
              q-chips-input(
              color="secondary"
              float-label="Tags"
              v-model="tags"
              @input="steemTag"
              )
        q-item.col-md-12
          q-item-side(color='secondary' style="margin-left:-1px")
            q-btn(
            round
            v-if="postTitle"
            icon="fas fa-dove"
            )
          q-item-main
            q-input(
            v-model="postTitle"
            float-label="Post Title"
            placeholder="Keep it short and simple"
            )
        // q-btn(icon="visibility" v-bind="$attrs" @click="show")
        // create-button()
        // remove-button()
        q-editor.col-md-12(
        v-model="model"
        height="60vh"
        :toolbar="[['bold', 'italic', 'underline', 'strike'],['link'],[{label: 'Sizes', icon: 'format_sizes', list: 'no-icons', options: ['p', 'code', 'h5', 'h4', 'h3', 'h2', 'h1']}]]"
        )
      q-tab-pane.q-pa-sm(name="Review")
        .row
          .col-12.full-width
            div STEEM ACOUNT:&nbsp;
              strong {{ config.steemAccount }}
            div TITLE:&nbsp;
              strong {{ postTitle }}
            div TAGS:&nbsp;
              strong {{ tags }}
            .markdownDisplay
              pre(
              v-model="model_ce"
              :contenteditable="contentEditable"
              @blur="mdModel = model_ce"
              ) {{ content.header }}{{ mdModel }}{{ content.footer }}
            q-checkbox(v-model="toHTML" @input="makeMarkdown(mdModel, toHTML)") HTML
            span &nbsp;&nbsp;&nbsp;&nbsp;
            q-checkbox(v-model="contentEditable" @input="!contentEditable" disabled) EDIT (danger!!!)
        q-btn.dropLet(
          round
          size="24px"
          color="positive"
          class="fixed"
          style="right: 200px; bottom: 20px"
          icon="cloud_upload"
          @click="publish()"
        )
      q-tab-pane.q-pa-sm(name="Inform")
        .row
          .col-12.full-width
            div This is where we explain how it works.
</template>

<style>
  .q-tabs-bar {
    border-bottom-width:6px!important;
    height: 6px!important;
  }
  .q-chip {
    margin:0 10px 0 0!important;
  }
  .markdownDisplay {
    border: 1px solid #333389;
    height: 350px;
    padding: 10px;
    overflow: auto;
    resize: vertical
  }
  pre {
    white-space: pre-wrap;
  }
  .dropLet {
    border: 5px solid #fff;
    z-index: 10000000;
    box-shadow: none!important;
  }
  pre {
    white-space: pre-wrap;
  }
</style>

<script>
// import { debounce } from 'quasar'
// import path from 'path'
// import { remote } from 'electron'
// const filePath = path.join(remote.app.getPath('userData'), '/some.file')
// console.log(filePath)


export default {
  name: 'PageDashboard',
  data () {
    return {
      model: 'Hola!',
      mdModel: 'Hola!',
      model_ce: '',
      toHTML: false,
      contentEditable: false,
      tags: ['utopian-io', 'development', 'hackathon', 'quasarframework'],
      postTitle: 'Hello World',
      config: {
        steemAccount: 'nothingismagick',
        steemPostingKey: '',
        gitUser: '',
        gitRepo: 'https://github.com/g-u-c/guc-desktop',
        workingDirectory: '/home/denjell/WebstormProjects/Guc-quasar-electron',
        commitId: 'f004881'
      },
      steemProps: {
        maximum_block_size: this.main().catch()
      },
      content: {
        header: '',
        footer: ''
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
    this.header()
    this.footer()
  },
  methods: {
    header () {
      this.content.header = `#### Repository
${this.config.gitRepo}

`
    },
    footer () {
      this.content.footer = `
      

#### GitHub Account
https://github.com/${this.config.gitUser}
`
    },
    main: async function () {
      await this.$steemClient.database.getChainProperties().then((props) => {
        console.log(`Maximum blocksize consensus: ${props.maximum_block_size} bytes`)
        this.steemProps = props
      })
    },
    makeMarkdown (data, html) {
      // let turndownService = new TurndownService()
      // this.converter = new showdown.Converter()
      // this.mdModel = this.$showdown.makeHtml(data)
      // this.mdModel = this.$marked(data)
      // this.mdModel = this.$turndown.turndown(this.$marked(data))
      if (this.toHTML === true || html === true) {
        this.mdModel = this.$marked(data)
      } else {
        this.mdModel = this.$turndown.turndown(data)
      }
    },
    select (tab) {
      // this.$q.notify(`Tab: ${tab}`)
    },
    publish () {
      const parentAuthor = ''
      const mainTag = 'utopian-io'
      const wif = this.$dsteem.PrivateKey.fromLogin('nothingismagick', this.config.steemPostingKey, 'posting')
      // const wif = this.$dsteem.PrivateKey.fromString(this.config.steemPostingKey))
      this.$q.notify('Publishing')
      this.steemClient = new this.$dsteem.Client('https://api.steemit.com')
      this.steemClient.broadcast.comment({
        author: this.config.steemName,
        body: this.mdModel,
        title: this.postTitle,
        json_metadata: JSON.stringify({
          tags: this.tags
        }),
        parent_author: parentAuthor,
        parent_permlink: mainTag,
        permlink: new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '').toLowerCase()
      // }, this.$dsteem.PrivateKey.fromString(this.config.steemPostingKey)).then((result) => {
      }, wif).then((result) => {
        console.log(result)
        this.$q.notify(`Published ${this.postTitle}`)
      }, function (error) {
        console.error(error)
      })

    },
    /** A function to lowercase, hyphenate and truncate the tags
     *
     */
    steemTag () {
      this.tags = this.tags.slice(0, 5)
      this.tags.forEach((tag, index) => {
        this.tags[index] = tag.toLowerCase()
          .replace(/[._— ]/g, '-')
          .replace(/[^a-z0-9-]/gi, '')
      })
    }
  }
}
</script>
