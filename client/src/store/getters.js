// export const isAuthenticated = state => state.isAuthenticated
// export const user = state => state.user
export default {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
    profile: state => state.profile,
    loading: state => state.loading,
    profiles: state => state.profiles
}