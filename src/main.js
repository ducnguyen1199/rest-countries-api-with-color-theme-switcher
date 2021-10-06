import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'font-awesome/css/font-awesome.min.css';
import { init } from '@/services/api.service';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

init();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
