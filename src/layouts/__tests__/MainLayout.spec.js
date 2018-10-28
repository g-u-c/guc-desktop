import 'jest-extended'
import { mountQuasar } from '~/test/utils'

import i18nPlugin from '@/plugins/i18n'
import MainLayout from '@/layouts/MainLayout.vue'
import { QItem } from 'quasar'

import { resolve } from 'path'
import { readdirSync } from 'fs'

describe('MainLayout.vue', () => {
  test('should change language on item click', () => {
    const layout = mountQuasar(MainLayout, {
      plugins: [i18nPlugin],
      ssr: true
    })
    const translations = readdirSync(resolve(__dirname, '../../i18n')).filter(dir => dir.length === 2)
    const btnDropdown = layout.find({ ref: 'selectLanguages' })

    const items = btnDropdown.findAll(QItem)
    expect(items.length).toBe(translations.length - 1 /* why -1 🤔 */)

    items.at(1).trigger('click')
    expect(layout.vm.currentLanguage.code).toBeOneOf(translations)
  })
})
