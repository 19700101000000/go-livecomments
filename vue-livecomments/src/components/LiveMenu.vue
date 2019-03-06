<template>
  <b-container id="live-screen-menu" class="h-100" fluid>
    <b-row class="h-25 pt-3">
      <b-col>
        <b-button
          variant="outline-light"
          v-b-modal.modal-qr>
            <font-awesome-icon icon="qrcode"></font-awesome-icon>
        </b-button>
        <b-modal
          id="modal-qr"
          class="text-center"
          @show="onFocusQR"
          @hide="onBlurQR"
          centered
          hide-header
          hide-footer>
          <qrcode-vue
            class="m-4"
            value="https://19700101000000.com"
            :size="400"></qrcode-vue>
        </b-modal>
      </b-col>

      <b-col class="text-right">
        <b-button
          variant="outline-light"
          disabled>
          <font-awesome-icon icon="list"></font-awesome-icon>
        </b-button>
      </b-col>
    </b-row>

    <b-row class="h-50 align-items-center">
      <b-col sm="6" class="mx-auto text-light">
        <timer-controller></timer-controller>
      </b-col>
    </b-row>

    <b-row class="h-25 align-items-end pb-3">
      <b-col>
        <b-button
          variant="outline-light"
          disabled>
            <font-awesome-icon icon="cog"></font-awesome-icon>
        </b-button>
      </b-col>

      <b-col class="mx-auto text-right">
        <b-button
          variant="danger"
          @click="onClickDummyComment">
          Dummy Comment
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import TimerController from '@/components/TimerController.vue'

export default {
  components: {
    QrcodeVue,
    TimerController,
  },
  data () {
    return {
      autoHide: true,
    }
  },
  methods: {
    onClickDummyComment () {
      this.$emit('clickDummyComment')
    },
    onFocusQR () {
      this.autoHide = false
      this.$emit('autoHide', this.autoHide)
    },
    onBlurQR () {
      this.autoHide = true
      this.$emit('autoHide', this.autoHide)
    },
  }
}
</script>

<style scope>
#live-screen-menu {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
