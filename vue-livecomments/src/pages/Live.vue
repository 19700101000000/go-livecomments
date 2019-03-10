<template>
  <div
    id="live-screen"
    class="h-100"
    :style="styles.liveScreen"
    @mousemove="onMouseMove">
    <b-container class="h-100" style="position: relative;">
      <b-row class="h-100 align-items-center">
        <b-col class="text-center mx-auto">
          <timer class="display-1"></timer>
        </b-col>
      </b-row>

      <b-row class="connection-error w-100">
        <b-col class="mt-3">
          <b-alert
            variant="danger"
            :show="isError">
            Connection Fail.
          </b-alert>
        </b-col>
      </b-row>
    </b-container>
    <live-menu
      :style="styles.liveScreenMenu"
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
      isError: false,
      menuAutoHide: true,
      eventTimeout: {
        hideMenu: null,
        reopen: null,
      },
      eventInterval: {
        sendPing: null,
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
      socket: null,
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

    /* Show Comment */
    addComment(comment/* { datetime: string, comment: string, top: number } */) {
      this.comments.push(comment)

      /* create element */
      const text = window.document.createTextNode(comment.comment)
      const element = window.document.createElement('p')
      element.className = 'comment'
      element.appendChild(text)
      element.style.top = `${comment.top}%`
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
    connectionWS() {
      this.socket = new w3cwebsocket(`ws://${window.location.host}/ws/${this.$store.state.livekey}`)
      this.socket.onmessage = (e) => {
        if (e.data === "ping") {
          return
        }
        this.addComment(JSON.parse(e.data))
      }
      this.socket.onopen = (e) => {
        window.console.log('websocket open')
        window.console.log(e)

        this.isError = false
      }
      this.socket.onerror = (e) => {
        window.console.log('websocket error')
        window.console.log(e)
      }
      this.socket.onclose = (e) => {
        window.console.log('websocket close')
        window.console.log(e)

        this.isError = true
        this.eventTimeout.reopen = window.setTimeout(() => {
          this.connectionWS()
        }, 1000)
      }

      // TODO: is unnecessary?
      this.eventInterval.sendPing = window.setInterval(() => {
        this.socket.send('ping')
      }, 60000)
    },
  },
  beforeCreate () {
    if (this.$store.state.livekey === null) {
      this.$router.push({ path: '/' })
    }
  },
  created () {
    this.connectionWS()
  },
  destroyed () {
    this.socket.close()
    window.clearTimeout(this.eventTimeout.reopen)
    window.clearInterval(this.eventInterval.sendPing)
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
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: white;
}
.connection-error {
  position: absolute;
  top: 0;
}
</style>
