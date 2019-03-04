<template>
  <div id="live-screen" class="h-100" :style="styles.liveScreen">
    <!-- TODO: live-screen-menu to outer component -->
    <div id="live-screen-menu" class="h-100 w-100" :style="styles.liveScreenMenu">
      <b-button
        variant="outline-danger"
        size="lg" 
        @click="onClickDummyComment">
        Dummy Comment
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [/* {
        datetime: 'yyyy-MM-dd HH:mm:ss',
        comment: 'this is comment',
      } */],
      eventTimeout: {
        hideMenu: null,
      },
      styles: {
        liveScreen: {
          backgroundColor: 'white'
        },
        liveScreenMenu: {
          display: 'none',
          backgroundColor: 'rgba(0,0,0,0.2)',
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
    }
  },
  mounted () {
    window.document.onmousemove = (e) => {
      this.styles.liveScreenMenu.display = 'block'
      window.clearTimeout(this.eventTimeout.hideMenu)
      this.eventTimeout.hideMenu = window.setTimeout(() => {
        this.styles.liveScreenMenu.display = 'none'
      }, 2000)
    }
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
}
</style>
