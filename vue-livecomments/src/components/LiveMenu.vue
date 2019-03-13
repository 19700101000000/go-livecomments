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
          title="Comment Form"
          @show="onShowModal"
          @hide="onHideModal"
          centered>
          <qrcode-vue
            class="p-4"
            :value="qrValue"
            :size="400"></qrcode-vue>
          <div
            slot="modal-footer">
            <b-link
              target="_blank"
              :href="qrValue">
              Comment Form
              <font-awesome-icon icon="external-link-alt"></font-awesome-icon>
            </b-link>
          </div>
        </b-modal>
      </b-col>

      <b-col class="text-right">
        <b-button
          variant="outline-light"
          v-b-modal.modal-comments>
          <font-awesome-icon icon="list"></font-awesome-icon>
        </b-button>
        <b-modal
          id="modal-comments"
          class="text-left"
          title="Comments History"
          size="lg"
          scrollable
          @show="onShowModal"
          @hide="onHideModal">
          <b-table
            striped
            hover
            :fields="commentFields"
            :items="comments"></b-table>
          <div
            class="text-right"
            slot="modal-footer">
            <b-button
              variant="outline-secondary"
              @click="onOutputCSV">
              Output CSV
            </b-button>
          </div>
        </b-modal>
      </b-col>
    </b-row>

    <b-row class="h-50 align-items-center">
      <b-col sm="6" class="mx-auto text-light">
        <timer-controller
          @show="onShowModal"
          @hide="onHideModal"></timer-controller>
      </b-col>
    </b-row>

    <b-row class="h-25 align-items-end pb-3">
      <b-col>
        <b-button
          variant="outline-light"
          v-b-modal.modal-settings>
            <font-awesome-icon icon="cog"></font-awesome-icon>
        </b-button>
        <b-modal
          id="modal-settings"
          title="Settings"
          centered
          hide-footer
          @show="onShowModal"
          @hide="onHideModal">
          <live-settings></live-settings>
        </b-modal>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import TimerController from '@/components/TimerController.vue'
import LiveSettings from '@/components/LiveSettings.vue'

export default {
  components: {
    QrcodeVue,
    TimerController,
    LiveSettings,
  },
  props: [
    'comments',
  ],
  data () {
    return {
      autoHide: true,
      qrValue: `https://${window.location.host}/comment/${this.$store.state.livekey || ''}`,
      commentFields: [
        { key: 'datetime', sortable: true },
        { key: 'comment', sortable: false },
      ],
    }
  },
  methods: {
    onShowModal () {
      this.autoHide = false
      this.$emit('autoHide', this.autoHide)
    },
    onHideModal () {
      this.autoHide = true
      this.$emit('autoHide', this.autoHide)
    },
    onOutputCSV () {
      let csv = 'datetime,comment\n'
      for (let i in this.comments) {
        csv += `${this.comments[i].datetime},${this.comments[i].comment.replace(/,/g, '&comma;')}\n`
      }
      const element = window.document.createElement('a')
      element.href = 'data:text/csv;charset=utf-8,'+encodeURI(csv)
      element.target = '_blank'
      element.download = 'comments.csv'
      element.click()
    },
  }
}
</script>

<style scope>
#live-screen-menu {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
