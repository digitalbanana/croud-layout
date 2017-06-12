<template>
    <login v-if="active" :view.sync="view" :username.sync="username" transition="bouncer" transition-mode="out-in" @login="$emit('login')"></login>
</template>
<script>
import Login from './Components/Login'

export default {
    components: {
        Login,
    },

    data() {
        return {
            active: false,
            view: 'login',
            username: '',
        }
    },

    mounted() {
        setTimeout(() => {
            this.active = true
        }, 250)
    },
}
</script>
