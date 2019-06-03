import axios from 'axios'

let key = 'aab385e5451e92c97c2636a7d3b92694'

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
    `https://api.themoviedb.org/3/search/movie/${id}`, {
      params: {
        api_key: key
      }
    }
  )
}
