import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import urlTemplate from 'url-template'

const actions = {
    get: { method: 'get' },
    save: { method: 'post' },
    query: { method: 'get' },
    update: { method: 'put' },
    remove: { method: 'delete' },
    delete: { method: 'delete' },
}


const buildRequest = (url, action, args) => {
    const local = action
    local.url = url.expand(args[0])

    if (args.length > 1) {
        local.body = args[1]
    } else {
        switch (action.method) {
        case 'post':
        case 'put':
            local.body = args
            break

        default:
            local.params = args
            break
        }
    }
    return local
}

export default {
    install(vue, options = {}) {
        if (options.setCroudDefaults) {
            axios.defaults.baseURL = `//${gateway_url}`
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt')}`
            axios.defaults.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'brackets' })
        }

        const instance = axios.create(options.defaults)

        instance.interceptors.response.use((response) => {
            response.body = response.data
            return response
        })

        Vue.prototype.$http = instance
        Vue.http = instance

        const resource = (url) => {
            const axiosResource = {}

            Object.keys(actions).forEach((alias) => {
                resource[alias] = (...args) => instance.request(buildRequest(urlTemplate.parse(url), actions[alias], args))
            })

            return axiosResource
        }

        Vue.prototype.$resource = resource
        Vue.resource = resource
    },
}
