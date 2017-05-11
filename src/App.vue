<template>
  <div id="main-container">
    <top-bar :user="user"></top-bar>
    <div id="main-content">
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
              <slot name="content"></slot>
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

export default {
    components: { TopBar, Navigation },
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

        ...mapGetters(['user']),
    },

    methods: mapActions([
        'updateUser',
        'updatePermissions',
        'updateUserSwitches',
    ]),

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
</style>
