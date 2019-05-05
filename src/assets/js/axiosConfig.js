import axios from 'axios'
import Vue from 'vue'

export const imgBaseURL = 'file/img/'
export const rootURL = 'http://localhost:8080/'
export const apiURL = 'api/v1/'
export const baseURL = rootURL+apiURL

axios.defaults.baseURL = baseURL
axios.defaults.headers.common['X-Requested-With']='XMLHttpRequest' //TODO

Vue.prototype.axios = axios
Vue.prototype.baseURL = baseURL
Vue.prototype.imgBaseURL = imgBaseURL
Vue.prototype.rootURL = rootURL
Vue.prototype.apiURL = apiURL