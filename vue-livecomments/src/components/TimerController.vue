<template>
  <b-card class="bg-transparent text-center" border-variant="light">
    <timer></timer>

    <b-row>
      <b-col sm="2">
      </b-col>
      <b-col sm="8">
        <b-button
          variant="outline-light"
          @click="onClickToggle">
          <font-awesome-icon
            v-if="active"
            icon="pause"></font-awesome-icon>
          <font-awesome-icon
            v-else
            icon="play"></font-awesome-icon>
        </b-button>
        <b-button
          variant="outline-light"
          class="ml-3"
          @click="onClickStop">
          <font-awesome-icon icon="stop"></font-awesome-icon>
        </b-button>
      </b-col>
      <b-col sm="2" class="text-right">
        <b-button
          variant="outline-light"
          v-b-modal.modal-timer>
          <font-awesome-icon icon="cog"></font-awesome-icon>
        </b-button>
        <b-modal
          id="modal-timer"
          class="text-body text-left"
          title="Timer Settings"
          centered
          hide-footer
          @show="$emit('show')"
          @hide="$emit('hide')">
          <b-form-checkbox
            v-model="hasSound"
            switch>
            Sound
          </b-form-checkbox>
        </b-modal>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import Timer from '@/components/Timer.vue'

export default {
  components: {
    Timer,
  },
  data () {
    return {
      eventInterval: {
        countTimer: null,
      },
    }
  },
  computed: {
    active () {
      return this.$store.state.timer.active
    },
  },
  methods: {
    onClickToggle() {
      this.$store.commit('activeTimer', !this.active)
      if (this.active) {
        this.eventInterval.countTimer = window.setInterval(this.countTimer, 1000)
        return
      }
      this.clearTimer()
    },
    onClickStop() {
      if (this.eventInterval.countTimer) {
        this.clearTimer()
      }
      this.$store.commit('stopTimer')
    },

    /* Timer */
    countTimer() {
      this.$store.commit('countTimer', 1000)
      if (this.$store.state.timer === this.$store.state.count) {
        this.$store.commit('activeTimer', false)
        this.clearTimer()
      }
    },
    clearTimer() {
      window.clearInterval(this.eventInterval.countTimer)
      this.eventInterval.countTimer = null
    },
  },
}
</script>
