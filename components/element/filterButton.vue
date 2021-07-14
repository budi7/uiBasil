<template>
  <div class="input-group dropdown-topmost input-group-sm">
    <b-dropdown
      v-if="menu.filter"
      variant="link"
      size="small"
      toggle-class="text-decoration-none p-0"
      no-caret
      right
    >
      <template #button-content>
        <span
          class="clickable dropdown input-group-text no-border right mr-2"
        >
          <img src="~/assets/img/filter.svg" width="12" @click="q = null">
            &nbsp;
            &nbsp;
          <img src="~/assets/img/down-filled-triangular-arrow.svg" width="10" @click="q = null">
        </span>
      </template>
      <b-dropdown-item
        v-for="(dt,i) in menu.filter"
        :key="'f-' + i"
        :active="currentFilter.indexOf(i) >= 0"
        @click="$emit('filterTrigger', i)"
      >
        {{ dt.label[lang] }}
      </b-dropdown-item>
    </b-dropdown>

    <b-dropdown
      v-if="menu.sort"
      variant="link"
      size="small"
      toggle-class="text-decoration-none p-0"
      no-caret
      right
      menu-class="topmost"
    >
      <template #button-content>
        <span class="clickable dropdown input-group-text no-border right">
          <img src="~/assets/img/sort.svg" width="12" @click="q = null">
            &nbsp;
            &nbsp;
          <img src="~/assets/img/down-filled-triangular-arrow.svg" width="10" @click="q = null">
        </span>
      </template>
      <b-dropdown-item
        v-for="(dt,i) in menu.sort"
        :key="'s-' + i"
        :active="i === currentSort"
        @click="() => {
          $emit('sortTrigger', i)
          currentSort = i
        }"
      >
        {{ dt.label[lang] }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      default: () => { return {} },
      type: Object
    }
  },
  data () {
    return {
      lang: this.$store.getters['app/getLanguage'],
      gvm: this,
      currentFilter: [],
      currentSort: null
    }
  }
}
</script>
