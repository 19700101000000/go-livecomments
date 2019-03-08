<template>
  <b-container class="h-100">
    <b-row class="align-items-end h-50">
      <b-col class="mx-auto pb-3">
        <b-card
          title="Comment Form">
          <b-card-text>
            <b-form-input
              v-model="comment"
              type="text"
              :state="commentState"
              :disabled="isDisabled"
              placeholder="your comment"></b-form-input>
            <b-form-text class="text-right">
              {{ comment.length }}/{{ commentLimit }}
            </b-form-text>
          </b-card-text>
          <b-row>
            <b-col>
              <b-spinner
                small
                variant="primary"
                v-if="isSending"></b-spinner>
            </b-col>
            <b-col class="text-right">
              <b-button
                class="ml-2"
                variant="outline-primary"
                :disabled="!commentState || isDisabled"
                @click="onClickSend">
                Send
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>

    </b-row>
    <b-row class="h-50">
      <b-col>
          <b-alert
            :show="isError"
            variant="danger"
            dismissible
            @dismissed="isError=false">
            Connection failed.
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
      commentLimit: 50,
      isDisabled: false,
      isSending: false,
      isError: false,
      socket: new w3cwebsocket(`ws://${window.location.host}/ws/${this.$route.params.id}`)
    }
  },
  computed: {
    commentState() {
      return this.comment.length > 0 && this.comment.length <= this.commentLimit
    },
  },
  methods: {
    onClickSend() {
      this.isDisabled = true
      this.isSending = true
      this.socket.send(this.comment)
      window.setTimeout(() => {
        this.isDisabled = false
        this.isSending = false
        // this.isError = true
        this.comment = ''
      }, 1000)
    }
  },
  created() {
    this.socket.onerror = () => {
      window.console.log('websocket error')
    }
    this.socket.onclose = () => {
      window.console.log('websocket close')
    }
  },
}
</script>

