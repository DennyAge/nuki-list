import firebase from 'firebase';

// class Category {
//   constructor(name, img = '', id) {
//     this.name = name
//     this.img = img
//     this.id = id
//   }
// }

export default {
  state: {
    categories: []
  },
  getters: {
    categories (state) {
      return state.categories
    }
  },
  mutations: {
    setCategories (state, payload) {
      return state.categories = payload
    }
  },
  actions: {
    async fetchCategorise ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const res = await firebase.database().ref('/Categories').once('value')
        const categories = res.val()
        commit('setCategories', categories)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  }
}
