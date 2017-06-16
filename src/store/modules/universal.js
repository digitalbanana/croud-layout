import jwtDecode from 'jwt-decode'
import localforage from '../localForage'

export default {
    state: {
        user: {},
        permissions: [],
        userSwitches: [],
        jwt: localStorage.getItem('jwt') ? jwtDecode(localStorage.getItem('jwt')) : {},
        loading: true,
    },
    mutations: {
        UPDATE_USER(state, newState) {
            state.user = newState
        },
        UPDATE_PERMISSIONS(state, newState) {
            state.permissions = newState
        },
        UPDATE_USER_SWITCHES(state, newState) {
            state.userSwitches = newState
        },
        UPDATE_JWT(state) {
            state.jwt = jwtDecode(localStorage.getItem('jwt'))
        },
        STOP_LOADING(state) {
            state.loading = false
        },
    },
    actions: {
        updateUser: (context, state) => {
            localforage.setItem('updateUser', state)
            context.commit('UPDATE_USER', state)
        },
        updatePermissions: (context, state) => {
            localforage.setItem('updatePermissions', state)
            context.commit('UPDATE_PERMISSIONS', state)
        },
        updateUserSwitches: (context, state) => {
            localforage.setItem('updateUserSwitches', state)
            context.commit('UPDATE_USER_SWITCHES', state)
        },
        updateJWT: context => context.commit('UPDATE_JWT'),

        $init: (context) => {
            if (!localStorage.getItem('jwt')) {
                context.commit('STOP_LOADING')
                return
            }

            localforage.getItem('updateUser').then((data) => {
                if (data) context.commit('UPDATE_USER', data)
                context.commit('STOP_LOADING')
            })
            localforage.getItem('updatePermissions').then((data) => {
                if (data) context.commit('UPDATE_PERMISSIONS', data)
            })
            localforage.getItem('updateUserSwitches').then((data) => {
                if (data) context.commit('UPDATE_USER_SWITCHES', data)
            })
        },
    },
    getters: {
        user: state => state.user,
        clients: (state) => {
            if (!state.user.allTeamClients) return []
            return state.user.allTeamClients.data
        },
        permissions: state => state.permissions,
        userSwitches: state => state.userSwitches,
        jwt: state => state.jwt,
        loading: state => state.loading,
    },

    namespaced: true,
}
