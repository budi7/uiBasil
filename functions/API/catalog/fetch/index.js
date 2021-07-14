// #start-ignore-prduction#
// eslint-disable-next-line import/order
import sample from './contract.json'
// let tickTock = 0
// #end-ignore-prduction#

export default {
  perPage: 20,
  totalData: 0,
  totalPage: 0,
  filters: {},
  sorts: {},
  cancelToken: null,
  request (payload) {
    return new Promise((resolve, reject) => {
      // tickTock += 1
      // resolve((Array(this.perPage).fill(sample)))

      // set stats
      this.totalData = 20
      this.totalPage = 1
      this.filters = {
        group: ['Group 1', 'Group 2', 'Group 3']
      }

      // console.log(tickTock)

      setTimeout(() => {
        // if (tickTock < 3) {
        resolve({
          data: {
            uuid: 'uuid key'
          },
          // datas: (tickTock === 2 ? Array(this.perPage).fill(sample) : []),
          datas: Array(this.perPage).fill(sample),
          opsi: {},
          stats: {}
        })
        // } else {
        //   tickTock = 0
        //   reject(new Error('Test error'))
        // }
      }, 2000)
    })
  },
  cancel () {
    // cancel options here
  }
}

// export default function (params) {
//   console.log('check param', params)
//   return transporter.get({
//     api: `${apiJson.url}${apiJson.endpoints.catalog}`,
//     token: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvb3J5eC50aHVuZGVybGFiLmlkIiwiYXVkIjoiaHR0cHM6XC9cL29yeXgudGh1bmRlcmxhYi5pZCIsImlhdCI6MTYyNTcyOTM0MiwibmJmIjoxNjI1NzI5MzQyLCJ1c2VyIjp7ImlkIjoiYTA3NTAyMDUtY2UwNi00ZTViLWEyZDItNDcyOWFiODg0MzA5IiwiZW1haWwiOiJjaGVsc3lAdGh1bmRlcmxhYi5pZCJ9fQ.dIe8dejbr-giYaV83A-aINk-6LjccoK4tFEEz9EIS5o',
//     params
//   }, (dt) => {
//     // login interceptor: validate account
//     console.log('intercept', dt)
//   })
// }
