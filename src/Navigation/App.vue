<template>
  <div class="contained scrollable navigation-block">
    <div class="footer">
      <strong class="expand-button" @click.prevent="toggle"><i :class="toggleClass"></i></strong>
    </div>
    <ul data-depth="1">
      <component
      v-for="item in items"
      :is="item.menuType"
      :user="user"
      :items="items"
      :item="item" depth="1"
      :expanded="expanded"
      />
    </ul>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import ListItem from './Components/ListItem'
    import ListHeading from './Components/ListHeading'

    export default {
        data() {
            return {}
        },
        components: {
            ListItem, ListHeading,
        },
        props: ['depth', 'expanded'],
        computed: {
            toggleClass() {
                const classNames = ['arrow circle double icon']

                if (this.expanded) {
                    classNames.push('left')
                } else {
                    classNames.push('right')
                }
                return classNames.join(' ')
            },

            items() {
                const stashed = JSON.parse(localStorage.getItem(`main_navigation_${this.user.code}`))

                if (stashed && stashed.data && stashed.data.list) {
                    return stashed.data.list
                }

                return [
                    {
                        label: 'Dashboard',
                        uri: '/',
                        icon: 'dashboard icon',
                        menuType: 'list-item',
                    },
                    {
                        label: 'Croud Academy',
                        uri: '/academy/',
                        icon: 'university icon',
                        menuType: 'list-item',
                        expanded: true,
                        children: [
                            {
                                label: 'My Courses',
                                uri: '/academy/course/owned/',
                                menuType: 'list-item',
                            },
                            {
                                label: 'Available Courses',
                                uri: '/academy/course/available/',
                                menuType: 'list-item',
                            },
                        ],
                    },
                    {
                        label: 'User Management',
                        uri: '/users/manager',
                        icon: 'users icon',
                        menuType: 'list-item',
                        permission: 'menu.user',
                    },
                ]
            },

            ...mapGetters({
                permissions: 'universal/permissions',
                user: 'universal/user',
            }),
        },
        methods: {
            toggle() {
                this.expanded = !this.expanded
            },
            setExpanded(value) {
                document.getElementById('main-content').className = !value ? 'collapsed' : ''
            },
        },

        watch: {
            expanded(value) {
                this.setExpanded(value)
            },
        },
        mounted() {
            this.setExpanded(this.expanded)
            setTimeout(() => {
                $(document.body).removeClass('no-animation')
            }, 0)
        },
    }
</script>
