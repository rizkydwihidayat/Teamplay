export const state = () => ({
  listMatch: [],
  listPlayer: [],
  limit: 10,
  offset: 0,
  isLoading: false,
  isSearch: false,
})

export const mutations = {
  setListMatch(state, list) {
      state.listMatch = list.data.length > 0 && list.data[0] !== null
      // eslint-disable-next-line array-callback-return
      ? list.data.map((value, key) => {
          return {
              gamename: value.match.gameName,
              category: value.match.sportCategory,
              gender: value.match.playerCategory,
              date: value.match.playDate,
              time: value.match.timePlay,
              place: value.venue.venueName,
              status: value.match.status
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
  getListMatch({ context, commit, dispatch }) {
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
      .$get(
        'https://api.naufalbahri.com/api/v1/match',
        axiosOption
      )
      .catch((error) => {
        // handle error
        if (error.response.status === 401) {
          console.log(error)
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

  getListPlayer({ context, commit, dispatch }) {
    const matchid = '0abdf2a0-96cf-11ec-b412-c10fd5947636'
    const axiosOption = {
      headers: {
        xToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hdWZhbGJhaHJpYXNhbEBnbWFpbC5jb20iLCJpZCI6Ijg3MjA0MmUwLTk2ZGQtMTFlYy1hZTBkLWRmZWIxYWI2YjUwNCIsImlhdCI6MTY0ODQ2OTAyOCwiZXhwIjoxNjQ5MDczODI4fQ.HK8vl7nOSCNRpEOBsqDSNn9jNxZMRWE-AqYmKFwOMMU',
      },
    }
    return this.$axios
      .$get(
        `https://api.naufalbahri.com/api/v1/users/match/${matchid}/match`,
        axiosOption
      )
      .catch((error) => {
        // handle error
        if (error.response.status === 401) {
          console.log(error)
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

  getListVenue({ context, commit, dispatch }) {
    
  }
}
