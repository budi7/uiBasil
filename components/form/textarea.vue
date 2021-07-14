<template>
  <div>
    <textarea v-model="val" class="form-control" :rows="rows" :cols="cols" :placeholder="placeholder" />
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
    },
    rows: {
      type: Number,
      default: 2
    },
    cols: {
      type: Number,
      default: 5
    },
    noresize: {
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
