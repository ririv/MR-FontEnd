import axios from 'axios'
import Vue from 'vue'

export const imgBaseURL = 'file/img/'
export const baseURL = 'http://localhost:8080/'

axios.defaults.baseURL = baseURL
axios.defaults.headers.common['X-Requested-With']='XMLHttpRequest' //TODO

Vue.prototype.axios = axios
Vue.prototype.baseURL = baseURL
Vue.prototype.imgBaseURL = imgBaseURL