// import axios from 'axios'
// import localStorage from '../../bridge/webStorage'
import atc from '../../modules/atc'
// const StorageKey = 'nakoa-cart'

const outlet = {
  namespaced: true,
  state () {
    return {
      cart: [],
      count: 0,
      total: 0
    }
  },
  getters: {
    inCart: () => id => {
      console.log(atc.cart)
      return atc.inCart(id)
    },
    cartPos: () => id => {
      return atc.getCartPos(id)
    }
  },
  mutations: {
    init (state) {
      // if load cart from local storage
    //   const ls = localStorage.get(StorageKey)
      // console.log(ls)
    //   if (!ls.status || ls.data === null) return // no data or error

      // eslint-disable-next-line no-undef
      atc.init(JSON.parse(JSON.stringify(ls.data.cart)))
      // eslint-disable-next-line no-undef
      state.cart = ls.data.cart
      // eslint-disable-next-line no-undef
      state.count = ls.data.count
      // eslint-disable-next-line no-undef
      state.total = ls.data.total
      console.log(state)
    },
    setCart (state, payload) {
      state.cart = JSON.parse(JSON.stringify(payload))

      const tmp = payload.reduce(function (tot, value) {
        return {
          total: tot.total + (value.data.outlet_price * value.qty),
          count: tot.count + value.qty
        }
      }, {
        total: 0,
        count: 0
      })

      state.total = tmp.total
      state.count = tmp.count

      // localStorage.store(StorageKey, JSON.stringify(state))
    },
    reset (state) {
      state.cart = []
      state.count = 0
      state.total = 0

      // localStorage.store(StorageKey, JSON.stringify(state))
    }
  },
  actions: {
    edit ({ commit }, payload) {
      // console.log(payload)
      return new Promise((resolve, reject) => {
        try {
          if (payload.qty > 0) {
            // edit cart
            console.log('edit')
            console.log({
              id: payload.dt.id,
              data: payload.dt,
              qty: payload.qty
            })
            atc.edit({
              id: payload.dt.id,
              data: payload.dt,
              qty: payload.qty
            })
          } else {
            console.log('remove')
            // remove cart
            atc.remove({
              id: payload.dt.id
            })
          }

          commit('setCart', atc.carts)
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    },
    reset ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        try {
          atc.reset()
          commit('setCart', atc.carts)

          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}

export default outlet
