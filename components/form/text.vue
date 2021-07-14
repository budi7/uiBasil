<template>
  <div>
    <input v-model="val" type="text" class="form-control" :placeholder="placeholder">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
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
