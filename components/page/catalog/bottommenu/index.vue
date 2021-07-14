<template>
  <div class="row mx-0 h-100">
    <div class="col py-2 pl-0 pr-1 d-flex align-items-left align-items-center">
      <layoutManager
        :is-loading="isLoading"
        :is-error="false"
        :is-empty="totalData === 0"
        class="w-100"
      >
        <template #loader>
          <b-skeleton
            height="21px"
            no-aspect="true"
            class="mt-2"
          />
        </template>
        <template #empty>
          <p class="description mb-0">
            0 {{ labelGeneral.data[lang] }} / 0 {{ labelGeneral.page[lang] }}
          </p>
        </template>
        <template #content>
          <template v-if="isSelecting">
            <p class="mb-0 minititle link-icon">
              {{ totalSelected }} {{ labelGeneral.selected[lang] }}
            </p>
            <p class="description small pt-1 mb-0">
              {{ formatNumber(totalData) }} {{ labelGeneral.data[lang] }} / {{ formatNumber(totalPage) }} {{ labelGeneral.page[lang] }}
            </p>
          </template>
          <template v-else>
            <p class="description mb-0">
              {{ formatNumber(totalData) }} {{ labelGeneral.data[lang] }} / {{ formatNumber(totalPage) }} {{ labelGeneral.page[lang] }}
            </p>
          </template>
        </template>
      </layoutManager>
    </div>
    <div class="col p-2 px-1 d-flex align-items-center justify-content-center">
      <compPagination
        :current-page="currentPage"
        :max-page="totalPage"
        @pageChanged="(dt) => {$emit('pageChanged', dt)}"
      />
    </div>
    <div class="col py-2 pl-1 pr-0 d-flex align-items-center justify-content-end">
      <slot name="action" />
    </div>
    <div />
  </div>
</template>

<script>
import compPagination from '~/components/element/pagination.vue'
import { formatNumber } from '~/modules/js-module-numberFormat'

export default {
  components: {
    compPagination
  },
  props: {
    isLoading: {
      default: false,
      type: Boolean
    },
    totalData: {
      default: 0,
      type: Number
    },
    totalPage: {
      default: 0,
      type: Number
    },
    totalSelected: {
      default: 0,
      type: Number
    },
    currentPage: {
      default: 1,
      type: Number
    },
    isSelecting: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      lang: this.$store.getters['app/getLanguage'],

      // structures
      labelGeneral: require('~/json/label_general'),
      dropMenu: require('~/json/dropdownmenu.json').catalog
    }
  },
  methods: {
    formatNumber
  }
}
</script>
