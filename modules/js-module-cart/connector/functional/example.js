import atc from 'js-module-cart'

// eslint-disable-next-line no-unused-vars
function toggleCart (item) {
  atc.togle({
    id: item.id
  })
}
