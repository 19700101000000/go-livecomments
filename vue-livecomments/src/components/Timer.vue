<template>
  <b-container class="h-100">
    <b-row class="h-100 align-items-center">
      <b-col sm="4" class="text-center mx-auto">
        <b-card
          :title="timer"
          :sub-title="count + ''"></b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  computed: {
    timer () {
      const time  = this.$store.state.timer.time
      const count = this.$store.state.timer.count
      const remaining = time - count

      const second = 1000
      const minute = 60 * second
      const hour   = 60 * minute

      const hours   = Math.floor(remaining / hour)
      const minutes = Math.floor(remaining % hour / minute)
      const seconds = Math.floor(remaining % minute / second)
      return `${`0${hours}`.slice(-2)}:${`0${minutes}`.slice(-2)}:${`0${seconds}`.slice(-2)}`
    },
    count () {
      const count = this.$store.state.timer.count

      const second = 1000
      const minute = 60 * second
      const hour   = 60 * minute

      const hours   = Math.floor(count / hour)
      const minutes = Math.floor(count % hour / minute)
      const seconds = Math.floor(count % minute / second)
      return `${`0${hours}`.slice(-2)}:${`0${minutes}`.slice(-2)}:${`0${seconds}`.slice(-2)}`
    }
  }
}
</script>
