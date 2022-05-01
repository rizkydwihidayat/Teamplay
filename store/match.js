export const state = () => ({
  listMatch: [],
  listPlayer: [],
  listCity: [],
  listVenue: [],
  matchdetail: {},
  limit: 10,
  offset: 0,
  isLoading: true,
  isSearch: false,
})

export const mutations = {
  setState(state, params) {
    const keys = Object.keys(params)
    keys.forEach((key) => (state[key] = params[key]))
  },
  setMatchDetail(state, resp) {
    const store = {
      id: resp.data.match.id,
      gameName: resp.data.match.gameName,
      playDate: resp.data.match.playDate,
      time: resp.data.match.timePlay,
      playerCategory: resp.data.match.playerCategory,
      sportCategory: resp.data.match.sportCategory,
      duration: resp.data.match.duration,
      address: resp.data.venue.address,
      venueName: resp.data.venue.venueName,
      coordinate: resp.data.venue.coordinate,
      city: resp.data.venue.city,
      name: resp.data.organizer.name,
      created: resp.data.organizer.hasCreated,
      phone: resp.data.organizer.phoneNumber,
      player: resp.data.players
    }

    state.matchdetail = store
  },
  setListMatch(state, list) {
    state.listMatch =
      list.data.length > 0 && list.data[0] !== null
        ? // eslint-disable-next-line array-callback-return
          list.data.map((value, key) => {
            return {
              id: value.match.id,
              gamename: value.match.gameName,
              category: value.match.sportCategory,
              gender: value.match.playerCategory,
              date: value.match.playDate,
              time: value.match.timePlay,
              place: value.venue.venueName,
              status: value.match.status,
            }
          }, {})
        : []
  },
  setListCity(state, list) {
    state.listCity =
      list.data.length > 0 && list.data[0] !== null
        ? // eslint-disable-next-line array-callback-return
          list.data.map((value, key) => {
            return {
              id: value.id,
              name: value.name,
            }
          }, {})
        : []
  },
  setListVenue(state, list) {
    state.listVenue =
      list.data.length > 0 && list.data[0] !== null
        ? // eslint-disable-next-line array-callback-return
          list.data.map((value, key) => {
            return {
              id: value.id,
              citie: value.cityName,
              venue: value.venueName,
              category: value.sportCategory,
              address: value.address,
              coordinate: value.coordinate,
              duration: value.minimumDurationRent,
              price: value.pricePerHours,
            }
          }, {})
        : []
  },
}

export const actions = {
  setListMatch({ commit }, listMatch) {
    commit('setListMatch', listMatch)
  },
  setListPlayer({ commit }, listPlayer) {
    commit('setListPlayer', listPlayer)
  },
  setListCity({ commit }, listCity) {
    commit('setListCity', listCity)
  },
  setListVenue({ commit }, listVenue) {
    commit('setListVenue', listVenue)
  },
  setMatchDetail({ commit }, storeData) {
    commit('setMatchDetail', storeData)
  },
  getListMatch(
    { context, commit, dispatch },
    // { city, startDate, endDate, time }
  ) {
    const axiosOption = {
      params: {
        limit: state.limit,
        offset: state.offset,
        q: 'bogor',
        from: '2022-01-01',
        to: '2022-05-20',
        timeCategory: '1-2',
      },
    }

    return this.$axios
      .$get('https://api.naufalbahri.com/api/v1/match', axiosOption)
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

  getMatchId({ context, commit, dispatch }, {id}) {
    return this.$axios
      .$get(`https://api.naufalbahri.com/api/v1/match/${id}`)
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
        } else if (error.response.status === '500') {
          const alertMsg = {
            msg: 'Get item store failed',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/login')
        }
        return false
      })
  },

  getListCity({ context, commit, dispatch }, { keyword }) {
    const params = { q: keyword }
    return this.$axios
      .$get(`https://api.naufalbahri.com/api/v1/static/cities`, params)
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

  getListVenue({ context, commit, dispatch }, { keyword, cityID, bearer }) {
    const axiosOption = {
      headers: {
        xToken: bearer,
      },
    }
    return this.$axios
      .$get(
        `https://api.naufalbahri.com/api/v1/venue?q=${keyword}&cityId=${cityID}`,
        axiosOption
      )
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

  createMatch({ context, commit, dispatch }, {params, bearer}) {
    const axiosOption = {
      headers: {
        xToken: bearer,
      },
    }
    const data = {
      venueId: params.venueId,
        gameName: params.gameName,
        playerCategory: params.playerCategory,
        playDate: params.playDate,
        startTime: params.startTime,
        endTime: params.endTime,
        minPlayer: params.minPlayer,
        maxPlayer: params.maxPlayer,
    }
    const postData = JSON.stringify(data)
    return this.$axios
      .$post('https://api.naufalbahri.com/api/v1/match', postData, axiosOption)
      .catch((error) => {
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
          this.$router.push('/')
        }
      })
  }
}
