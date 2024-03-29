import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Dashboard from '../views/Dashboard'
const routes = [
  {
    path: "",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
