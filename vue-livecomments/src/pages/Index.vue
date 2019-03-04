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
            size="sm"
            @click="onClickNew"
            :disabled="isDisabled">
            <b-spinner small v-if="isDisabled"></b-spinner>
            New Live
          </b-button>
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
          this.$router.push({ path: `/live/${r.data.livekey}`})
        })
        .catch(e => {
          window.console.log(e)
          this.isError = true
          this.isDisabled = false
        })
    }
  },
}
</script>
