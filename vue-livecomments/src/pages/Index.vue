<template>
  <b-container class="h-100">
    <b-row class="align-items-center h-100">
      <b-col sm="6" class="mx-auto">
        <b-card
          title="LiveComments"
          class="text-center">
          <b-alert
            :show="isError"
            variant="danger"
            dismissible
            @dismissed="isError=false">
            Connection failed.
          </b-alert>
          <b-button
            variant="outline-primary"
            @click="onClickNew"
            :disabled="isDisabled">
            <b-spinner small v-if="isDisabled"></b-spinner>
            Start a New Live
          </b-button>
          <hr>
          <b-card-text class="text-secondary">
            Please use it on a PC.
            <br>
            Supported environments: The latest Chrome and Firefox.
            <br>
            More than 800x600px.
          </b-card-text>
          <b-card-text class="text-secondary">
            Bata Version.
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      isDisabled: false,
      isError: false,
    }
  },
  methods: {
    onClickNew () {
      this.isDisabled = true
      window.setTimeout(this.newLive, 800)
    },
    newLive () {
      axios
        .get('/api/newlive')
        .then(r => {
          this.$store.commit('livekey', r.data.livekey)
          this.$router.push({ path: '/live'})
        })
        .catch(() => {
          this.isError = true
          this.isDisabled = false
        })
    }
  },
}
</script>
