// Info API: https://www.themoviedb.org/settings/api
const API = "https://api.themoviedb.org/3";

// Funcion que hace el llamdo a la API
// export const get = (path) => {
//   return fetch (API+path, {
//     headers: {
//       Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTg3M2YyNDAzY2E1OTczMmIxNGQ5NjA1NjU5YzhiYiIsInN1YiI6IjYzOTE5ZmNlN2Q1NTA0MDBhMmU3ZDA3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YlbGH891tITiZxD2s0K3qhPBGwkJuPdyHZX4gRQi_Co",
//       "Content-Type": "application/json;charset=utf-8",
//     }
//   }).then((results) => results.json())
// }

export const get = (path) => {
  return fetch (API+path, {
    headers: {
      Authorization:
      "Bearer " + process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json;charset=utf-8",
    }
  }).then((results) => results.json())
}