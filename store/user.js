export const state = () => ({
  email: '',
  password: '',
  emailGoogle: '',
  nameGoogleAcc: '',
  isLogin: false,
})
export const mutations = {
  setState(state, params) {
    const keys = Object.keys(params)
    keys.forEach(key => (state[key] = params[key]))
  },
}
export const actions = {
  postLogin({ dispatch, commit, state }, { email, password }) {
    this.$axios.setHeader(
      'Content-Type',
      'multipart/form-data; boundary=<calculated when request is sent>',
      ['post']
    )
    // this.$axios.setHeader(
    //   'Authorization',
    //   'Basic ' + process.env.gada_basic_auth
    // )
    const data = {
      email,
      password,
    }
    const querystring = require('querystring')
    const postData = querystring.stringify(data)
    return this.$axios
      .$post('/api/v1/users/login', postData)
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
    const axiosOption = {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
      },
      validateStatus: status => {
        const result = status >= 200
        return result
      },
    }
    
    const data = {
      email,
    }
    const querystring = require('querystring')
    const postData = querystring.stringify(data)
    return this.$axios
      .$post('/api/v1/users/login/google', postData, axiosOption)
      .then(result => {
        console.warn(result);
        commit('setState', {
          nameGoogleAcc: result.data.name
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
}
