<template>
  <div>
    <b-form-group
      label="Background Color">
      <b-form-radio-group
        v-model="bgColor"
        button-variant="outline-dark"
        buttons
        @change="onChangeBgColor">
        <b-form-radio
          value="black">
          Black
        </b-form-radio>
        <b-form-radio
          value="white">
          White
        </b-form-radio>
      </b-form-radio-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgColor: this.$store.state.bgColor,
    }
  },
  methods: {
    onChangeBgColor (bgcolor) {
      let color = 'black'
      if (bgcolor === 'black') {
        color = 'white'
      }
      this.$store.commit('setBgColor', bgcolor)
      this.$store.commit('setColor', color)
    }
  },
}
</script>
