<template>
  <div>
    <b-form-file
      v-model="val"
      :placeholder="placeholder"
      :drop-placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
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
