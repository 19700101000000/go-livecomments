<template>
  <div id="live-screen" class="h-100" :style="styles.liveScreen">
    <live-menu
      :style="styles.liveScreenMenu"
      @clickDummyComment="onClickDummyComment"></live-menu>
    <timer></timer>
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
      eventTimeout: {
        hideMenu: null,
      },
      eventInterval: {
        countTimer: null,
      },
      styles: {
        liveScreen: {
          backgroundColor: this.$store.state.bgColor,
        },
        liveScreenMenu: {
          display: 'none',
          position: 'absolute',
          zIndex: '1'
        }
      }
    }
  },
  methods: {
    onClickDummyComment () {
      this.addComment('1970-01-01 00:00:00', 'dummy comment')
    },
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
    onMouseMove(/* e MouseEvent */) {
      this.styles.liveScreenMenu.display = 'block'
      window.clearTimeout(this.eventTimeout.hideMenu)
      this.eventTimeout.hideMenu = window.setTimeout(() => {
        this.styles.liveScreenMenu.display = 'none'
      }, 2000)
    },
    countTimer() {
      this.$store.commit('countTimer', 1000)
      if (this.$store.state.timer === this.$store.state.count) {
        window.clearInterval(this.eventInterval.countTimer)
      }
    },
  },
  mounted () {
    window.document.onmousemove = this.onMouseMove

    this.eventInterval.countTimer = window.setInterval(this.countTimer, 1000)
  }
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
