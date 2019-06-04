import axios from 'axios'

// axios.defaults.headers.common['x-csrf-token'] = !!document.querySelector('meta[name="csrf-token"]') && document.querySelector('meta[name="csrf-token"]').content
// axios.defaults.headers.common['Authorization'] = window.api_token
// axios.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest'

let key = 'aab385e5451e92c97c2636a7d3b92694'
let sessionId

export function getSearchItems (page, searchText, cancelSource) {
  return axios.get(
    `https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: key,
        query: searchText,
        page: page
      },
      cancelToken: cancelSource.token
    }
  )
}

export function getMovie (id) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: key
      }
    }
  )
}

export function getSessionId () {
  return axios.get(
    `https://api.themoviedb.org/3/authentication/guest_session/new`, {
      params: {
        api_key: key
      }
    }
  ).then((response) => {
    return sessionId = response.guest_session_id
    // setTimeout(() => {
    //   getSessionId()
    // }, Date.parse(response.expires_at) - Date.now());
  })
}

export function rateMovie(id, rating) {
  if(!sessionId) {
    return getSessionId().then((response) => {
      return postRate(id, rating, sessionId)
    })
  }
  else
    return postRate(id, rating, sessionId)
}

export function postRate(id, rating) {
  return axios.post(
    `https://api.themoviedb.org/3/movie/${id}/rating`, {
      value: rating
    }, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      params: {
        api_key: key,
        guest_session_id: window.sessionId
      }
    })
}
