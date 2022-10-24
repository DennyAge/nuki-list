import firebase from 'firebase';

class Category {
  constructor(name, img = '', id = null) {
    this.name = name
    this.img = img
    this.id = id
  }
}

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
    },
    createCategory (state, payload) {
      state.categories.push(payload)
    },
  },
  actions: {
    async fetchCategorise ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      const resultCategory = []
      try {
        const res = await firebase.database().ref('/Categories').once('value')
        const categories = res.val()
        Object.keys(categories).forEach(key => {
          const category = categories[key]
          resultCategory.push(
            new Category(
              category.name,
              category.img,
              key
            )
          )

        })
        commit('setCategories', resultCategory)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async createCategory ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const newCategory = new Category(
          payload.name,
          ''
        )
        const category = await firebase.database().ref('Categories').push(newCategory)
        commit('createCategory', {
          category
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  }
}
