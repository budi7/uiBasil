<template>
  <div>
    <multiselect
      v-model="val"
      :options="option"
      :searchable="true"
      :close-on-select="true"
      :taggable="true"
      :placeholder="placeholder"
      @tag="addtag"
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
    }
  },
  data () {
    return {
      val: this.value,
      option: this.options
    }
  },
  watch: {
    value (v) {
      this.val = v
    },
    val (v) {
      this.$emit('input', v)
    },
    options (v) {
      this.option = v
    }
  },
  methods: {
    addtag (newtag) {
      const tag = newtag.toLowerCase()
      this.option.push(tag)
      this.val = tag
    }
  }
}
</script>
