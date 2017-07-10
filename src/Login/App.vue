<template>
    <div class="login-container">
        <transition name="bouncer">
            <login v-if="active" @login="$emit('login')"></login>
        </transition>
    </div>
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
        }
    },

    mounted() {
        setTimeout(() => {
            this.active = true
        }, 250)
    },
}
</script>

<style lang="scss" scoped>
    .login-container {
        background: #f0f0ed;
        min-height: 100vh;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
    }
</style>
