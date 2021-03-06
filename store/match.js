export const state = () => ({
  listMatch: [],
  listMatchHistory: [],
  listPlayer: [],
  listCity: [],
  listVenue: [],
  matchdetail: {},
  matchdetailuser: {},
  limit: 10,
  offset: 0,
  isLoading: false,
  isSearch: false,
  filterCity: '',
  isFutsal: false,
  isSoccer: false,
  isBasket: false,
  isMiniSoccer: false,
  timeDur: '',
  lat: 0,
  lng: 0,
  address: '',
})

export const mutations = {
  setState(state, params) {
    const keys = Object.keys(params)
    keys.forEach((key) => (state[key] = params[key]))
  },
  setMatchDetail(state, resp) {
    const matchData = {
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
      price: resp.data.match.price,
      totalPayer: resp.data.numberOfPlayers,
    }
    state.listPlayer = resp.data.players
    state.matchdetail = matchData
  },
  setUserMatchDetail(state, resp) {
    const matchData = {
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
      price: resp.data.match.price,
      gameStatus: resp.data.gameStatus,
      totalPayer: resp.data.numberOfPlayers,
    }
    state.listPlayer = resp.data.players
    state.matchdetailuser = matchData
  },
  setListMatch(state, list) {
    if (list.data) {
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
                players: value.players,
              }
            }, {})
          : []
    }
  },
  setMatchHistory(state, { data }) {
    const listMatchHistory = state.listMatchHistory
    state.listMatchHistory = listMatchHistory.concat(
      data.map((value) => {
        return {
          gamename: value.match.match.gameName,
          place: value.match.venue.venueName,
          time: value.match.match.timePlay,
          date: value.match.match.playDate,
          id: value.match.match.id,
          absen: value.isAbsent,
          joined: value.isJoined,
          totalPayer: value.match.numberOfPlayers,
          status: value.match.match.status,
          category: value.match.match.sportCategory,
          gameStatus: value.gameStatus,
        }
      })
    )
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
  setMatchDetail({ commit }, matchData) {
    commit('setMatchDetail', matchData)
  },
  setUserMatchDetail({ commit }, matchDataUser) {
    commit('setUserMatchDetail', matchDataUser)
  },
  setMatchHistory({ commit }, matchToday) {
    commit('setMatchHistory', matchToday)
  },
  getListMatch({ state, commit, dispatch }, { params }) {
    const param = {
      limit: params.limit,
      offset: state.offset,
      q: params.city,
      from: params.startDate,
      to: params.endDate,
      timeCategory: params.time,
    }
    if (params.limit === 5) {
      param.limit = 5
    } else {
      param.limit = state.limit
    }
    return this.$axios
      .$get(
        `https://api.naufalbahri.com/api/v1/match?limit=${param.limit}&offset=${param.offset}&q=${param.q}&from=${param.from}&to=${param.to}&timeCategory=${param.timeCategory}`
      )
      .then((result) => {
        commit('setState', { isLoading: false })
        return result
      })
      .catch((error) => {
        // handle error
        if (error.response.status !== 404) {
          const alertMsg = {
            msg: 'Token kadaluwarsa, silahkan login kembali.',
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/login')
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

  getMatchHistory(
    { context, commit, dispatch },
    { bearer, userID, offsetPage, pageLimit }
  ) {
    const axiosOption = {
      headers: {
        xToken: bearer,
      },
    }
    return this.$axios
      .$get(
        `https://api.naufalbahri.com/api/v1/users/${userID}/match-history?offset=${offsetPage}&limit=${pageLimit}`,
        axiosOption
      )
      .then((result) => {
        // const alertMsg = {
        //   msg: 'Berhasil mengambil data',
        //   color: '#43A047',
        // }
        // dispatch('ui/showAlert', alertMsg, { root: true })
        commit('setState', {
          offset: offsetPage + pageLimit,
        })

        return result
      })
      .catch((error) => {
        // handle error
        if (error.response.status === 403) {
          const alertMsg = {
            msg: error.response.data.message,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/login')
        } else {
          const alertMsg = {
            msg: error.response.data.message,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
        }
        return false
      })
  },

  getUserMatchDetail({ dispatch }, { userId, matchId, bearer }) {
    const axiosOption = {
      headers: {
        xToken: bearer,
      },
    }
    return this.$axios
      .$get(
        `https://api.naufalbahri.com/api/v1/users/${userId}/match/${matchId}/match-detail`,
        axiosOption
      )
      .catch((error) => {
        // handle error
        if (error.response.status !== 404) {
          const alertMsg = {
            msg: 'Token kadaluwarsa, silahkan login kembali.',
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/login')
        } else if (error.response.status === 500) {
          const alertMsg = {
            msg: error,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/login')
        }
        return false
      })
  },

  getMatchId({ context, commit, dispatch }, { id }) {
    return this.$axios
      .$get(`https://api.naufalbahri.com/api/v1/match/${id}`)
      .catch((error) => {
        // handle error
        if (error.response.status !== 404) {
          const alertMsg = {
            msg: 'Token kadaluwarsa, silahkan login kembali.',
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/login')
        } else if (error.response.status === 500) {
          const alertMsg = {
            msg: error,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/login')
        }
        return false
      })
  },

  getListCity({ context, commit, dispatch }, { keyword }) {
    return this.$axios
      .$get(`https://api.naufalbahri.com/api/v1/static/cities?q=${keyword}`)
      .catch((error) => {
        // handle error
        if (error.response.status !== 404) {
          const alertMsg = {
            msg: 'Token kadaluwarsa, silahkan login kembali.',
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/login')
        } else {
          const alertMsg = {
            msg: error,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
        }
        return false
      })
  },

  getListVenue(
    { context, commit, dispatch },
    { keyword, cityID, bearer, sport }
  ) {
    const axiosOption = {
      headers: {
        xToken: bearer,
      },
    }
    return this.$axios
      .$get(
        `https://api.naufalbahri.com/api/v1/venue?q=${keyword}&cityId=${cityID}&sport=${sport}`,
        axiosOption
      )
      .catch((error) => {
        // handle error
        if (error.response.status === 403) {
          const alertMsg = {
            msg: error.response.data.message,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/login')
        } else {
          const alertMsg = {
            msg: error.response.data.message,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
        }
        return false
      })
  },

  createMatch({ dispatch }, { params, bearer }) {
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
    // const postData = JSON.stringify(data)
    return this.$axios
      .$post('https://api.naufalbahri.com/api/v1/match', data, axiosOption)
      .catch((error) => {
        if (error.response.status === 401) {
          const errMsg = 'Username atau kata sandi salah'
          const alertMsg = {
            msg: errMsg,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
        } else {
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
  },

  createVenue({ context, commit, dispatch }, { params, bearer }) {
    const axiosOption = {
      headers: {
        xToken: bearer,
      },
    }
    const data = {
      cityId: params.cityId,
      sportCategory: params.sportCategory,
      name: params.name,
      address: params.address,
      coordinate: params.coordinate,
      minimumDuration: parseInt(params.minimumDuration),
      pricePerHours: parseInt(params.pricePerHours),
    }
    // const postData = JSON.stringify(data)
    return this.$axios
      .$post('https://api.naufalbahri.com/api/v1/venue', data, axiosOption)
      .catch((error) => {
        if (error.response.status === 401) {
          const errMsg = 'Username atau kata sandi salah'
          const alertMsg = {
            msg: errMsg,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
        } else {
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
  },

  joinMatch({ context, commit, dispatch }, { params, bearer }) {
    this.$axios.setHeader('xToken', `${bearer}`, ['post'])
    return this.$axios
      .$post(
        `https://api.naufalbahri.com/api/v1/match/${params.matchId}/join?invitedFrom=${params.invitedFrom}`
      )
      .then((result) => {
        if (result.message !== '') {
          const errMsg = result.message
          const alertMsg = {
            msg: errMsg,
            color: '#43A047',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          const errMsg = error.response.data.message
          const alertMsg = {
            msg: errMsg,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/')
        } else {
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
  },

  exitMatch({ dispatch }, { matchid, bearer }) {
    this.$axios.setHeader('xToken', `${bearer}`, ['post'])
    return this.$axios
      .$post(`https://api.naufalbahri.com/api/v1/match/${matchid}/exit`)
      .then((result) => {
        if (result.message) {
          const errMsg = result.message
          const alertMsg = {
            msg: errMsg,
            color: '#43A047',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/')
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          const errMsg = error.response.data.message
          const alertMsg = {
            msg: errMsg,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/')
        } else {
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
  },

  finishMatch({ dispatch }, { matchid, bearer, listUserId }) {
    const bodyData = {
      data: listUserId,
    }
    this.$axios.setHeader('xToken', `${bearer}`, ['post'])
    return this.$axios
      .$post(
        `https://api.naufalbahri.com/api/v1/match/${matchid}/finish`,
        bodyData
      )
      .then((result) => {
        if (result.message) {
          const errMsg = result.message
          const alertMsg = {
            msg: errMsg,
            color: '#43A047',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/')
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          const errMsg = error.response.data.message
          const alertMsg = {
            msg: errMsg,
            color: 'secondary',
          }
          dispatch('ui/showAlert', alertMsg, { root: true })
          this.$router.push('/')
        } else {
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
  },
}
