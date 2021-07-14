<template>
  <span v-if="Array.isArray(e)">
    <p v-for="(x,i) in e" :key="i" class="text-danger text-capitalize mb-0">{{ translateError(x) }}</p>
  </span>
</template>

<script>
import errorTranslator from '~/modules/translator/formError'

export default {
  props: {
    e: {
      type: Array,
      default: () => { return [] }
    },
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    translateError (x) {
      return errorTranslator(x, this.name, this.$store.getters['modules/app/getLanguage'])
    }
  }
}
</script>

<style lang="scss" scoped>
span {
p {
font-size: 90%;
padding-top: .5rem;
padding-left: .25rem;
}
}
</style>
