import axios from 'axios'

export default {
  // ...functionLog,
  isDebug: true,
  timeout: 5000,

  generateCancelToken () {
    const CancelToken = axios.CancelToken
    return CancelToken.source()
  },
  tryCancelRequest (source) {
    if (!source) {
      if (this.isDebug) {
        console.error('no source defined, please generate source using generateCancelToken function')
      }
      return
    }
    source.cancel()
  },

  post (payload, interceptor) {
    /*
      Payload
      { api, params, token }
    */

    // console.log(payload)

    return new Promise((resolve, reject) => {
      let headers = {}

      if (payload.token) {
        headers = {
          Authorization: payload.token,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      }
      const vm = this
      axios.post(payload.api, payload.params, {
        cancelToken: payload.cancelToken ? payload.cancelToken.token : null,
        timeout: payload.timeout ? payload.timeout : this.timeout,
        headers
      }).then((resp) => {
        if (vm.isDebug) { console.log(resp) }
        // validate data
        if (!resp.data.status) {
          // eslint-disable-next-line prefer-const
          let err = new Error(resp.data.message)
          err.status = 400
          err.data = resp.data.data
          throw err
        }

        function cancel (error) {
          reject(error)
        }
        if (interceptor) {
          interceptor(resp, cancel)
        }
        resolve(resp.data)
      }).catch((err) => {
        if (vm.isDebug) { console.log(err) }
        // vm.functionLogError('POSTAPI', {
        //   payload,
        //   err
        // })
        // eslint-disable-next-line prefer-promise-reject-errors
        if (axios.isCancel(err)) { reject('cancel') }
        reject(err)
      })
    })
  },
  get (payload, interceptor) {
    /*
      Payload
      { api, params, token }
    */

    return new Promise((resolve, reject) => {
      const vm = this

      let headers = {}

      if (payload.token) {
        headers = {
          Authorization: payload.token,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      }

      axios.get(payload.api, {
        cancelToken: payload.cancelToken ? payload.cancelToken.token : null,
        params: payload.params,
        timeout: payload.timeout ? payload.timeout : this.timeout,
        headers
      }).then((resp) => {
        // console.log('check respon', resp)
        if (vm.isDebug) { console.log(resp) }
        // validate data
        if (resp.status !== 200) {
          const err = new Error(resp.statusText)
          err.status = resp.status
          err.data = resp.data.message
          throw err
        }
        if (!resp.data.status) {
          const err = new Error(resp.statusText)
          err.status = 400
          err.data = resp.data.message
          throw err
        }

        function cancel (error) {
          reject(error)
        }
        if (interceptor) {
          interceptor(resp, cancel)
        }
        resolve(resp.data.data)
      }).catch((err) => {
        if (vm.isDebug) { console.log(err) }
        // vm.functionLogError('GETAPI', {
        //   payload,
        //   err
        // })
        // eslint-disable-next-line prefer-promise-reject-errors
        if (axios.isCancel(err)) { reject('cancel') }
        reject(err)
      })
    })
  },
  patch (payload, interceptor) {
    /*
      Payload
      { api, params, token }
    */

    // console.log(payload)

    return new Promise((resolve, reject) => {
      let headers = {}

      if (payload.token) {
        headers = {
          Authorization: payload.token,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      }

      const vm = this
      axios.patch(payload.api, payload.params, {
        cancelToken: payload.cancelToken ? payload.cancelToken.token : null,
        timeout: payload.timeout ? payload.timeout : this.timeout,
        headers
      }).then((resp) => {
        if (vm.isDebug) { console.log(resp) }
        // validate data
        if (!resp.data.status) {
          const err = new Error(resp.data.message)
          err.status = 400
          err.data = resp.data.data
          throw err
        }

        function cancel (error) {
          reject(error)
        }
        if (interceptor) {
          interceptor(resp, cancel)
        }
        resolve(resp.data)
      }).catch((err) => {
        if (vm.isDebug) { console.log(err) }
        // vm.functionLogError('PATCHAPI', {
        //   payload,
        //   err
        // })
        // eslint-disable-next-line prefer-promise-reject-errors
        if (axios.isCancel(err)) { reject('cancel') }
        reject(err)
      })
    })
  },
  delete (payload, interceptor) {
    return new Promise((resolve, reject) => {
      let headers = {}

      if (payload.token) {
        headers = {
          Authorization: payload.token,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      }

      const vm = this
      axios.delete(payload.api, {
        timeout: payload.timeout ? payload.timeout : this.timeout,
        cancelToken: payload.cancelToken ? payload.cancelToken.token : null,
        headers,
        data: payload.params
      }).then((resp) => {
        if (vm.isDebug) { console.log(resp) }
        // validate data
        // if (!resp.data.status) {
        //   let err = new Error(resp.data.message)
        //   err.status = 400
        //   err.data = resp.data.data
        //   throw err
        // }

        function cancel (error) {
          reject(error)
        }
        if (interceptor) {
          interceptor(resp, cancel)
        }
        resolve(resp.data)
      }).catch((err) => {
        if (vm.isDebug) { console.log(err) }
        // vm.functionLogError('DeleteAPI', {
        //   payload,
        //   err
        // })
        // eslint-disable-next-line prefer-promise-reject-errors
        if (axios.isCancel(err)) { reject('cancel') }
        reject(err)
      })
    })
  }
}
