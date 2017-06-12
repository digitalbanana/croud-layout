import Vue from 'vue'
import Vuex from 'vuex'
import currentUser from './modules/currentUser'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        currentUser,
    },
    plugins: [
        /* eslint-disable no-underscore-dangle */
        store => Object.keys(store._actions).filter(a => a.includes('$init')).forEach(a => store.dispatch(a, a)),
    ],
})
