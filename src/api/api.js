import axios from 'axios'

// axios.defaults.headers.common['x-csrf-token'] = !!document.querySelector('meta[name="csrf-token"]') && document.querySelector('meta[name="csrf-token"]').content
// axios.defaults.headers.common['Authorization'] = window.api_token
// axios.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest'

let key = 'aab385e5451e92c97c2636a7d3b92694'
let sessionId

export function getSearchItems (page, cancelSource, searchText) {
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

export function getItemsNowPlaying(page, cancelSource) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/now_playing`, {
      params: {
        api_key: key,
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

export function getMovieVideos (id) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos`, {
      params: {
        api_key: key
      }
    }
  ).then(({ data }) => {
    return data.results;
  })
}

export function getMovieReviews (id) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews`, {
      params: {
        api_key: key
      }
    }
  ).then(({ data }) => {
    return data.results.splice(0,2);
  })
}

export function getMovieSimilar (id) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/similar`, {
      params: {
        api_key: key
      }
    }
  ).then(({ data }) => {
    return data.results;
  })
}

export function getSessionId () {
  return axios.get(
    `https://api.themoviedb.org/3/authentication/guest_session/new`, {
      params: {
        api_key: key
      }
    }
  ).then((response) => {
    sessionId = response.data.guest_session_id
    // setTimeout(() => {
    //   getSessionId()
    // }, Date.parse(response.expires_at) - Date.now());
  })
}

export function rateMovie(id, rating) {
  if(!sessionId) {
    return getSessionId().then(() => {
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
        guest_session_id: sessionId
      }
    })
}
