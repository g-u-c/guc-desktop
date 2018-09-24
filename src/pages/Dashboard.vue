<template lang="pug">
  q-page
    q-tabs(
      align="justify"
      position="top"
    )
      q-tab(default slot="title" name="Config" icon="fas fa-cogs")
        label {{ $t('pages.interface.config.label') }}
      q-tab(slot="title" name="Edit" icon="fas fa-pen-nib")
        label {{ $t('pages.interface.edit.label') }}
      q-tab(slot="title" name="Review" icon="far fa-eye")
        label {{ $t('pages.interface.review.label') }}
      q-tab(slot="title" name="Inform" icon="far fa-question-circle")
        label {{ $t('pages.interface.inform.label') }}
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
              :float-label="$t('pages.interface.config.steemAccount.label')"
              :placeholder="$t('pages.interface.config.steemAccount.hint')"
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
            :float-label="$t('pages.interface.config.gitUser.label')"
            :placeholder="$t('pages.interface.config.gitUser.hint')"
            )
        q-item.col-md-6
          q-item-side(color='secondary' style="margin-left:-1px")
            q-btn(
              round
              v-if="(experimental.steemPostingKey ? config.steemPostingKey : false) || config.steemPassword"
              icon="fas fa-key"
            )
          q-item-main
            q-input(
            v-if="experimental.steemPostingKey"
            type="password"
            v-model="config.steemPostingKey"
            :float-label="$t('pages.interface.config.steemPostingKey.label')"
            :placeholder="$t('pages.interface.config.steemPostingKey.hint')"
            )
            q-input(
            v-else
            type="password"
            v-model="config.steemPassword"
            :float-label="$t('pages.interface.config.steemPassword.label')"
            :placeholder="$t('pages.interface.config.steemPassword.hint')"
            )
            q-checkbox.disable(style="transform: scale(1)" v-model="experimental.steemPostingKey" @input="!experimental.steemPostingKey")
              sup(style="margin-left: 5px") {{ $t('pages.interface.config.usePostingKey') }}
                span.experimental ({{ $t('pages.interface.config.experimental') }})

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
            :float-label="$t('pages.interface.config.gitRepo.label')"
            :placeholder="$t('pages.interface.config.gitRepo.hint')"
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
            :float-label="$t('pages.interface.config.workingDirectory.label')"
            :placeholder="$t('pages.interface.config.workingDirectory.hint')"
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
            :float-label="$t('pages.interface.config.commitId.label')"
            :placeholder="$t('pages.interface.config.commitId.hint')"
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
                :float-label="$t('pages.interface.edit.tags')"
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
              :float-label="$t('pages.interface.edit.postTitle')"
              placeholder="Keep it short and simple"
            )
        // q-btn(icon="visibility" v-bind="$attrs" @click="show")
        // create-button()
        // remove-button()
        q-editor.col-md-12(
          v-model="model"
          :toolbar="[['bold', 'italic', 'underline', 'strike'],['link'],[{label: 'Sizes', icon: 'format_sizes', list: 'no-icons', options: ['p', 'code', 'h5', 'h4', 'h3', 'h2', 'h1']}]]"
        )

      q-tab-pane.q-pa-sm(name="Review")
        .row
          .col-12.full-width
            div {{ $t('pages.interface.config.steemAccount.label') }}:&nbsp;
              strong {{ config.steemAccount }}
            div {{ $t('pages.interface.edit.postTitle') }}:&nbsp;
              strong {{ postTitle }}
            div {{ $t('pages.interface.edit.tags') }}:&nbsp;
              strong {{ tags }}
            .markdownDisplay
              pre(
                v-model="model_ce"
                :contenteditable="contentEditable"
                @blur="mdModel = model_ce"
              ) {{ content.header }}{{ mdModel }}{{ content.footer }}
            q-checkbox(v-model="toHTML" @input="makeMarkdown(mdModel, toHTML)") HTML
            span &nbsp;&nbsp;&nbsp;&nbsp;
            q-checkbox.disable(v-model="contentEditable" @input="!contentEditable")
              |EDIT
              span.experimental (danger!!!)
            br
            br
        notes-create-button.droplet(
          round
          class="fixed"
          size="md"
          color="positive"
          style="right: 280px; bottom: 30px"
          :notes="mdModel"
          :commitId="config.commitId"
          :workingDirectory="config.workingDirectory"
          @success="$q.notify('created')"
          @fail="message => $q.notify(message)"
        )
        notes-remove-button.droplet(
          round
          class="fixed"
          size="md"
          color="positive"
          style="right: 150px; bottom: 30px"
          :commitId="config.commitId"
          :workingDirectory="config.workingDirectory"
          @success="$q.notify('removed')"
          @fail="message => $q.notify(message)"
        )
        steem-post-button.droplet(
          round
          class="fixed"
          size="24px"
          color="blue"
          style="right: 200px; bottom: 20px"
          :username="config.steemAccount"
          :title="postTitle"
          :body="mdModel"
          :password="experimental.steemPostingKey ? config.steemPostingKey : config.steemPassword"
          :tags="tags"
          @success="$q.notify('published')"
          @fail="message => $q.notify(message)"
        )
        notes-fetch-button.droplet(
          round
          class="fixed"
          size="md"
          color="positive"
          style="right: 330px; bottom: 30px"
          :workingDirectory="config.workingDirectory"
          @success="data => $q.notify(data)"
          @fail="message => $q.notify(message)"
        )
        notes-push-button.droplet(
          round
          class="fixed"
          size="md"
          color="positive"
          style="right: 100px; bottom: 30px"
          :workingDirectory="config.workingDirectory"
          @success="$q.notify('pushed')"
          @fail="message => $q.notify(message)"
        )

        //- TODO: move to GitLog.vue
        q-btn.droplet(
          rounded
          class="fixed"
          size="12px"
          color="faded"
          style="left: 5px; bottom: 40px"
          @click.native="!popup.gitLog"
        ) {{config.commitId}}

      q-tab-pane.q-pa-sm(name="Inform")
        .row
          .col-1
          .col-10
            div
              br
            div(v-html="$t('pages.interface.inform.p1')")
              br
            div
              br
            div(v-html="$t('pages.interface.inform.p2')")
            div
              br
            div(v-html="$t('pages.interface.inform.p3')")
          .col-1
