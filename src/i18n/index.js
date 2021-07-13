import Vue from "vue"
import VueI18n from "vue-i18n"

Vue.use(VueI18n)

import { zh, en } from "./zh"
// import en from "./en"

const i18n = new VueI18n({
    locale: 'zh', //设置默认语言
    messages: {
        zh, en
    }
})

export default i18n