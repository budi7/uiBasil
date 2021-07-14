<template>
  <div class="row mx-0">
    <div class="col px-3">
      <div class="row py-2 mt-4 mb-3">
        <div class="col">
          <p class="title mb-0">
            {{ labelPage.title[lang] }}
          </p>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a class="text-hover" href="#"><span>Katalog</span></a>
            </li>
            <li class="breadcrumb-item">
              <a class="active" href="#"><span>Daftar Katalog</span></a>
            </li>
          </ol>
        </div>
      </div>

      <!-- filters -->
      <div class="row sticky-top-upper">
        <div class="col px-2">
          <div :style="{'background-color': stickyTopMenuClass}" class="row mx-0 mt-2 pt-1 pb-2 round top bottom">
            <div class="col pl-2">
              <div class="row mx-0 pb-3">
                <div class="filter-wrapper flex-grow-1 align-items-start flex-row">
                  <!-- searchbar -->
                  <compSearchbar
                    :placeholder="labelPage.filter.search[lang]"
                    class="searchbar"
                    direction="all"
                    @search="handleSearch"
                  />

                  <!-- filters -->
                  <compFilterDisplay
                    v-for="(dt, i) in filter"
                    :key="i"
                    wrapper-class="ml-2 filterDisplay"
                    :data="{
                      value: dt,
                      prototype: filterStructure.filter[filterIndex[i]].prototype,
                      options: filterStructure.filter[filterIndex[i]].options
                    }"
                    @open="openFilter(filterIndex[i])"
                    @clear="handleClearFilter"
                  />
                </div>
              </div>
            </div>
            <div class="col-auto pr-2 filter-buttons pl-0">
              <compFilterButton
                :menu="filterStructure"
                @filterTrigger="openFilter"
                @sortTrigger="handleSort"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- list -->
      <div class="row mb-5">
        <div class="col-12 mb-5">
          <!-- list header -->
          <layoutList
            :is-loading="catalogIsLoading"
            :is-error="catalogIsError"
            :is-empty="catalogIsEmpty"
          >
            <template #title>
              <compListHeader
                :is-selected="isSelectedAll"
                :is-show-select-box="isSelecting"
                @select="(param) => { handleSelectAll(param) }"
                @menuClicked="handleMenuTitle"
              />
            </template>
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
                :label="labelPage.state.error.label[lang]"
                :action="labelPage.state.error.action[lang]"
                @action="fetchCatalog()"
              />
            </template>
            <template #empty>
              <layoutEmpty
                :label="labelPage.state.nodata.label[lang]"
                :action="labelPage.state.nodata.action[lang]"
                @action="navigateTo(gvm, '/dashboard/catalog/create', true)"
              />
            </template>
            <template #content>
              <compListItem
                v-for="(catalog, index) in catalogDatas"
                :key="'cat' + index"
                :catalog="catalog"
                :index="index"
                :is-selected="functionCart.inCart(catalog.id)"
                :is-selecting="isSelecting"
                @click="handleListClick"
                @clickMenuCatalog="handleMenuCatalog"
                @clickMenuVarian="handleMenuVarian"
                @clickMenuAddon="handleMenuAddon"
              />
            </template>
          </layoutList>
        </div>
      </div>

      <!-- bottom menu  -->
      <compBottomMenu size="large">
        <compBottomMenuContent
          :is-loading="catalogIsLoading"
          :total-selected="functionCart.carts.length"
          :current-page="catalogCurrentPage"
          :is-selecting="isSelecting"
          :total-data="vmCatalogFetch.totalData"
          :total-page="vmCatalogFetch.totalPage"
          @pageChanged="handlePageChanged"
        >
          <template #action>
            <button v-show="isSelecting" class="btn btn-outline-primary btn-sm mr-2" type="button" @click="handleCancelSelection">
              {{ labelGeneral.cancel[lang] }}
            </button>
            <button v-if="isSelecting" :disabled="functionCart.carts.length === 0" class="btn btn-primary btn-sm" type="button" @click="handleSubmit">
              {{ dropMenu.indexTitle[selectAction][lang] }}
            </button>
          </template>
        </compBottomMenuContent>
      </compBottomMenu>
    </div>

    <!-- #filter-modal-html#  -->

    <!-- filters group-->
    <compModalFilterCheck
      ref="modal-filter-group"
      :options="vmCatalogFetch.filters ? vmCatalogFetch.filters.group : []"
      :structure="filterStructure.filter.group"
      :with-searchbar="true"
      @applied="(dt) => handleFilterApplied(dt, 'group')"
    />
    <!-- filters status-->
    <compModalFilterSelect
      ref="modal-filter-status"
      :options="filterStructure.filter.status.options.value"
      :with-searchbar="false"
      :structure="filterStructure.filter.status"
      @applied="(dt) => handleFilterApplied(dt, 'status')"
    />
    <!-- filters price-->
    <compModalFilterNumberRange
      ref="modal-filter-price"
      :structure="filterStructure.filter.price"
      @applied="(dt) => handleFilterApplied(dt, 'price')"
    />
  </div>
