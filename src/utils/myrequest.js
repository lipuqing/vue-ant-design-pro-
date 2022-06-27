import axios from "axios";
import notification from "ant-design-vue/es/notification";
import { VueAxios } from "./axios";
let token;
// 创建 axios 实例
const $http = axios.create({
  // API 请求的默认前缀
  baseURL: "https://mp.1111.com/",
  timeout: 2000, // 请求超时时间
  headers: {
    "Content-Type": "application/json-patch+json",
    Authorization: "Bearer " + getToken(),
    accept: "*/*",
  },
});

function getToken() {
 // token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJiODQwMjE0Mi00MDhlLTQxYmYtOWQ1OC01MTdiZjQyMDFlN2MiLCJwcmltYXJ5c2lkIjoiZmdhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjAxOTU0ODYxLTkwYjAtNDg5OC1hYjE4LWE5ZTBmMzE0ZmVjYSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3Bvc3RhbGNvZGUiOiJBRE1JTiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwMjQvNy80IDY6NDU6NTAiLCJuYmYiOjE2MzM2NzU1NTAsImV4cCI6MTcyMDA3NTU1MCwiaWF0IjoxNjMzNjc1NTUwLCJpc3MiOiJodHRwczovL3NpbmdjaGluYS5jb20iLCJhdWQiOiJodHRwczovL3NpbmdjaGluYS5jb20ifQ.olXjA2dneaDqA8VxA0UedXRbTKxd8AzpS9BNBg4LOGw`;
  return token;
}
// 异常拦截处理器
const errorHandler = (error) => {
  // if (error.response) {
  // notification.warning({
  //   message: '请求出错',
  //   description: data.message
  // })
  // }
  return Promise.reject(error);
};

// $http interceptor
$http.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + getToken();
  return config;
}, errorHandler);

// response interceptor
$http.interceptors.response.use((response) => {
  return response.data;
}, errorHandler);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, $http);
  },
};

export default $http;

export { installer as VueAxios, $http as axios };
