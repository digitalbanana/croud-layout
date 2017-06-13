<template>
  <li>
    <div id="navItem-croud-academy" :class="item.class" :href="item.uri">
      <i v-if="item.icon != ''" :class="item.icon + ' link-icon'"></i>
      <span v-html="item.label"/></span>
    </div>
  </li>
</template>

<script>
  export default {
      name: 'ListItem',
      data() {
          return {}
      },
      props: ['user', 'item', 'depth', 'items', 'expanded'],
      computed: {

      },
      methods: {
          linkIcon(item) {
              return item.expanded ? 'caret down icon expandable' : 'caret right icon expandable'
          },
          linkClass(item) {
              return item.expanded ? `${item.class} sub-menu opened` : `${item.class} sub-menu closed`
          },
          toggleItem(item) {
              item.expanded = !item.expanded
          },
          activeClass(item) {
              if (!item.uri || item.uri.length < 1) return ''

              const uri = window.location.pathname.substr(1)
              return uri === item.uri.substring(1) ? 'active' : ''
          },
      },
  }
</script>
