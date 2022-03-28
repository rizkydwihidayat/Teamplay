export const state = () => ({
  listMatch: [],
  limit: 10,
  offset: 0,
})

export const mutations = {
  setListMatch(state, list) {},
}

export const actions = {
  setListMatch({ commit }, listCategory) {
    commit('setListMatch', listCategory)
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
      headers: {
        xToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hdWZhbGJhaHJpYXNhbEBnbWFpbC5jb20iLCJpZCI6Ijg3MjA0MmUwLTk2ZGQtMTFlYy1hZTBkLWRmZWIxYWI2YjUwNCIsImlhdCI6MTY0ODQ2OTAyOCwiZXhwIjoxNjQ5MDczODI4fQ.HK8vl7nOSCNRpEOBsqDSNn9jNxZMRWE-AqYmKFwOMMU',
      },
    }
    return this.$axios
      .$get(
        'https://api.naufalbahri.com/api/v1/users/static/match',
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
}
