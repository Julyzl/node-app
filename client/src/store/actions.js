export default {
    setIsAuthenticated({ commit }, data) {
        commit('setIsAuthenticated', data)
    },
    setUser({ commit }, data) {
        commit('setUser', data)
    }
}