import Vue from 'vue'
import Multiselect from 'vue-multiselect'

/* ----------  Vue Component  ---------- */
import FormError from '@/components/element/errorMessage'

Vue.component('Multiselect', Multiselect)

Vue.filter('withComma', function (value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})

Vue.filter('idr', function (value) {
  if (!value) { return 'IDR 0' }
  return 'IDR ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})

Vue.filter('number', function (value) {
  if (!value) { return '0' }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
})
Vue.component('E', FormError)
