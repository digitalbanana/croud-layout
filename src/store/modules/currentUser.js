export default {
    state: {
        user: {},
        permissions: [],
        userSwitches: [],
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
    },
    actions: {
        updateUser: (context, state) => context.commit('UPDATE_USER', state),
        updatePermissions: (context, state) => context.commit('UPDATE_PERMISSIONS', state),
        updateUserSwitches: (context, state) => context.commit('UPDATE_USER_SWITCHES', state),
    },
    getters: {
        user: state => state.user,
        clients: (state) => {
            if (!state.user.allTeamClients) return []
            return state.user.allTeamClients.data
        },
        permissions: state => state.permissions,
        userSwitches: state => state.userSwitches,
    },
}
