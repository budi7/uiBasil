export default {
  navigateTo (vm, url, keepHistory) {
    if (keepHistory) {
      vm.$router.push(url)
    } else {
      vm.$router.replace(url)
    }
  },
  navigateBack (callback) {
    this.$router.back()
  }
}
