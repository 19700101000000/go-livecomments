<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <b-card
          title="Comment Form">
          <b-card-text>
            <b-form @submit="onSubmit">
              <b-input-group>
                <b-form-input
                  v-model="comment"
                  :style="{color: color}"
                  type="text"
                  :state="commentState"
                  :disabled="isDisabled"
                  placeholder="your comment"></b-form-input>
                <b-input-group-append>
                  <b-button
                    type="submit"
                    :variant="commentState? 'outline-success': 'outline-danger'"
                    :disabled="!commentState || isDisabled">
                    <b-spinner
                      small
                      variant="success"
                      v-if="isSending"></b-spinner>
                    <font-awesome-icon
                      icon="paper-plane"
                      v-else></font-awesome-icon>
                  </b-button>
                </b-input-group-append>
              </b-input-group>
              <b-form-text class="text-right">
                {{ comment.length }}/{{ commentLimit }}
              </b-form-text>
            </b-form>
          </b-card-text>

          <b-card-sub-title>Text Color</b-card-sub-title>
          <b-card-text>
            <b-form>
              <b-form-radio-group v-model="color">
                <b-form-radio
                  v-for="(color, index) in colors"
                  :key="index"
                  :value="color.value"
                  :style="{color: color.value}">{{ color.text }}</b-form-radio>
              </b-form-radio-group>
            </b-form>
          </b-card-text>

          <b-card-sub-title>Shortcuts</b-card-sub-title>
          <b-card-text>
            <b-button
              class="m-2"
              variant="outline-success"
              size="sm"
              :disabled="false"
              @click="onClickShortcut">いいね</b-button>
            <b-button
              class="m-2"
              variant="outline-success"
              size="sm"
              :disabled="false"
              @click="onClickShortcut">気になる</b-button>
            <b-button
              class="m-2"
              variant="outline-success"
              size="sm"
              :disabled="false"
              @click="onClickShortcut">すこ</b-button>
          </b-card-text>
        </b-card>

        <b-alert
          class="mt-3"
          :show="isError"
          variant="danger">
          Connection fail.
        </b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { w3cwebsocket } from 'websocket'

export default {
  data () {
    return {
      comment: '',
      color: 'inherit',
      colors: [
        { value: 'inherit', text: 'Default'},
        { value: 'red',     text: 'Red'},
        { value: 'yellow',  text: 'Yellow'},
        { value: 'green',   text: 'Green'},
        { value: 'cyan',    text: 'Cyan'},
        { value: 'blue',    text: 'Blue'},
        { value: 'magenta', text: 'Magenta'},
      ],
      commentLimit: 50,
      isDisabled: false,
      isSending: false,
      isError: false,
      socket: null,
      eventTimeout: {
        reopen: null,
      },
      eventInterval: {
        sendPing: null,
      },
    }
  },
  computed: {
    commentState() {
      return this.comment.length > 0 && this.comment.length <= this.commentLimit
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.isDisabled = true
      this.isSending = true
      window.setTimeout(() => {
        this.isDisabled = false
        this.isSending = false
        this.comment = ''
      }, 1000)
      this.sendMsg(this.comment)
    },
    onClickShortcut(e) {
      e.target.disabled = true
      window.setTimeout(() => {
        e.target.disabled = false
      }, 1000)
      this.sendMsg(e.target.textContent)
    },
    sendMsg(msg) {
      this.socket.send(JSON.stringify({
        comment: msg,
        color: this.color,
      }))
    },
    connectionWS() {
      this.socket = new w3cwebsocket(`ws://${window.location.host}/ws/${this.$route.params.id}`)
      this.socket.onopen = (e) => {
        window.console.log('websocket open')
        window.console.log(e)

        this.isError = false
      },
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
    }
  },
  created() {
    this.connectionWS()
  },
  mounted () {
  },
  destroyed () {
    this.socket.close()
    window.clearTimeout(this.eventTimeout.reopen)
  },
}
</script>

