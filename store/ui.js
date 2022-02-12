// store module for User Interface
export const state = () => ({
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'secondary',
    snackTimeout: 4000,
    homeLoading: false,
    needAction: false,
    actionText: '',
    redirectTo: ''
  })
  
  // mutations defined as object
  export const mutations = {
    setState(state, params) {
      const keys = Object.keys(params)
      keys.forEach(key => (state[key] = params[key]))
    }
  }
  export const actions = {
    showAlert({ commit }, params) {
      commit('setState', {
        snackbar: true,
        snackbarText: params.msg,
        snackTimeout:
          params.timeout === 0 ? 0 : params.timeout > 0 ? params.timeout : 4000,
        snackbarColor: params.color !== '' ? params.color : 'secondary',
        needAction: params.needAction,
        actionText: params.actionText,
        redirectTo: params.redirectTo
      })
    }
  }
  