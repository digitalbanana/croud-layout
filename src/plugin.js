import universal from './store/modules/universal'
import croudLayout from './App'

export default {
    install(Vue, options) {
        Vue.component('croud-layout', croudLayout)

        options.store.registerModule('universal', universal)
        /* eslint-disable no-underscore-dangle */
        Object.keys(options.store._actions).filter(a => a.includes('$init')).forEach(a => options.store.dispatch(a, a))
    },
}
