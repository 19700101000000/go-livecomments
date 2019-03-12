<template>
  <b-card class="bg-transparent text-center" border-variant="light">
    <timer></timer>

    <b-row>
      <b-col sm="2">
      </b-col>
      <b-col sm="8">
        <b-button
          variant="outline-light"
          :disabled="disabledToggle"
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
          :disabled="disabledStop"
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
          <b-form-group
            label="Timer: Time">
            <b-form-radio-group
              v-model="time"
              buttons
              button-variant="outline-dark">
              <b-form-radio :value="10 * 60 * 1000">10:00</b-form-radio>
              <b-form-radio :value="7 * 60 * 1000">07:00</b-form-radio>
              <b-form-radio :value="5 * 60 * 1000">05:00</b-form-radio>
              <b-form-radio :value="3 * 60 * 1000">03:00</b-form-radio>
              <b-form-radio :value="2 * 60 * 1000">02:00</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox
              v-model="hasSoundOneMinute"
              slot="label"
              switch>
              Sound: One Minute Remaining
            </b-form-checkbox>
            <b-form-file
              v-model="fileSoundOneMinute"
              placeholder="Choose a Sound File"
              drop-placeholder="Drop Sound File here"
              :state="Boolean(fileSoundOneMinute)"
              :disabled="!hasSoundOneMinute"
              @change="onChangeSoundOneMinute"></b-form-file>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox
              v-model="hasSoundTimeUP"
              slot="label"
              switch>
              Sound: Time UP
            </b-form-checkbox>
            <b-form-file
              v-model="fileSoundTimeUP"
              placeholder="Choose a Sound File"
              drop-placeholder="Drop Sound File here"
              :state="Boolean(fileSoundTimeUP)"
              :disabled="!hasSoundTimeUP"
              @change="onChangeSoundTimeUP"></b-form-file>
          </b-form-group>
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
      hasSoundTimeUP: false,
      fileSoundTimeUP: null,
      audioSoundTimeUP: null,

      hasSoundOneMinute: false,
      fileSoundOneMinute: null,
      audioSoundOneMinute: null,
    }
  },
  computed: {
    active () {
      return this.$store.state.timer.active
    },
    time: {
      get () {
        return this.$store.state.timer.time
      },
      set (time) {
        this.$store.commit('setTime', time)
      },
    },
    disabledToggle () {
      return this.$store.state.timer.time === this.$store.state.timer.count
    },
    disabledStop () {
      return this.$store.state.timer.count === 0
    }
  },
  methods: {
    onChangeSoundTimeUP(e) {
      if (e.target.files.length === 0) {
        this.onChooseAlert(e)
        return
      }
      const file = e.target.files[0]
      if (!/^audio/.test(file.type)) {
        this.onChooseAlert(e)
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target) {
          this.audioSoundTimeUP = new Audio(e.target.result)
          this.audioSoundTimeUP.addEventListener('error', () => {
            window.alert('This Sound is Not Played.')
            this.audioSoundTimeUP = null
          })
        }
      }
      reader.readAsDataURL(file)
    },
    onChangeSoundOneMinute(e) {
      if (e.target.files.length === 0) {
        this.onChooseAlert(e)
        return
      }
      const file = e.target.files[0]
      if (!/^audio/.test(file.type)) {
        this.onChooseAlert(e)
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target) {
          this.audioSoundOneMinute = new Audio(e.target.result)
          this.audioSoundOneMinute.addEventListener('error', () => {
            window.alert('This Sound is Not Played.')
            this.audioSoundOneMinute = null
          })
        }
      }
      reader.readAsDataURL(file)
    },
    onChooseAlert(e) {
        window.alert('Choose a Sound File!')
        e.target.value = null
    },
    onClickToggle() {
      this.$store.commit('activeTimer', !this.active)
      if (this.active) {
        this.eventInterval.countTimer = window.setInterval(this.countTimer, 1000)
        return
      }
      this.soundPause()
      this.clearTimer()
    },
    onClickStop() {
      if (this.eventInterval.countTimer) {
        this.clearTimer()
      }
      this.soundPause()
      this.soundStop()
      this.$store.commit('stopTimer')
    },

    soundPause() {
      if (this.audioSoundOneMinute !== null) {
        this.audioSoundOneMinute.pause()
      }
      if (this.audioSoundTimeUP !== null) {
        this.audioSoundTimeUP.pause()
      }
    },
    soundStop() {
      if (this.audioSoundOneMinute !== null) {
        this.audioSoundOneMinute.currentTime = 0
      }
      if (this.audioSoundTimeUP !== null) {
        this.audioSoundTimeUP.currentTime = 0
      }
    },
    soundOneMinute() {
      if (!this.hasSoundOneMinute || this.audioSoundOneMinute === null || this.fileSoundOneMinute == null) {
        return
      }
      const timer = this.$store.state.timer.time - this.$store.state.timer.count
      if (timer === 60 * 1000) {
        this.audioSoundOneMinute.play()
      }
    },
    soundTimeUP() {
      if (!this.hasSoundTimeUP || this.audioSoundTimeUP === null || this.fileSoundTimeUP == null) {
        return
      }
      this.audioSoundTimeUP.play()
    },
    /* Timer */
    countTimer() {
      this.$store.commit('countTimer', 1000)
      this.soundOneMinute()
      if (this.$store.state.timer.time === this.$store.state.timer.count) {
        this.soundTimeUP()
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
