// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import store from './store'


import '../semantic/dist/semantic.min'
// import '../semantic/dist/semantic.min.css'
import './assets/croud-semantic.css'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(require('vue-semantic'))

window.Croud = {
    systemSettings: {
        user: {},
    },
    user_switcher: {
        users: [],
        org_user: {},
        root_user: {},
        current_user: {},
    },
    navigation: {},
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    store,
})
