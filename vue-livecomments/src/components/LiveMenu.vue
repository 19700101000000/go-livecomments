<template>
  <b-container id="live-screen-menu" class="h-100" fluid>
    <b-row class="h-100 align-items-end pb-3">
      <b-col>
        <b-button
          variant="outline-light">
          Timer Setting
        </b-button>
        <b-button
          variant="outline-light"
          class="ml-3">
          Live Setting
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
export default {
  methods: {
    onClickDummyComment () {
      this.$emit('clickDummyComment')
    },
  }
}
</script>

<style scope>
#live-screen-menu {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
