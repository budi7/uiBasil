<template>
  <div class="body-center-submenu py-2">
    <div class="top">
      <div class="row my-4 mx-0">
        <div class="col-8">
          <p class="title mb-0">
            {{ title[lang] }}
          </p>
        </div>
        <div class="col-4 d-flex justify-content-end">
          <p class="link-icon">
            <img class="rotate-left" src="~/assets/img/up-arrow-angle.svg" width="10">
          </p>
        </div>
      </div>
      <div class="row mx-0 mb-3">
        <div class="col-12 px-2">
          <compSearchbar :placeholder="compLabel.searchaction[lang]" direction="all" />
        </div>
      </div>
    </div>
    <div class="content scroll">
      <template v-for="(dt,i) in menus">
        <div
          :key="'menu-' + i"
          class="row mx-0"
        >
          <div class="col-12 pt-2 pb-1">
            <p class="mb-0 description">
              {{ dt.label[lang] }}
            </p>
          </div>
        </div>

        <div
          v-for="(_dt,_i) in dt.submenus"
          :key="'sm-' + i + '-' + _i"
          class="row mx-0 icon-wrapper"
        >
          <div class="col py-2 clickable" @click="navigateTo(gvm, _dt.url, true)">
            <p class="mb-0 minititle">
              {{ _dt.label[lang] }}<span class="pull-right"><img class="rotate-right icon icon text-small" src="~/assets/img/up-arrow-angle.svg"></span>
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import functionNavigation from '~/functions/navigation'
import compSearchbar from '~/components/element/searchbar.vue'
import label from '~/json/label_general'

export default {
  components: {
    compSearchbar
  },
  props: {
    menus: {
      default: () => { return {} },
      type: Object
    },
    title: {
      default: () => { return {} },
      type: Object
    }
  },
  data () {
    return {
      gvm: this,
      lang: this.$store.getters['app/getLanguage'],
      compLabel: label
    }
  },
  methods: {
    ...functionNavigation
  }
}
</script>

<style>

</style>
