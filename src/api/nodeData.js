import http from '../config/http'

const baseUrl = '/api/'

export const getData = () => {
  return http.get(`${baseUrl}getData`)
}

export const deleteData = (id) => {
  return http.get(`${baseUrl}deleteData`, {id})
}

export const addData = (name) => {
  return http.get(`${baseUrl}addData`, {name})
}

export const addDatas = (names) => {
  return http.post(`${baseUrl}addDatas`, {names})
}

export const getJueJinData = () => {
  return http.get(`${baseUrl}getJueJinData`)
}
