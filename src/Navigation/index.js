import store from './Store.js'

jQuery(function($){

  if (!Croud.systemSettings || !Croud.systemSettings.user) return;

  if (!document.getElementById('main-navigation')) return

  const Vue = require('vue');
  const App = require('./App.vue')

  Vue.use(require('croud-frontend/components/transitions'));

  const navData = store.getNavigation(Croud.systemSettings.user, {
    expanded: true,
    list: Croud.navigation.main
  })

  new Vue({

    components: {App},

    el: '#main-navigation',

    data: {
      user: Croud.systemSettings.user,
      items: navData.list,
      expanded: navData.expanded,
    },

    template: `<div class="contained"><app
    :expanded="expanded"
    :items="items"
    :user="user"
    ></app></div>`
  })

})
