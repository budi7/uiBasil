// components
import compSearchbar from '~/components/element/searchbar'
import compFilterButton from '~/components/element/filterButton'
import compFilterDisplay from '~/components/element/filterDisplay'

export default function (dt) {
  if (!dt) {
    console.error('filter mixin need filter structure object')
  }

  return {
    data () {
      return {
        searchquery: null,
        filter: [],
        filterIndex: [],
        sort: null,
        filterStructure: dt
      }
    },
    components: {
      compSearchbar,
      compFilterButton,
      compFilterDisplay
    },
    methods: {
      openFilter (dt) {
        // console.log(dt)
        const idx = this.filterIndex.indexOf(dt)

        if (idx >= 0) {
          this.$refs['modal-filter-' + dt].show(this.filter[idx])
        } else {
          this.$refs['modal-filter-' + dt].show(this.filterStructure.filter[dt].prototype.value)
        }
      },
      handleSearch (dt) {
        this.searchquery = dt
        this.$emit('filterChanged')
      },
      handleSort (dt) {
        this.sort = dt
        this.$emit('filterChanged')
      },
      handleFilterApplied (dt, key) {
        // check if filter exist
        const idx = this.filterIndex.indexOf(key)

        function check (_dt) {
          if (typeof _dt === 'object') {
            if (Array.isArray(_dt)) {
              return !!_dt.length > 0
            } else {
              return !!Object.keys(_dt).length > 0
            }
          } else {
            return !!_dt
          }
        }

        if (idx >= 0) {
          // update
          if (check(dt)) {
            this.$set(this.filter, idx, dt)
          } else {
            this.filter.splice(idx, 1)
          }
        } else {
          // create new
          // eslint-disable-next-line no-lonely-if
          if (check(dt)) {
            this.filter.push(dt)
            this.filterIndex.push(key)
          }
        }

        this.$emit('filterChanged')
      },
      handleClearFilter (i) {
        this.filter.splice(i, 1)
        this.filterIndex.splice(i, 1)
        this.$emit('filterChanged')
      }
    }
  }
}
