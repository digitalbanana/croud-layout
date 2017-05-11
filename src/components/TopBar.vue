<template>
  <div id="header" class="development">
    <div id="quickJobHeader">
      <client-picker></client-picker>
    </div>
    <div id="loggedIn">
      <a href="#">
        <img class="thumbnail" style="vertical-align:middle" :alt="current_user.name" :src="current_user.avatar">
        <strong v-html="current_user.name"></strong>
      </a>
    </div>
    <div id="user_switcher">
      <switcher></switcher>
    </div>
    <div class="wrapper">
			<a href="/">
        <h1 id="logo">Croud Control</h1></a>
		</div>
	</div>
</template>
<script>
    import ClientPicker from './ClientPicker'
    import Switcher from './UserSwitcher'


    export default {
        props: {
            user: {},
        },

        computed: {
            current_user() {
                return this.user
            },
        },

        components: {
            Switcher,
            ClientPicker,
        },
    }
</script>
