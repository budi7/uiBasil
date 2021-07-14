// import
const app = {
  namespaced: true,
  state () {
    return {
      language: null,
      config: null,
      version: '1.0.0',
      trueTime: {},
      menu: 'menu_me'
    }
  },
  getters: {
    getLanguage: (state) => {
      return state.language ? state.language : 'id'
    }
  },
  mutations: {
    init (state) {

    },
    setLanguage: (state, payload) => {
      state.language = payload
    },
    setMenu: (state, payload) => {
      state.menu = payload
    },

    setTrueTime (state, payload) {
      state.trueTime = payload
    },
    resetConfig: (state) => {
      state.language = null
      state.config = null
    },
    setConfig: (state, payload) => {

    }
  },
  actions: {
    fetch ({ commit, state }, payload) {
    //   return new Promise((resolve, reject) => {

    //   })
    },
    writeConfig ({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        const backup = JSON.parse(JSON.stringify(state))
        console.log('writing', backup)
      })
    },
    readConfig ({ commit }) {
      return new Promise((resolve, reject) => {
        console.log('reaing config')
      })
    }
  }
}

export default app
