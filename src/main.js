import { createApp } from "vue";
import App from "./App.vue";
// import store from "./store"; // 引入 Vuex store
import router from "./router"; // 引入 Vue Router

const app = createApp(App);

// 将 Vuex store 挂载到应用实例上
// app.use(store);

// 将 Vue Router 挂载到应用实例上
app.use(router);

// 最后，挂载应用到 HTML 元素上
app.mount("#app");
