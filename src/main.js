
import { notification } from 'ant-design-vue';
import {createApp} from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App'
import store from './store'
import router from './router'
 

const app = createApp(App)

app.config.productionTip = false 
app
.use(Antd)
.use(notification)
.use(router)
.use(store)
.mount('#app')