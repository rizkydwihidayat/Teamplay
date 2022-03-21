export const state = () => ({
  email: '',
  password: '',
})
export const actions = {
  postLogin({ dispatch, commit, state }) {
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
      email: state.email,
      password: state.password,
    }
    const querystring = require('querystring')
    const postData = querystring.stringify(data)
    return this.$axios
      .$post('users/login', postData)
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
