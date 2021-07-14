<template>
  <div :class="'input-group input-group-sm w-auto ' + wrapperClass">
    <!-- <input v-model="q" type="text" class="form-control" readonly> -->
    <div class="input-group-append">
      <span
        class="clickable dropdown filter-title text-capitalize round left input-group-text no-border all"
        @click="$emit('open')"
      >
        {{ functionFilterTranslateFilter(data.value, data.prototype, data.options, lang ) }}
        &nbsp;
        <img src="~/assets/img/down-filled-triangular-arrow.svg" width="10">
      </span>
    </div>
    <div class="input-group-append separator" />
    <div class="input-group-append">
      <span
        class="clickable dropdown round right input-group-text no-border"
        @click="$emit('clear')"
      >
        <img src="~/assets/img/close.svg" width="10">
      </span>
    </div>
  </div>
</template>

<script>
import functionFilter from '~/functions/filter'

export default {
  props: {
    wrapperClass: {
      default: '',
      type: String
    },
    data: {
      default: () => {
        return {
          prototype: {},
          value: {}
        }
      },
      type: Object
    }
  },
  data () {
    return {
      q: 'null',
      lang: this.$store.getters['app/getLanguage']
    }
  },
  computed: {
    // isHide () {
    //   // checking type
    //   if (typeof this.data.value !== typeof this.data.prototype.value) {
    //     return false
    //   }

    //   switch (typeof this.data.value) {
    //     case 'object':
    //       if (Array.isArray(this.data.prototype.value)) {
    //         return isArrayEqual(this.data.value, this.data.prototype.value)
    //       }
    //       return isObjectEqual(this.data.value, this.data.prototype.value)
    //     default:
    //       return this.data.value === this.data.prototype.value
    //   }
    // }
  },
  methods: {
    ...functionFilter
  }
}
</script>

<style lang="scss" scoped>
  .filter-title {
    font-size: 80% !important;
  }
</style>
