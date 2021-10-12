import Vue from "vue";
import App from "@/App.vue";
import VueRouter from "vue-router";
import Balance from "@/components/Balance";
import Converter from "@/components/Converter";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: Balance,
  },
  {
    path: "/converter",
    component: Converter,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");