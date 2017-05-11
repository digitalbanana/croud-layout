<style lang="scss">
@import '../../sass/variables.scss';

#navigation-submenu {
  position:absolute;
  z-index:1000;
  .item {
    padding:0;
    text-align: left;
  }
  &.popup {
    border:none;
    padding:0;
    margin:0;
    border:none;

    a {
      color:$textColor;
      display:block;
      padding:10px;
    }

    a:active, a:hover {
      background:$warmGrey
    }
  }
  &.hidden {
    display:none;
    opacity: 0;
  }
}
</style>
<template>
  <li :class="activeClass(item)">
    <a v-if="item.children" @click.prevent="toggleItem(item)" :id="getSlug(item)" :class="linkClass(item)" :href="item.uri">
      <i v-if="item.icon != ''" :class="item.icon + ' link-icon'"></i>
      <span><i :class="linkIcon"></i>
          {{item.label}}
      </span>
    </a>
    <a v-else :id="getSlug(item)" :class="item.class" :href="item.uri">
      <i v-if="item.icon != ''" :class="item.icon + ' link-icon'"></i>
      <span v-html="item.label"></span>
    </a>
    <transition name="slider">
        <div v-if="item.children && item.expanded" class="children" data-speed-in="250" data-speed-out="150">
          <ul :data-depth="depth+1" class="child-menu" >
            <component :is="child.menuType" :user="user" :item="child" :depth="depth+1" v-for="child in item.children"></component>
          </ul>
        </div>
    </transition>

  </li>
</template>

<script>

  import store from '../Store'

  export default {
      name: 'ListItem',
      data() {
          return {
              popover_target: null,
          }
      },
      props: ['user', 'item', 'depth', 'items', 'expanded'],
      computed: {
          linkIcon() {
              return this.item.expanded ? 'caret down icon expandable' : 'caret right icon expandable'
          },
          localItem() {
              return this.item
          },
      },
      methods: {
          getSlug(item) {
              return `menuitem-${item.label.toLowerCase().replace(/[^a-z0-9+]+/gi, '')}`
          },

          linkClass(item) {
              return item.expanded ? `${item.class} sub-menu opened` : `${item.class} sub-menu closed`
          },

          buildPopup(item) {
              const target = $(`#${this.getSlug(item)}`)
              this.popover_target = target

            //   const menuTarget
              const html1 = item.children.reduce((html, child) => {
                  html.push(`<div class="item"><a href="${child.uri}">${child.label}</a></div>`)
                  return html
              }, []).join('')

              $('#navigation-submenu').remove()

              $(document.body).prepend(`<div id="navigation-submenu" class="ui popup basic visible hidden">
        <div class="ui menu vertical fluid">
          ${html1}
        </div>
        </div>`)
              $('#navigation-submenu')
        .removeClass('hidden')
        .css({ top: `${target.offset().top}px`, left: '50px' })

              setTimeout(() => {
                  $(document.body).on('click.submenu', function (e) {
                      menuTarget = $(e.target)
                      if (menuTarget.attr('id') !== 'navigation-submenu' && !menuTarget.parents('#navigation-submenu').length) {
                          $(document.body).off('click.submenu')
                          $('#navigation-submenu').remove()
                          this.popover_target = null
                      }
                  })
              }, 0)

      // $(`#${this.getSlug(item)}`).popup({
      //   popup: '#navigation-submenu'
      // }).popup('show')
          },

          toggleItem(item) {
              if (!this.expanded) {
                  this.buildPopup(item)
                  return
              }
              this.item.expanded = !this.item.expanded
              this.$nextTick(() => {
                  store.setNavigation(this.user, {
                      expanded: this.expanded,
                      list: this.items,
                  })
              })
          },
          activeClass(item) {
              if (!item.uri || item.uri.length < 1) return ''

              const uri = window.location.pathname.substr(1)
              return uri === item.uri.substring(1) ? 'active' : ''
          },
      },
  }
</script>
