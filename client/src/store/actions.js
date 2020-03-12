export default {
    setIsAuthenticated({ commit }, data) {
        commit('setIsAuthenticated', data)
    },
    setUser({ commit }, data) {
        commit('setUser', data)
    },
    setProfile({ commit }, data) {
        commit('setProfile', data)
    },
    setLoading({ commit }, data) {
        commit('setLoading', data)
    },
    clearCurrentState({ commit }, data) {
        commit('setProfile', null);
        commit('setUser', null);
        commit('setIsAuthenticated', false);
    },
    setProfiles({ commit }, data) {
        commit('setProfiles', data)
    },
}