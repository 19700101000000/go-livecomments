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
      <b-row class="h-100 mt-0 align-items-center">
        <b-col class="text-center mx-auto">
          <b-alert variant="danger" show>
            Fail Connection
          </b-alert>
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
import { w3cwebsocket } from 'websocket'

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
      },
      socket: new w3cwebsocket(`ws://${window.location.host}/ws/${this.$store.state.livekey}`),
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
      this.addComment({comment: 'Dummy Comment'})
      // this.socket.send('Dummy Comment')
    },

    /* Show Comment */
    addComment(comment/* { datetime: string, comment: string } */) {
      this.comments.push(comment)
      const time = new Date().getTime()

      /* create element */
      const text = window.document.createTextNode(comment.comment)
      const element = window.document.createElement('p')
      element.className = 'comment'
      element.appendChild(text)
      element.style.top = `${time % 80}%`
      element.animate([{
        marginLeft: '100%',
        widh: '100%',
      }, {
        marginLeft: `-${comment.comment.length}em`,
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
  created () {
    this.socket.onmessage = (e) => {
      this.addComment(JSON.parse(e.data))
    }
    this.socket.onerror = () => {
      window.console.log('websocket error')
    }
    this.socket.onclose = () => {
      window.console.log('websocket close')
    }
  },
  destroyed () {
    this.socket.close()
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
  font-size: 6em;
  font-weight: bold;
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: white;
}
</style>
