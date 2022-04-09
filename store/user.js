export const state = () => ({
  email: '',
  password: '',
  emailGoogle: '',
  nameGoogleAcc: '',
  isLogin: false,
  accKey: '',
})
export const mutations = {
  setState(state, params) {
    const keys = Object.keys(params)
    keys.forEach((key) => (state[key] = params[key]))
  },
  setAuthToken(state, params) {
    const keys = Object.keys(params)
    keys.forEach((key) => (state[key] = params[key]))
  },
}
export const actions = {
  setAuthToken({ commit }, params) {
    commit('setAuthToken', params)
  },
  postLogin({ dispatch, commit, state }, { email, password }) {
    this.$axios.setHeader(
      'Content-Type',
      'multipart/form-data; boundary=<calculated when request is sent>',
      ['post']
    )
    const data = {
      email,
      password,
    }
    const postData = JSON.stringify(data)
    return this.$axios
      .$post('https://api.naufalbahri.com/api/v1/users/login', postData)
      .catch((error) => {
        // handle error
        if (error.response.status === 401) {
          // const errMsg = error.response.data.message
          //   ? error.response.data.message
          //   : 'Invalid login credentials.'
          const errMsg = 'Username atau kata sandi salah'
          const alertMsg = {
            msg: errMsg,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
        } else {
          // const errMsg = 'Unknown error please contact admin'
          const errMsg =
            'Terjadi kesalahan. Silahkan hubungi administrator kami'
          const alertMsg = {
            msg: errMsg,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
        }
      })
      .finally(() => {
        commit('setState', { loginLoading: false })
      })
  },

  loginWithGoogle({ dispatch, commit, state }, { email }) {
    this.$axios.setHeader('Content-Type', 'application/json', [
      'post'
    ])

    const data = {
      email,
    }
    const postData = JSON.stringify(data)
    return this.$axios
      .$post(
        'https://api.naufalbahri.com/api/v1/users/login/google',
        postData
      )
      .then((result) => {
        commit('setState', { isLogin: true })
        commit('setState', {
          nameGoogleAcc: result.data.name,
        })
        commit('setAuthToken', {
          accKey: result.token,
        })
      })
      .catch((error) => {
        const errMsg = error.message
        const alertMsg = {
          msg: errMsg,
          color: 'secondary',
        }
        dispatch('ui/showAlert', alertMsg, { root: true })
      })
      .finally(() => {
        commit('setState', { loginLoading: false })
      })
  },

  postRegister(
    { dispatch, commit, state },
    { name, email, password, gender, age }
  ) {
    this.$axios.setHeader(
      'Content-Type',
      'multipart/form-data; boundary=<calculated when request is sent>',
      ['post']
    )
    const data = {
      name,
      email,
      password,
      gender,
      age,
    }
    const postData = JSON.stringify(data)
    return this.$axios
      .$post('https://api.naufalbahri.com/api/v1/users/registration', postData)
      .catch((error) => {
        // handle error
        if (error.response.status === 401) {
          // const errMsg = error.response.data.message
          //   ? error.response.data.message
          //   : 'Invalid login credentials.'
          const errMsg = 'Username atau kata sandi salah'
          const alertMsg = {
            msg: errMsg,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
        } else {
          // const errMsg = 'Unknown error please contact admin'
          const errMsg =
            'Terjadi kesalahan. Silahkan hubungi administrator kami'
          const alertMsg = {
            msg: errMsg,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
        }
      })
      .finally(() => {
        commit('setState', { loginLoading: false })
      })
  },
}
