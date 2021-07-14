<template>
  <div :class="'input-group input-group-sm searchbar ' + direction ">
    <div class="input-group-prepend">
      <span class="input-group-text left">
        <img class="icon" src="~/assets/img/search.svg" width="10">
      </span>
    </div>
    <input v-model="q" type="text" class="form-control" :placeholder="placeholder">
    <div class="input-group-append">
      <span class="input-group-text right">
        <img v-show="q" class="clickable" src="~/assets/img/close.svg" width="10" @click="q = null">
      </span>
    </div>
  </div>
</template>

<script>
import debounce from '~/modules/js-module-debouncer'

export default {
  props: {
    direction: {
      default: 'right',
      type: String
    },
    placeholder: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      q: null
    }
  },
  watch: {
    q (nv) {
      debounce(() => {
        this.$emit('search', nv || null)
      }, 250)
    }
  }
}
</script>