</template>

<style>
  .disable {
    cursor: pointer;
    color: grey;
  }
  .experimental {
    margin-left: 5px;
    color: rgb(168, 106, 106);
    font-weight: bold;
  }
  .droplet {
    border: 5px solid #fff;
    box-shadow: none!important;
    z-index: 2000;
  }
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
  pre {
    white-space: pre-wrap;
  }
</style>

<script>
// import { debounce } from 'quasar'
import path from 'path'
import { remote } from 'electron'

import SteemPostButton from '@/components/steem/PostButton.vue'
import {
  NotesCreateButton,
  NotesFetchButton,
  NotesPushButton,
  NotesRemoveButton
} from '@/components/git-notes'

const filePath = path.join(remote.app.getPath('userData'), '/some.file')
console.log(filePath)

const { Menu, MenuItem } = remote

const menu = new Menu()
menu.append(new MenuItem({ label: 'Copy', role: 'copy', click () { console.log('Copied') } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'Paste', role: 'paste' }))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup({ window: remote.getCurrentWindow() })
}, false)

export default {
  name: 'PageDashboard',
  components: {
    SteemPostButton,
    NotesCreateButton,
    NotesFetchButton,
    NotesPushButton,
    NotesRemoveButton
  },

  data () {
    return {
      model: 'Hola!',
      mdModel: 'Hola!',
      model_ce: '',
      toHTML: false,
      contentEditable: false,
      tags: ['utopian-io', 'development', 'hackathon', 'quasarframework'],
      postTitle: 'Hello World',
      experimental: {
        steemPostingKey: false
      },
      popup: { // TODO: move to GitLog.vue
        gitLog: false
      },
      config: {
        steemAccount: '',
        steemPostingKey: '',
        steemPassword: '',
        gitUser: '',
        gitRepo: 'https://github.com/g-u-c/guc-desktop',
        workingDirectory: '/home/user/git/guc-desktop',
        commitId: 'f004881'
      },
      content: {
        header: '',
        footer: ''
      }
      // props: {
      //   maximum_block_size: this.main().catch()
      // }
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
    this.content.header = '#### Repository\n' + this.config.gitRepo + '\n\n'
    this.content.footer = '\n\n---\n#### GitHub Account\n' + `https://github.com/${this.config.gitUser}`
  },

  methods: {
    makeMarkdown (data, html) {
      if (this.toHTML === true || html === true) {
        this.mdModel = this.$marked(data)
      } else {
        this.mdModel = this.$turndown.turndown(data)
      }
    },
    steemTag () { // A function to lowercase, hyphenate and truncate the tags
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
