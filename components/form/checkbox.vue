<template>
  <div>
    <div :class="`custom-control ${!switches ? 'custom-checkbox' : 'custom-switch'}`">
      <input id="checkbox-component" v-model="val" type="checkbox" class="custom-control-input">
      <label v-if="label" class="custom-control-label" for="checkbox-component">{{ label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    switches: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      val: this.value
    }
  },
  watch: {
    value (v) {
      this.val = v
    },
    val (v) {
      this.$emit('input', v)
    }
  }
}
</script>
