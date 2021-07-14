// View Model
import vmCatalogFetch from '~/functions/api/catalog/fetch'

// layouts
import layoutEmpty from '~/components/layout/empty'
import layoutError from '~/components/layout/error'
import layoutList from '~/components/layout/list'

// components
import compListItem from '~/components/page/catalog/list/item.vue'
import compListHeader from '~/components/page/catalog/list/header.vue'
import compBottomMenu from '~/components/bottomMenu.vue'
import compModalFilterSelect from '~/components/filters/select'
import compModalFilterCheck from '~/components/filters/check'
import compModalFilterNumberRange from '~/components/filters/numberPrice'

// functions
import { formatNumber } from '~/modules/js-module-numberFormat'

export default {
  components: {
    layoutEmpty,
    layoutError,
    layoutList,
    compBottomMenu,
    compListItem,
    compListHeader,
    compModalFilterSelect,
    compModalFilterCheck,
    compModalFilterNumberRange
  },
  data () {
    return {
      // datas
      catalogDatas: [],
      catalogIsLoading: true,
      catalogIsError: false,
      catalogIsEmpty: true,
      catalogCurrentPage: 1,
      vmCatalogFetch
    }
  },
  mounted () {
    let vm = this
    const to = setTimeout(() => {
      vm.init()
      clearTimeout(to)
      vm = null
    }, 50)

    this.$on('filterChanged', () => {
      console.log('0->', this)
      this.fetchCatalog()
    })
  },
  destroyed () {
    this.$off('filterChanged')
  },
  methods: {
    formatNumber,
    fetchCatalog () {
      const params = {}
      params.search = this.searchquery
      params.group = this.filter.group
      params.is_active = this.filter.status
      params.price_lte = this.filter.price ? this.filter.price.start : null
      params.price_gte = this.filter.price ? this.filter.price.end : null

      // if (this.catalogIsLoading) { return }
      this.catalogIsLoading = true
      this.catalogIsError = false
      this.catalogIsEmpty = false
      const vm = this

      this.vmCatalogFetch.request({
        token: 'token',
        params
      })
        .then((res) => {
          if (res && res.length > 0) {
            vm.catalogDatas = res
          } else {
            vm.catalogIsEmpty = true
          }
          vm.catalogIsLoading = false
        //   console.log('data:', res)
        })
        .catch((err) => {
          vm.catalogIsLoading = false
          vm.catalogIsError = true
          console.error(err)
        })
    }
  }
}
