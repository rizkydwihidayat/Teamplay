export const state = () => ({
  email: '',
  password: '',
  emailGoogle: '',
  nameGoogleAcc: '',
  isLogin: false,
  isLoginWithGoogle: false,
  isLoading: true,
  isVerified: false,
  accKey: '',
  userID: '',
  userEmail: '',
  userPhone: '',
  userPoint: 0,
  listUserMatch: []
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
  setListUserMatch(list) {
    state.listUserMatch = list.data
    // state.listUserMatch = list.data.length > 0 && list.data[0] !== null
    //   // eslint-disable-next-line array-callback-return
    //   ? list.data.map((value, key) => {
    //       return {
    //           gamename: value.match.gameName,
    //           category: value.match.sportCategory,
    //           gender: value.match.playerCategory,
    //           date: value.match.playDate,
    //           time: value.match.timePlay,
    //           place: value.venue.venueName,
    //           status: value.match.status
    //       }
    //   }, {})
    //   : []
  }
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
      .then((result) => {
        commit('setAuthToken', {
          accKey: result.token,
        })
      })
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
    this.$axios.setHeader('Content-Type', 'application/json', ['post'])

    const data = {
      email,
    }
    const postData = JSON.stringify(data)
    return this.$axios
      .$post('https://api.naufalbahri.com/api/v1/users/login/google', postData)
      .then((result) => {
        commit('setState', { isLoginWithGoogle: true })
        commit('setState', {
          // nameGoogleAcc: result.data.name,
          nameGoogleAcc: localStorage.getItem('nameGoogleAcc')
        })
        commit('setAuthToken', {
          accKey: result.token,
        })
        commit('setState', {
          userID: result.data.id,
        })
        commit('setState', {
          isVerified: result.data.isVerified,
        })
        // localStorage.setItem('accKey', result.token)
        localStorage.accKey= result.token
        localStorage.nameGoogleAcc= result.data.name
        localStorage.userID= result.data.id
        localStorage.isVerified= result.data.isVerified
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

  getUserProfile({ dispatch, commit, state }, { bearer, userID }) {
    const axiosOption = {
      headers: {
        xToken: bearer
      }
    }
    return this.$axios
      .$get(
        `https://api.naufalbahri.com/api/v1/users/${userID}/inquiry`, axiosOption
      )
      .then((result => {
        commit('setState', { isLoading: false })
        localStorage.phone = result.data.phoneNumber
        localStorage.point = result.data.totalPoin
        localStorage.userEmail = result.data.email
      }))
      .catch((error) => {
        // handle error
        if (error.response.status !== '404') {
          const alertMsg = {
            msg: 'Token kadaluwarsa, silahkan login kembali.',
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/login')
          //   dispatch('user/refreshAuth', null, { root: true })
          commit('setState', { isLoading: false })
        } else {
          const alertMsg = {
            msg: 'Get item store failed',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          commit('setState', { isLoading: false })
        }
        return false
      })
  },

  getUserMatchHistory({ dispatch, commit, state }, { bearer, userID }) {
    const axiosOption = {
      headers: {
        xToken: bearer
      }
    }
    return this.$axios
      .$get(
        `https://api.naufalbahri.com/api/v1/users/${userID}/match-history`, axiosOption
      )
      .then((result) => {
        commit('setState', { isLoading: false })
        return result
      })
      .catch((error) => {
        // handle error
        if (error.response.status !== '404') {
          const alertMsg = {
            msg: 'Token kadaluwarsa, silahkan login kembali.',
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/login')
          //   dispatch('user/refreshAuth', null, { root: true })
        } else {
          const alertMsg = {
            msg: 'Get item store failed',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
        }
        return false
      })
  },

  changePassword({ dispatch, commit, state }, { bearer, userID, params }) {
    this.$axios.setHeader(
      'Content-Type',
      'application/json',
      ['put']
    )
    const axiosOption = {
      headers: {
        xToken: bearer
      }
    }
    const data = {
      password: params.password,
    }
    const postData = JSON.stringify(data)
    return this.$axios
      .$put(
        `https://api.naufalbahri.com/api/v1/users/${userID}/password`, postData, axiosOption
      )
      .then((result) => {
        commit('setState', { isLoading: false })
        const alertMsg = {
          msg: 'Password berhasil diperbarui.',
          color: '#43A047',
        }
        dispatch('ui/showAlert', alertMsg, { root: true })
        this.$router.push('/profile')
        return result
      })
      .catch((error) => {
        // handle error
        if (error.response.status !== '404') {
          const alertMsg = {
            msg: 'Token kadaluwarsa, silahkan login kembali.',
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/login')
          //   dispatch('user/refreshAuth', null, { root: true })
        } else {
          const alertMsg = {
            msg: 'Get item store failed',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
        }
        return false
      })
  }
}
