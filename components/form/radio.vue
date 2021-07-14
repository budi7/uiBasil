<template>
  <div>
    <div class="custom-control custom-radio">
      <input id="radio-component" v-model="val" type="radio" class="custom-control-input">
      <label v-if="label" class="custom-control-label" for="radio-component">{{ label }}</label>
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
