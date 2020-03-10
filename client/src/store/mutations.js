export default {
    // 改变登录状态
    setIsAuthenticated(state, data) {
        state.isAuthenticated = data;
    },
    // 保存登录信息
    setUser(state, data) {
        state.user = data;
    },
    setProfile(state, data) {
        state.profile = data
    },
    setLoading(state, data) {
        state.loading = data
    },
    setProfiles(state, data) {
        state.profiles = data
    }
}