import firebase from 'firebase';

class Product {
  constructor(title, brand, color, description, price, stock = false, image = '', ownerId, id = null) {
    this.title = title
    this.brand = brand
    this.color = color
    this.description = description
    this.price = price
    this.stock = stock
    this.image = image
    this.ownerId = ownerId
    this.id = id
  }
}

export default {
  state: {
    products: [
    ]
  },
  getters: {
    products (state) {
      return state.products
    },
    stockProducts (state) {
      return state.products.filter(product => {
        return product.stock
      })
    },
    myPromo (state, getters) {
      return state.products.filter(product => {
        return product.ownerId === getters.user.id
      })
    },
    productById (state) {
      return productId => {
        return state.products.find(product => product.id === productId)
      }
    }
  },
  mutations: {
    createProduct (state, payload) {
      state.products.push(payload)
    },
    loadProducts (state, payload) {
      state.products = payload
    },
    updateProduct (state, {title, brand, color, price, description, id}) {
      const product = state.products.find(a => {
        return a.id === id
      })
      product.title = title
      product.brand = brand
      product.color = color
      product.price = price
      product.description = description
    }
  },
  actions: {
    async createProduct ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      const imageSrc = payload.img
      try {
        const newProduct = new Product(
          payload.title,
          payload.brand,
          payload.color,
          payload.description,
          payload.price,
          payload.stock,
          '',
          getters.user.id,
        )
      const product = await firebase.database().ref('products').push(newProduct)
        const imageExt = imageSrc.name.slice(imageSrc.name.lastIndexOf('.'))
        const fileData = await firebase.storage().ref(`products/${product.key}.${imageExt}`).put(imageSrc)
        const image = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        await firebase.database().ref('products').child(product.key).update({image})
        commit('setLoading', false)
        commit('createProduct', {
          ...newProduct,
          id: product.key,
          image
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw  error
      }
    },
    async fetchPromo ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      const resultProducts = []
      try {
      const promoVal = await firebase.database().ref('products').once('value')
        const products = promoVal.val()
        Object.keys(products).forEach(key => {
          const product = products[key]
          resultProducts.push(
            new Product(
              product.title,
              product.brand,
              product.color,
              product.description,
              product.price,
              product.stock,
              product.image,
              product.ownerId,
              key
            )
          )
          commit('loadProducts', resultProducts)
          commit('setLoading', false)
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw  error
      }
    },
    async updateProduct ({commit}, {title, brand, color, price, description, id}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.database().ref('products').child(id).update({
        title, brand, color, price, description,
         })
        commit('updateProduct', {
          title, brand, color, price, description, id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw  error
      }
    }
  }
}
