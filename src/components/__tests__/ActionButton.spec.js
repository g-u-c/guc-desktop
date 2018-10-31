/* TODO: implement expect($q.notify).toHaveBeenCalledWith(...) on each test after Quasar Notify can be mocked */
import { QBtn } from 'quasar'
import { mountQuasar } from '~/test/utils'
import 'jest-extended'

import ActionButton from '@/components/ActionButton.vue'
import gitPlugin from '@/plugins/git'
import dsteemPlugin from '@/plugins/dsteem'

import { execSync } from 'child_process'
import { resolve } from 'path'
import { unlinkSync } from 'fs'
import { notes } from 'fluent-git'
import { Client, PrivateKey, mockBroadcastComment, mockPredefinedState } from 'dsteem'

jest.mock('electron')
jest.mock('dsteem')

// #region helpers
const originCWD = process.cwd()
const cd = dir => resolve(process.cwd(), dir)
const resetNotes = () => execSync('git fetch origin refs/notes/*:refs/notes/* --force')
const removeRefs = () => unlinkSync(resolve(originCWD, '.git/modules/test/fixture/refs/notes/utopian'))
// #endregion

describe('ActionButton.vue', () => {
  let component
  // const $q = { notify: jest.fn() } // unfortunately mocking Quasar Notify cause error 😢

  beforeAll(() => { resetNotes(); process.chdir(cd('test/fixture')) }) // change working directory for git notes to run
  afterAll(() => { removeRefs(); resetNotes() })
  beforeEach(() => {
    Client.mockClear()
    component = mountQuasar(ActionButton, {
      plugins: [gitPlugin, dsteemPlugin],
      // mocks: { $q }, // 😢
      attrs: {
        config: {
          steemAccount: '',
          steemPostingKey: '',
          gitUser: '',
          gitRepo: '',
          workingDirectory: '',
          commitId: ''
        },
        content: {
          header: '',
          body: '',
          footer: ''
        },
        postTitle: '',
        postTags: []
      },
      ssr: true
    })
  })

  it('should have 5 button', () => expect(component.findAll(QBtn).wrappers).toBeArrayOfSize(5))

  test.each([
    'posting with header and footer',
    'emit success',
    'emit fail'
  ])('SteemPostButton should %s', cases => {
    // #region Arrange
    const config = {
      steemAccount: 'g-u-c',
      steemPostingKey: '5K1atkRW8BCGGv1em4LdqpxBpUXi2SDQ8xZGPk8GxysWK1sSZwd' // randomly generated from steem.vc
    }
    const content = {
      header: 'Repos name',
      body: 'post main content',
      footer: 'Github Account'
    }
    const predefined = {
      result: Math.random().toString(),
      error: Math.random().toString()
    }
    component.setProps({ config, content })
    const postBtn = component.find({ name: 'SteemPostButton' })
    // #endregion

    // WARNING: using `await postBtn.vm.$nextTick()` will cause error 😢
    // even if you define `async` in this test❗️
    switch (cases) {
      case 'posting with header and footer':
        // Act
        postBtn.trigger('click')
        // Assert
        const { header, body, footer } = content
        expect(mockBroadcastComment).toHaveBeenCalledWith(
          expect.objectContaining({
            author: config.steemAccount,
            body: header + body + footer // 👈
          }),
          PrivateKey.fromString(config.steemPostingKey)
        )
        break
      case 'emit success':
        mockPredefinedState.broadcastComment.alwaysSuccess = true
        mockPredefinedState.broadcastComment.withResult = predefined.result
        // Act
        postBtn.trigger('click')
        // Assert
        postBtn.vm.$nextTick().then(() => {
          expect(postBtn.emitted().success).toBeTruthy()
          expect(postBtn.emitted().fail).toBeFalsy()
          expect(postBtn.emitted().success[0][0]).toBe(predefined.result)
        })
        break
      case 'emit fail':
        mockPredefinedState.broadcastComment.alwaysSuccess = false
        mockPredefinedState.broadcastComment.withError = predefined.error
        // Act
        postBtn.trigger('click')
        // Assert
        postBtn.vm.$nextTick().then(() => {
          expect(postBtn.emitted().fail).toBeTruthy()
          expect(postBtn.emitted().success).toBeFalsy()
          expect(postBtn.emitted().fail[0][0]).toBe(predefined.error)
        })
        break
    }

    component.destroy() // putting it in afterEach() doesn't help at all 😢
  })

  test.each([
    'emit success',
    'emit fail'
  ])('NotesCreateButton should excute `git notes --ref=utopian add` then %s', cases => {
    // Arrange
    const content = {
      header: 'Repos name',
      body: 'post main content',
      footer: 'Github Account'
    }
    const config = { commitId: 'HEAD' }
    component.setProps({ content, config })
    const addBtn = component.find({ name: 'GitNotesCreateButton' })

    const { header, body, footer } = content
    switch (cases) {
      case 'emit success':
        expect(notes(config.commitId, 'utopian').show).toThrowError()
        // Act
        addBtn.trigger('click')
        const notesContent = notes(config.commitId, 'utopian').show()
        // Assert
        expect(notesContent).toBe(body)
        expect(notesContent).not.toBe(header + body + footer)
        expect(notesContent).not.toBe(header + body)
        expect(notesContent).not.toBe(body + footer)
        expect(addBtn.emitted().success).toBeTruthy()
        break
      case 'emit fail':
        expect(notes(config.commitId, 'utopian').show()).not.toBeEmpty()
        // Act
        addBtn.trigger('click')
        // Assert
        expect(addBtn.emitted().fail).toBeTruthy()
        break
    }
  })

  test.each([
    'emit success',
    'emit fail'
  ])('NotesRemoveButton should excute `git notes --ref=utopian remove` then %s', cases => {
    // Arrange
    const config = { commitId: 'b0279ab' }
    component.setProps({ config })
    const removeBtn = component.find({ name: 'GitNotesRemoveButton' })

    switch (cases) {
      case 'emit success':
        notes(config.commitId, 'utopian').add('random notes')
        // Act
        removeBtn.trigger('click')
        // Assert
        expect(notes(config.commitId, 'utopian').show).toThrowError()
        expect(removeBtn.emitted().success).toBeTruthy()
        break
      case 'emit fail':
        expect(notes(config.commitId, 'utopian').show).toThrowError()
        // Act
        removeBtn.trigger('click')
        // Assert
        expect(removeBtn.emitted().fail).toBeTruthy()
        break
    }
  })

  test.skip.each([
    'emit success',
    'emit fail'
  ])('FetchButton should excute `git fetch --force refs/notes/utopian` then %s', () => {
    // Still not sure how to mock it 🤔
    console.info('waiting for fluent-git to implement this feature')
  })

  test.skip.each([
    'emit success',
    'emit fail'
  ])('PushButton should excute `git push refs/notes/utopian` then %s', () => {
    // Still not sure how to mock it 🤔
    console.info('waiting for fluent-git to implement this feature')
  })
})
