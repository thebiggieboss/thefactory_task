import myLocales from './i18n/index'
import { createI18n } from 'vue-i18n'

export default createI18n({
    legacy: false,
    globalInjection: true,
    locale: process.env.VUE_APP_I18N_LOCALE || 'ru',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'ru',
    myLocales,
})