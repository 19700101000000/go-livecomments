<template>
  <b-container>
    <b-row class="mt-3">
      <b-col>
        <b-alert
          :show="isError"
          variant="danger">
          Connection fail.
        </b-alert>

        <b-card
          title="Comment Form">
          <b-card-text>
            <b-form action="#" @submit="onSubmit">
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

          <b-card-text>
            <b-card-sub-title>Text Color</b-card-sub-title>
            <b-form-radio-group v-model="color">
              <b-form-radio
                v-for="(color, index) in colors"
                :key="index"
                :value="color.value"
                :style="{color: color.value}">
                Text
              </b-form-radio>
            </b-form-radio-group>
          </b-card-text>

          <b-card-text>
            <b-card-sub-title>Shortcuts</b-card-sub-title>
            <b-tabs
              small>
              <b-tab
                v-for="(shortcut, index) in shortcuts"
                :key="index"
                :title="shortcut.title">
                <b-button
                  v-for="(text, index) in shortcut.texts"
                  :key="index"
                  class="m-2"
                  variant="outline-success"
                  size="sm"
                  :disabled="isDisabled"
                  @click="onClickShortcut">{{ text }}</b-button>
              </b-tab>
            </b-tabs>
          </b-card-text>
        </b-card>
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
        { value: 'inherit'},
        { value: 'deeppink'},
        { value: 'orangered'},
        { value: 'darkorange'},
        { value: 'lime'},
        { value: 'forestgreen'},
        { value: 'aqua'},
        { value: 'royalblue'},
      ],
      shortcuts: [
        {
          title: 'en.',
          texts: [
            'lol',
            'GJ',
            'fav',
            'like',
            '10',
            '9',
            '8',
            '7',
            '6',
            '5',
            '4',
            '3',
            '2',
            '1',
            '0',
          ],
        },
        {
          title: 'ja.',
          texts: [
            'いいね',
            '期待',
            '初見',
            'すこ',
            'うぇーい',
            '8888888888',
            'ナイスよかったい',
          ],
        },
      ],
      commentLimit: 50,
      isDisabled: false,
      isSending: false,
      isError: false,
      socket: null,
      eventTimeout: {
        reopen: null,
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
      if (this.isDisabled || this.comment.length === 0 || this.comment.length > this.commentLimit) {
        return
      }
      this.isDisabled = true
      this.isSending = true
      window.setTimeout(() => {
        this.isDisabled = false
        this.isSending = false
        this.comment = ''
      }, 800)
      this.sendMsg(this.comment)
    },
    onClickShortcut(e) {
      this.isDisabled = true
      window.setTimeout(() => {
      this.isDisabled = false
      }, 800)
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
      this.socket.onopen = () => {
        window.console.log('websocket open')

        this.isError = false
      },
      this.socket.onerror = () => {
        window.console.log('websocket error')
      }
      this.socket.onclose = () => {
        window.console.log('websocket close')

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

