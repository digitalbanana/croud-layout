import storage from 'localstorage'

export default {
    getKey(user) {
        return `main_navigation_${user.id}`
    },
    getNavigation(user, defaultValue = null) {
    // if (storage.exists(this.getKey(user)))
    //   return storage.get(this.getKey(user))
        return defaultValue
    },
    setNavigation(user, data) {
        storage.set(`main_navigation_${user.id}`, data)
    },
}
