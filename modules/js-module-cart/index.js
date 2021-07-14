// add to cart modules
// v 0.0.2

// payload data must be :
/*
    {
        id: xx,
        .... // your data
    }
*/

export default {
  carts: [],
  indexer: [],
  inCart (id) {
    return this.indexer.includes(id)
  },
  getCartPos (id) {
    return this.indexer.indexOf(id)
  },
  init (payload) {
    if (!payload) {
      // eslint-disable-next-line no-console
      console.error('no payload at add to cart')
      return
    }

    this.carts = payload
    this.indexer = payload.map((dt) => {
      return dt.id
    })
  },
  add (payload) {
    if (!payload) {
      // eslint-disable-next-line no-console
      console.error('no payload at add to cart')
      return
    }
    this.carts.push(payload)
    this.indexer.push(payload.id)
  },
  edit (payload, isAddition) {
    if (!payload) {
      // eslint-disable-next-line no-console
      console.error('no payload at add to cart')
      return
    }

    // new ?
    if (this.carts.length <= 0) {
      this.carts.push(payload)
      this.indexer.push(payload.id)
      return
    }

    // edit or new
    const idx = this.indexer.indexOf(payload.id)

    if (idx >= 0) {
      if (isAddition) {
        const cart = JSON.parse(JSON.stringify(this.carts[idx]))
        cart.qty = (parseInt(payload.qty) + parseInt(cart.qty))
        this.carts[idx] = cart
      } else {
        this.carts[idx] = payload
        // this.carts[idx].qty = parseInt(payload.qty)
      }
    } else {
      this.carts.push(payload)
      this.indexer.push(payload.id)
    }
  },
  remove (payload) {
    if (!payload) {
      // eslint-disable-next-line no-console
      console.error('no payload at add to cart')
      return
    }

    if (this.carts.length <= 0) {
      // eslint-disable-next-line no-console
      console.warn('no item in carts')
      return
    }

    // find and remove
    let ctr = 0
    const newData = this.carts.filter((dt, i) => {
      if (dt.id === payload.id) {
        ctr++
        this.indexer.splice(i, 1)
      }
      return dt.id !== payload.id || ctr > 1
    })

    this.carts = newData
  },
  togle (payload) {
    if (!payload) {
      // eslint-disable-next-line no-console
      console.error('no payload at add to cart')
      return
    }
    // eslint-disable-next-line no-console
    // console.log(payload)

    // find and remove
    let ctr = 0
    const newData = this.carts.filter((dt, i) => {
      if (dt.id === payload.id) {
        ctr++
        this.indexer.splice(i, 1)
      }
      return dt.id !== payload.id || ctr > 1
    })

    // in case no data, add newdata
    if (ctr === 0) {
      this.carts.push(payload)
      this.indexer.push(payload.id)
    } else {
      this.carts = newData
      // this.indexer.push(payload.id)
    }

    // console.log(this.carts)
    // console.log(this.indexer)
  },
  reset () {
    this.carts = []
    this.indexer = []
  }
}
