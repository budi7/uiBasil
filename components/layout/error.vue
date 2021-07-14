<template>
  <div class="d-flex flex-column">
    <div class="text-center pt-4 mt-5 mb-4">
      <img v-if="!noImage" src="~/assets/img/error.svg" class="mb-3" style="width:13rem;opacity:.85">
      <p class="mb-5 text-muted">
        {{ label }}
      </p>
      <p v-if="action" class="link-icon p-2 small" @click="$emit('action')">
        {{ action }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: ''
    },
    noImage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
