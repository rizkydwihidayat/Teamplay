import createPersistedState from 'vuex-persistedstate'

export default ({ store, req, isDev }) => {
  createPersistedState({
    key: 'teamplay',
    paths: ['user.isLogin', 'user.accKey'],
  })
}
