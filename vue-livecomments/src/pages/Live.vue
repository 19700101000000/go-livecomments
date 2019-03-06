<template>
  <div
    id="live-screen"
    class="h-100"
    :style="styles.liveScreen"
    @mousemove="onMouseMove">
    <b-container class="h-100">
      <b-row class="h-100 align-items-center">
        <b-col class="text-center mx-auto">
          <timer class="display-1"></timer>
        </b-col>
      </b-row>
    </b-container>
    <live-menu
      :style="styles.liveScreenMenu"
      @clickDummyComment="onClickDummyComment"
      @autoHide="onChangeMenuAutoHide"></live-menu>
  </div>
</template>

<script>
import LiveMenu from '@/components/LiveMenu.vue'
import Timer from '@/components/Timer.vue'

export default {
  components: {
    LiveMenu,
    Timer,
  },
  data () {
    return {
      comments: [/* {
        datetime: 'yyyy-MM-dd HH:mm:ss',
        comment: 'this is comment',
      } */],
      menuAutoHide: true,
      eventTimeout: {
        hideMenu: null,
      },
      styles: {
        liveScreen: {
          backgroundColor: this.$store.state.bgColor,
        },
        liveScreenMenu: {
          display: 'none',
          position: 'absolute',
          zIndex: '1',
          top: '0',
        }
      }
    }
  },
  methods: {
    onChangeMenuAutoHide(isAutoHide) {
      window.console.log(isAutoHide)
      this.clearTimeout()
      this.menuAutoHide = isAutoHide
      if (this.menuAutoHide) {
        this.onMouseMove()
      }
    },

    /* Debug */
    onClickDummyComment () {
      this.addComment('1970-01-01 00:00:00', 'dummy comment')
    },

    /* Show Comment */
    addComment(d, c/* datetime, comment string */) {
      const comment = {
        datetime: d,
        comment: c,
      }
      this.comments.push(comment)

      /* debug */
      window.console.log(comment)

      /* create element */
      const text = window.document.createTextNode(c)
      const element = window.document.createElement('p')
      element.className = 'comment'
      element.appendChild(text)
      element.animate([{
        marginLeft: '100%',
        widh: '100%',
      }, {
        marginLeft: `-${c.length}em`,
        widh: '100%',
      }], 4000).onfinish = () => {
        element.remove()
      }

      /* add comment to screen */
      const screen = window.document.getElementById("live-screen")
      screen.appendChild(element)
    },

    /* EventListener */
    onMouseMove(/* e MouseEvent */) {
      this.styles.liveScreenMenu.display = 'block'
      this.clearTimeout()
      if (this.menuAutoHide) {
        this.eventTimeout.hideMenu = window.setTimeout(() => {
          this.styles.liveScreenMenu.display = 'none'
        }, 2000)
      }
    },
    clearTimeout() {
      window.clearTimeout(this.eventTimeout.hideMenu)
    },
  },
}
</script>

<style scope>
#live-screen {
  position: relative;
  overflow: hidden;
}
.comment {
  white-space: nowrap;
  position: absolute;
  top: 10em;
}
</style>
