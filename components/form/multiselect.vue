<template>
  <div>
    <multiselect
      v-model="val"
      :options="options"
      :searchable="search"
      :close-on-select="true"
      :placeholder="placeholder"
    />
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
    options: {
      type: Array,
      default () { return [] }
    },
    search: {
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
