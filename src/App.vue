<template>
  <div id="main-container">
    <top-bar v-if="user.id" :user="user"></top-bar>
    <div v-if="loading" class="ui very padded basic center aligned loading-overlay segment">
        <div>
            <img class="ui small image" src='../static/img/croud_logo_new.svg' />
        </div>
    </div>
    <login v-else-if="!user.id" @login="handleLogin"></login>
    <div v-else id="main-content">
        <div id="main-navigation" class="main-navigation">
          <div class="contained">
            <navigation
              :expanded="expanded"
              :items="items"
              :user="user"
              >
            </navigation>
          </div>
        </div>
        <div id="main-content-container">
          <!-- <div v-if="title" class="headingLinks"><span slot="links"></span></div> -->
          <h1 v-if="title" v-html="title"></h1>
          <div id="main-content-body" v-bind:class="classList">
              <slot name="content">
                  <h1 class="ui heading">Test</h1>
              </slot>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

import store from './Navigation/Store'

import TopBar from './components/TopBar'
import Navigation from './Navigation/App'
import Login from './Login/App'

export default {
    components: { TopBar, Navigation, Login },
    props: ['title', 'flush'],
    computed: {
        classList() {
            const arr = []
            if (this.flush) {
                arr.push('flush-body')
            }
            if (!this.title) {
                arr.push('without-heading')
            }
            return arr.join(' ')
        },
        navData() {
            return store.getNavigation(Croud.systemSettings.user, {
                expanded: true,
                list: Croud.navigation.main,
            })
        },

        ...mapGetters(['user', 'jwt', 'loading']),
    },

    methods: {
        ...mapActions([
            'updateUser',
            'updatePermissions',
            'updateUserSwitches',
        ]),

        handleLogin() {
            if (!this.jwt.sub) return
            Vue.http.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt')}`

            this.$http.get('api/user/authorised').then((response) => {
                response.body.data.user.data.avatar = response.body.data.user.data.avatar_url
                this.updateUser(response.body.data.user.data)
                this.updatePermissions(response.body.data.permissions.data)
                this.updateUserSwitches(response.body.data.user_switches.data)
            })
        },
    },

    data() {
        return {
            items: [],
            expanded: false,
        }
    },

    created() {
        Vue.http.options.root = `//${gateway_url}`
        Vue.http.headers.common.Authorization = `Bearer ${localStorage.getItem('jwt')}`
    },

    mounted() {
        this.$nextTick(() => {
            this.items = this.navData.list
            this.expanded = this.navData.expanded
        })

        this.handleLogin()

        this.$http.get('api/user/authorised').then((response) => {
            response.body.data.user.data.avatar = response.body.data.user.data.avatar_url
            this.updateUser(response.body.data.user.data)
            this.updatePermissions(response.body.data.permissions.data)
            this.updateUserSwitches(response.body.data.user_switches.data)
        })
    },
}
</script>

<style lang="scss">
    @import './sass/layout.scss';

    .ui.basic.loading-overlay.segment {
        background-color: rgba(0,0,0,.75);
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        margin-top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
</style>
