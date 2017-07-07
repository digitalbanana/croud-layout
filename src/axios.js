import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

export default {
    install(vue, options = {}) {
        if (options.setCroudDefaults) {
            axios.defaults.baseURL = `//${gateway_url}`
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt')}`
            axios.defaults.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'brackets' })
        }

        const instance = axios.create({
            ...options.defaults,
        })
        instance.interceptors.response.use(response => ({
            ...response,
            body: response.data,
        }))

        Vue.prototype.$http = instance
        Vue.http = instance
    },
}
