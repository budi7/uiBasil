<template>
  <div class="row align-items-center title-header">
    <div v-if="isShowSelectBox" class="col-auto px-2 text-right">
      <div
        class="row mx-0 select-group"
        @click="$emit('select', !isSelected)"
      >
        <div class="check d-flex pl-2">
          <img v-show="!isSelected" src="~/assets/img/check.svg" width="13">
          <img v-show="isSelected" src="~/assets/img/checked.svg" width="13">
        </div>
      </div>
    </div>
    <div class="col-3 px-2">
      <div class="d-flex flex-row align-items-center">
        <p class="mb-0 list-text">
          {{ labelPage.name[lang] }}<br>
        </p><span class="ms-auto" />
      </div>
    </div>
    <div class="col px-2">
      <p class="mb-0 list-text">
        {{ labelPage.group[lang] }}<br>
      </p>
    </div>
    <div class="col px-2 text-center">
      <p class="mb-0 list-text">
        {{ labelPage.varian[lang] }}<br>
      </p>
    </div>
    <div class="col px-2 text-center">
      <p class="mb-0 list-text">
        {{ labelPage.addons[lang] }}<br>
      </p>
    </div>
    <div class="col px-2 text-center">
      <p class="mb-0 list-text">
        {{ labelPage.status[lang] }}<br>
      </p>
    </div>
    <div class="col px-2 text-right">
      <p class="mb-0 list-text">
        {{ labelPage.price[lang] }}<br>
      </p>
    </div>
    <div v-show="!isShowSelectBox" :class="`col-auto text-right ${!isShowSelectBox ? 'px-2' : 'px-2 ml-3'}`">
      <b-dropdown
        :class="`${!isShowSelectBox ? 'mr-1 ml-3 p-0' : 'ml-1 p-0'}`"
        variant="link"
        size="small"
        toggle-class="text-decoration-none"
        no-caret
        right
      >
        <template #button-content>
          <b-icon-three-dots-vertical />
        </template>
        <b-dropdown-item
          v-for="(menu, i) in dropMenu"
          :key="`menu-title-${i}`"
          @click="$emit('menuClicked',i)"
        >
          {{ menu[lang] }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isSelected: {
      default: false,
      type: Boolean
    },
    isShowSelectBox: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      lang: this.$store.getters['app/getLanguage'],
      labelPage: require('~/json/label_page.json').catalog.index.table,
      dropMenu: require('~/json/dropdownmenu.json').catalog.indexTitle
    }
  }
}
</script>
