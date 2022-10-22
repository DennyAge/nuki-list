import firebase from 'firebase';

class Order {
  constructor(name, phone, address, message, productId, done = false, id = null ) {
    this.name = name
    this.phone = phone
    this.address = address
    this.message = message
    this.productId = productId
    this.done = done
    this.id = id

  }
}

export  default {
  state: {
    orders: []
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(order => order.done)
    },
    undoneOrders (state) {
      return state.orders.filter(order => !order.done)
    },
    orders (state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  },
  mutations: {
    loadOrder (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder({commit}, {name, phone, address, message, productId, ownerId}) {
      const order = new Order(name, phone, address, message, productId)
      commit('clearError')
      try {
        await firebase.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrders({commit, getters}) {
      commit('setLoading', true)
      commit('clearError')
      const resultOrders = []
      try {
        const fbVal  = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()
        Object.keys(orders).forEach(key => {
          const order = orders[key]
          resultOrders.push(new Order(order.name, order.phone, order.address, order.message, order.productId, order.done, key))
        })
        commit('loadOrder', resultOrders)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
      }
    },
    async markOrderDone({commit, getters}, payload) {
      commit('clearError')
      try {
        await firebase.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
        done: true
         })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  }
}
