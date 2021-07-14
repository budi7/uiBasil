export default {
  data () {
    return {
      stickyTopMenuClass: 'rgba(256,256,256,0)'
    }
  },
  created () {
    this.$nuxt.$on('scroll', this.handleScroll)
  },
  beforeDestroy () {
    this.$nuxt.$off('scroll', this.handleScroll)
  },
  methods: {
    handleScroll (pos) {
      this.stickyTopMenuClass = 'rgba(256,256,256,' + (pos - 100) / (this.stickyTopInitial ? this.stickyTopInitial : 60) + ')'
    }
  }
}
