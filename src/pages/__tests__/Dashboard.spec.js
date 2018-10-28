import { mountQuasar } from '~/test/utils'
import i18nPlugin from '@/plugins/i18n'
import markdownPlugin from '@/plugins/marked'
import PageDashboard from '@/pages/Dashboard.vue'

describe('Dashboard.vue', () => {
  test('init', () => {
    mountQuasar(PageDashboard, {
      plugins: [i18nPlugin, markdownPlugin]
    })
  })
})
