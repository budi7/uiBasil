<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item border-top-0 border-left-0 border-right-0 bg-transparent pb-3">
        <div class="row align-items-center">
          <div v-if="isEditing" class="col-auto px-2 text-right">
            <b-form-checkbox />
          </div>
          <div class="col-3 px-2">
            <div class="d-flex flex-row align-items-center">
              <p class="mb-0 list-text">
                {{ appLabel.table.name[lang] }}<br>
              </p><span class="ms-auto" />
            </div>
          </div>
          <div class="col px-2">
            <p class="mb-0 list-text">
              {{ appLabel.table.group[lang] }}<br>
            </p>
          </div>
          <div class="col px-2 text-center">
            <p class="mb-0 list-text">
              {{ appLabel.table.varian[lang] }}<br>
            </p>
          </div>
          <div class="col px-2 text-center">
            <p class="mb-0 list-text">
              {{ appLabel.table.addons[lang] }}<br>
            </p>
          </div>
          <div class="col px-2 text-center">
            <p class="mb-0 list-text">
              {{ appLabel.table.status[lang] }}<br>
            </p>
          </div>
          <div class="col px-2 text-right">
            <p class="mb-0 list-text">
              {{ appLabel.table.price[lang] }}<br>
            </p>
          </div>
          <div :class="`col-auto px-2 ${isEdit ? 'px-1' : 'px-2'}`">
            <b-dropdown
              v-if="!isEdit"
              variant="link"
              size="small"
              toggle-class="text-decoration-none p-0"
              no-caret
              right
            >
              <template #button-content>
                <span class="clickable dropdown input-group-text no-border right">
                  <span class="mr-1">Action</span>
                  <img src="~/assets/img/down-filled-triangular-arrow.svg" width="10">
                </span>
              </template>
              <b-dropdown-item @click="handleIsEdit">
                Edit Katalog
              </b-dropdown-item>
              <b-dropdown-item @click="isEdit = true">
                Hapus Katalog
              </b-dropdown-item>
              <b-dropdown-item @click="isEdit = true">
                Aktifkan Katalog
              </b-dropdown-item>
              <b-dropdown-item @click="isEdit = true">
                Nonaktifkan Katalog
              </b-dropdown-item>
            </b-dropdown>
            <div v-else class="px-3">
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </li>

      <layoutManager
        :is-loading="isLoading"
        :is-error="isError"
        :is-empty="isEmpty"
        class="w-100"
      >
        <template #loader class="col-12">
          <b-skeleton
            v-for="(idx, i) in 5"
            :key="i"
            height="51px"
            no-aspect="true"
            class="mt-2"
          />
        </template>
        <template #error>
          <layoutError
            :label="appLabel.state.error.label[lang]"
            :action="appLabel.state.error.action[lang]"
            @action="vmCatalogFetch()"
          />
        </template>
        <template #empty>
          <layoutEmpty
            :label="appLabel.state.nodata.label[lang]"
            :action="appLabel.state.nodata.action[lang]"
            @action="navigateTo(gvm, '/dashboard/catalog/create', true)"
          />
        </template>
        <template #content>
          <li v-for="(catalog, i) in datas" :key="i" :ref="`list-group-${i}`" class="list-group-item clickable no-radius">
            <slot name="item" :data="catalog" :index="i" />

          <!-- <div class="row align-items-center">
              <div v-if="isEditing" class="col-auto px-2 text-center">
                <b-form-checkbox
                  v-model="selected"
                  :value="i"
                  @change="handleSelected"
                />
              </div>
              <div class="col-3 px-2">
                <div class="row mx-0 align-items-center">
                  <div class="col-3 pl-0">
                    <img class="img-fluid" src="https://www.malangculinary.com/upload/img_15944486022.jpg">
                  </div>
                  <div class="col pl-1">
                    <p class="mb-0 list-text">
                      {{ catalog.name }}
                    </p>
                    <p class="text-secondary mb-0 list-text minititle">
                      {{ catalog.code }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col px-2">
                <p class="mb-0 list-text">
                  {{ catalog.group }}
                </p>
              </div>
              <div class="col px-2 text-center">
                <b-button v-if="catalog.varians.length && withCollapse" v-b-toggle="`collapse-varian-${i}`" variant="link">
                  {{ catalog.varians.length }}
                  <span class="ml-1 when-opened">
                    <small>
                      <b-icon-caret-up-fill />
                    </small>
                  </span>
                  <span class="ml-1 when-closed">
                    <small>
                      <b-icon-caret-down-fill />
                    </small>
                  </span>
                </b-button>
                <p v-else class="mb-0 list-text">
                  {{ catalog.varians.length }}
                </p>
              </div>
              <div class="col px-2 text-center">
                <b-button v-if="catalog.addons.length && withCollapse" v-b-toggle="`collapse-addon-${i}`" variant="link">
                  {{ catalog.addons.length }}
                  <span class="ml-1 when-opened">
                    <small>
                      <b-icon-caret-up-fill />
                    </small>
                  </span>
                  <span class="ml-1 when-closed">
                    <small>
                      <b-icon-caret-down-fill />
                    </small>
                  </span>
                </b-button>
                <p v-else class="mb-0 list-text">
                  {{ catalog.addons.length }}
                </p>
              </div>
              <div class="col px-2 text-center">
                <p :class="`mb-0 list-text ${catalog.status === 'published' ? 'text-success' : 'text-secondary'}`">
                  {{ appLabel.status[catalog.status][lang] }}
                </p>
              </div>
              <div class="col text-right">
                <p class="text-end mb-0 list-text">
                  {{ catalog.price | number }}
                </p>
              </div>
              <div class="col-auto px-2 text-right">
                <b-dropdown variant="link" size="small" toggle-class="text-decoration-none" no-caret right>
                  <template #button-content>
                    <b-icon-three-dots-vertical />
                  </template>
                  <b-dropdown-item>
                    Lihat Produk
                  </b-dropdown-item>
                  <b-dropdown-item href="#">
                    Ubah Produk
                  </b-dropdown-item>
                  <b-dropdown-item href="#">
                    Ubah Harga
                  </b-dropdown-item>
                  <b-dropdown-item href="#">
                    Nonaktifkan Produk
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
            <div v-if="withCollapse" class="accordion ml-5" role="tablist">
              <b-collapse v-if="catalog.varians.length" :id="`collapse-varian-${i}`" accordion="my-accordion" role="tabpanel">
                <hr>
                <div class="row align-items center mb-2">
                  <div class="col">
                    <p class="mb-0 ml-2 list-text text-muted">
                      {{ appLabel.table.varian[lang] }}
                    </p>
                  </div>
                </div>
                <div class="row align-items center ml-0">
                  <div class="col">
                    <div v-for="(varian, _i) in catalog.varians" :key="i+'-'+_i" class="row align-items-center pb-2 mb-2 border-bottom">
                      <div class="col-3 px-2">
                        <div class="row mx-0 align-items-center">
                          <div class="col-3 pl-0">
                            <img class="img-fluid" src="https://www.malangculinary.com/upload/img_15944486022.jpg">
                          </div>
                          <div class="col pl-1">
                            <p class="mb-0 list-text">
                              {{ varian.name }}
                            </p>
                            <p class="text-secondary mb-0 list-text minititle">
                              {{ varian.code }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col offset-md-5 px-2 text-center">
                        <p :class="`mb-0 list-text ${varian.status === 'published' ? 'text-success' : 'text-secondary'}`">
                          {{ appLabel.status[varian.status][lang] }}
                        </p>
                      </div>
                      <div class="col text-right">
                        <p class="text-end mb-0 list-text">
                          {{ varian.extra_price | number }}
                        </p>
                      </div>
                      <div class="col-auto px-2 text-right">
                        <b-dropdown variant="link" size="small" toggle-class="text-decoration-none" no-caret right>
                          <template #button-content>
                            <b-icon-three-dots-vertical />
                          </template>
                          <b-dropdown-item>
                            Lihat Produk
                          </b-dropdown-item>
                          <b-dropdown-item href="#">
                            Ubah Produk
                          </b-dropdown-item>
                          <b-dropdown-item href="#">
                            Ubah Harga
                          </b-dropdown-item>
                          <b-dropdown-item href="#">
                            Nonaktifkan Produk
                          </b-dropdown-item>
                        </b-dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </b-collapse>

              <b-collapse v-if="catalog.addons.length" :id="`collapse-addon-${i}`" accordion="my-accordion" role="tabpanel">
                <hr>
                <div class="row align-items center mb-2">
                  <div class="col">
                    <p class="mb-0 ml-2 list-text text-muted">
                      {{ appLabel.table.addons[lang] }}
                    </p>
                  </div>
                </div>
                <div class="row align-items center ml-0">
                  <div class="col">
                    <div v-for="(addon, _i) in catalog.addons" :key="i+'-'+_i" class="row align-items-center pb-2 mb-2 border-bottom">
                      <div class="col-3 px-2">
                        <div class="row mx-0 align-items-center">
                          <div class="col-3 pl-0">
                            <img class="img-fluid" src="https://www.malangculinary.com/upload/img_15944486022.jpg">
                          </div>
                          <div class="col pl-1">
                            <p class="mb-0 list-text">
                              {{ addon.name }}
                            </p>
                            <p class="text-secondary mb-0 list-text minititle">
                              {{ addon.code }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col offset-md-7 text-right">
                        <p class="text-end mb-0 list-text">
                          {{ addon.price | number }}
                        </p>
                      </div>
                      <div class="col-auto px-2 text-right">
                        <b-dropdown variant="link" size="small" toggle-class="text-decoration-none" no-caret right>
                          <template #button-content>
                            <b-icon-three-dots-vertical />
                          </template>
                          <b-dropdown-item>
                            Lihat Produk
                          </b-dropdown-item>
                          <b-dropdown-item href="#">
                            Ubah Produk
                          </b-dropdown-item>
                          <b-dropdown-item href="#">
                            Ubah Harga
                          </b-dropdown-item>
                          <b-dropdown-item href="#">
                            Nonaktifkan Produk
                          </b-dropdown-item>
                        </b-dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </b-collapse>
            </div> -->
          </li>
        </template>
      </layoutManager>
    </ul>
  </div>
</template>
<script>
// API's
import vmCatalogFetch from '~/functions/api/catalog/fetch'

import layoutManager from '~/components/layout/manager'
import layoutEmpty from '~/components/layout/empty'
import layoutError from '~/components/layout/error'
import jsonLabel from '~/json/label_page'
export default {
  components: {
    layoutManager,
    layoutEmpty,
    layoutError
  },
  props: {
    datas: {
      type: Array,
      default () { return [] }
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean,
      default: false
    },
    isEmpty: {
      type: Boolean,
      default: false
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    isSelectedAll: {
      type: Boolean,
      default: false
    },
    withCheckbox: {
      type: Boolean,
      default: false
    },
    withoutAction: {
      type: Boolean,
      default: false
    },
    withCollapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      lang: this.$store.getters['app/getLanguage'],
      gvm: this,

      // page data
      catalogDatas: [],
      catalogIsLoading: false,
      catalogIsError: false,
      catalogIsEmpty: false,
      selected: [],
      isEdit: false,

      // structures
      appLabel: jsonLabel.catalog.index
    }
  },
  watch: {
    isSelectedAll (v) {
      if (v) {
        this.handleSelectedAll()
      }
    },
    isEmpty (v) {
      console.log('chekc empty ', v)
    },
    isEditing (v) {
      this.isEdit = v
      console.log('chekc loading ', v)
    }
  },
  mounted () {
    console.log('chekc is empty ', this.isEmpty)
    console.log('chekc is loading ', this.isLoading)
    this.init()
  },
  methods: {
    init () {
      this.fetchCatalog()
    },
    fetchCatalog () {
      if (this.catalogIsLoading) { return }
      this.catalogIsLoading = true
      this.catalogIsError = false
      this.catalogIsEmpty = false
      const vm = this

      vmCatalogFetch.request()
        .then((res) => {
          if (res.datas && res.datas.length > 0) {
            vm.catalogDatas = res
          } else {
            vm.catalogIsEmpty = true
          }
          vm.catalogIsLoading = false
          console.log('data:', res)
        })
        .catch((err) => {
          vm.catalogIsLoading = false
          vm.catalogIsError = true
          console.error(err)
        })
    },
    handleSelectedAll () {
      const vm = this
      if (vm.datas.datas) {
        const tmp = []
        for (const i in vm.datas.datas) {
          tmp.push(i)
        }
        vm.selected = tmp
      }
    },
    handleSelected (param) {
      this.$emit('SELECTED', param)
    },
    handleIsEdit () {
      this.isEdit = true
      this.$emit('EDITING', this.isEdit)
    }
  }
}
</script>