</template>

<script>
/*
-------------
dev notes
-------------
I navigation
1. navigate to url
navigateTo (vm, url, keepHistory)
vm: this (vue instance)
url: path destination
keephistory: true(keep history), false(replace history)

2. navigate to previous page
navigateBack()

II. API function
create your own function api call
if you're using API call mocker, you will got 3 types of response (first call: all data, second call, empty data, third call error response, ...and repat)

*/

// import scripts here
// import nameOfModules from '../..'

// funcions
import functionNavigation from '~/functions/navigation'
import ATC from '~/modules/js-module-cart/instantiable'

// components
import compBottomMenuContent from '~/components/page/catalog/bottommenu/index'

// mixins
import mixUIStickyTop from '~/mixins/ui/stickyTop'
import mixPageData from '~/mixins/pages/catalog/index'
import mixFilter from '~/mixins/filter'

export default {
  components: {
    compBottomMenuContent
  },
  mixins: [
    mixUIStickyTop,
    mixPageData,
    mixFilter(require('~/json/filter.json').catalog)
  ],
  beforeRouteLeave (to, from, next) {
    // your logic
    // console.log(to, from)

    // cancel navigation
    // next(false)
    // console.log(this.vmCatalogFetch.request.cancel)
    this.vmCatalogFetch.cancel()
    next()
  },
  layout: 'dashboard',
  data () {
    return {
      lang: this.$store.getters['app/getLanguage'],
      gvm: this,
      isLoading: false,

      // page data

      // sorts
      selected: [],
      selecteAll: false,
      isSelectedAll: false,
      isSelecting: false,
      selectAction: null,
      functionCart: new ATC(),

      // structures
      labelPage: require('~/json/label_page.json').catalog.index,
      labelGeneral: require('~/json/label_general'),
      dropMenu: require('~/json/dropdownmenu.json').catalog,
      urlPage: require('~/json/menu.json').menu_product.menus
    }
  },
  computed: {

  },
  watch: {

  },
  mounted () {
  },
  methods: {
    ...functionNavigation,
    // ...functionConfirmation,
    init () {
      this.fetchCatalog()
    },
    handleSubmit () {
      const param = {
        key: this.selectAction,
        data: this.functionCart.carts
      }
      this.$store.commit('temp/setData', param)

      switch (this.selectAction) {
        case 'editprice':
          this.$router.push({ path: this.urlPage.price.submenus.edit_price.url })
          break
        case 'upprice':
          this.$router.push({ path: this.urlPage.price.submenus.up_price.url })
          break
        case 'downprice':
          this.$router.push({ path: this.urlPage.price.submenus.down_price.url })
          break
        default:
          this.$router.push({ path: this.urlPage.catalog.submenus['catalog_' + this.selectAction].url })
          break
      }
    },
    handleCancel () {
      this.isSelecting = false
      this.selected = []
    },

    // handle list component
    handleEditing (dt) {
      if (dt) {
        this.isSelecting = true
      }
    },
    handleListClick (param) {
      // console.log('param', param)
      // console.log('param', this.isSelecting)
      const vm = this
      if (this.isSelecting) {
        this.functionCart.togle(param)
        this.$nextTick(() => {
          this.selected = this.functionCart.indexer
        })

        if (vm.functionCart.carts.length === vm.catalogDatas.length) {
          vm.isSelectedAll = true
        } else {
          vm.isSelectedAll = false
        }
      } else {
        // console.log('1')
        this.navigateTo(this, `/dashboard/catalog/detail#${param.uuid}`, true)
      }

      // flaw next page
      // if (vm.functionCart.carts.length === vm.catalogDatas.length) {
      //   vm.isSelectedAll = true
      // } else {
      //   vm.isSelectedAll = false
      // }
    },
    handleSelectAll (param) {
      const dt = this.catalogDatas
      if (param) {
        for (const i in this.catalogDatas) {
          if (this.functionCart.inCart(parseInt(dt[i].id)) === false) {
            this.functionCart.add(dt[i])
          }
        }
        this.selected = this.functionCart.indexer
        this.isSelectedAll = true
      } else {
        this.functionCart.reset()
        this.selected = []
        this.isSelectedAll = false
      }
    },
    handleMenuTitle (param) {
      switch (param) {
        case 'refresh':
          this.fetchCatalog()
          break
        case 'detail':
          this.selectAction = null
          this.isSelecting = false
          break
        default:
          this.selectAction = param
          this.isSelecting = true
          break
      }
    },
    handleMenuCatalog (param) {
      switch (param.evt) {
        case 'addvarian': case 'addAddon' :
          break
        default:
          this.selectAction = param.evt
          this.functionCart.togle(param.data)
          this.handleSubmit()
          break
      }
    },
    handleMenuVarian (param) {
    },
    handleMenuAddon (param) {
    },
    handleCancelSelection () {
      this.isSelecting = false
      this.functionCart.reset()
    },
    handlePageChanged (dt) {
      this.catalogCurrentPage = dt
      this.fetchCatalog()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
