<template>
  <div>
    <b-modal
      v-model="isModalShow"
      content-class="rounded"
      :title="structure.label[lang]"
      size="sm"
      centered
    >
      <template #default>
        <div class="modal-wrapper">
          <div v-if="withSearchbar" class="topbar">
            <compSearch
              direction="all"
              @search="(dt) => { searchQuery = dt }"
            />
          </div>
          <div class="content">
            <layoutManager
              :is-loading="false"
              :is-error="false"
              :is-empty="!options || options.length === 0"
              class="w-100"
            >
              <template #empty>
                <layoutEmpty
                  :label="labelGeneral.empty[lang]"
                />
              </template>
              <template #content>
                <div v-for="(dt,i) in functionCart.carts" :key="'os-' + i">
                  <div
                    v-if="!searchQuery || dt.toLowerCase().includes(searchQuery)"
                    class="row mx-0 select-group"
                    @click="functionCart.togle(dt)"
                  >
                    <div class="check d-flex pl-3">
                      <img src="~/assets/img/checked.svg" width="13">
                    </div>
                    <div class="col-auto py-3">
                      <p class="mb-0 minititle">
                        {{ structure.options && structure.options.label ? structure.options.label[dt.id][lang] : dt.id }}
                      </p>
                    </div>
                    <div class="col-12">
                      <hr class="my-0">
                    </div>
                  </div>
                </div>
                <div v-for="(dt,i) in options" :key="'o-' + i">
                  <div
                    v-if="!searchQuery || dt.toLowerCase().includes(searchQuery)"
                    v-show="!functionCart.inCart(dt)"
                    class="row mx-0 select-group"
                    @click="functionCart.togle({
                      id: dt
                    })"
                  >
                    <div class="check d-flex pl-3">
                      <img src="~/assets/img/check.svg" width="13">
                    </div>
                    <div class="col-auto py-3">
                      <p class="mb-0 minititle">
                        {{ structure.options && structure.options.label ? structure.options.label[dt][lang] : dt }}
                      </p>
                    </div>
                    <div class="col-12">
                      <hr class="my-0">
                    </div>
                  </div>
                </div>
              </template>
            </layoutmanager>
          </div>
        </div>
      </template>
      <template #modal-footer>
        <button
          :disabled="!options || options.length === 0"
          class="btn btn-primary m-0 btn-block"
          @click="apply"
        >
          {{ labelGeneral.apply[lang] }}
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import compSearch from '~/components/element/searchbar.vue'
import layoutManager from '~/components/layout/manager'
import layoutEmpty from '~/components/layout/empty'

import labelGeneral from '~/json/label_general'

import ATC from '~/modules/js-module-cart/instantiable'

export default {
  components: {
    compSearch,
    layoutManager,
    layoutEmpty
  },
  props: {
    options: {
      type: Array,
      default: () => { return [] }
    },
    structure: {
      type: Object,
      default: () => { return {} }
    },
    withSearchbar: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      lang: this.$store.getters['app/getLanguage'],
      labelGeneral,
      isModalShow: false,
      searchQuery: null,
      functionCart: new ATC()
    }
  },
  methods: {
    show (dt) {
      this.reset()

      if (dt) {
        dt.forEach((el) => {
          this.functionCart.togle({
            id: el
          })
        })
      }

      this.isModalShow = true
    },
    apply () {
      this.isModalShow = false
      // // is all?
      // if (this.functionCart.carts.length === this.options.length) {
      //   this.$emit('applied', [])
      // } else {
      //   this.$emit('applied', this.functionCart.carts.map((dt) => { return dt.id }))
      // }
      this.$emit('applied', this.functionCart.carts.map((dt) => { return dt.id }))
    },
    reset () {
      this.functionCart.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-wrapper {
    height: 55vh;
    .topbar {
      height: 2.75rem;
      margin-left: -.33rem;
      margin-right: -.33rem;
    }
    .content {
      margin-left: -.75rem;
      margin-right: -.75rem;
      height: calc(55vh - 2.75rem);
      overflow-y: auto;
    }
  }
</style>
