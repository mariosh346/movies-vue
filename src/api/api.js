import axios from 'axios'

export function getSearchItems (page, searchText, cancelSource) {
  return axios.get(
    `https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: 'aab385e5451e92c97c2636a7d3b92694',
        query: searchText,
        page: page
      },
      cancelToken: cancelSource.token
    }
  )
}
