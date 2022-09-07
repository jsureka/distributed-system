<template>
  <!-- Navbar -->
  <nav
    class="top-0 navbar navbar-expand-lg position-absolute z-index-3"
    :class="isBlur ? isBlur : 'shadow-none my-2 w-100'"
  >
    <div class="container px-0">
      <button
        class="navbar-toggler shadow-none ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div
        class="collapse navbar-collapse shadow-sm rounded-2 bg-light p-1"
        id="navigation"
      >
        <img src="../../assets/img/logo.png" alt="" class="" width="100" />
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link
              class="nav-link d-flex align-items-center me-2 active"
              aria-current="page"
              to="/dashboard"
            >
              <i
                class="fa fa-chart-pie opacity-6 me-1 fs-6"
                aria-hidden="true"
              ></i>
              Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link me-2" to="/">
              <i class="fa fa-user opacity-6 me-1 fs-6" aria-hidden="true"></i>
              Profile
            </router-link>
          </li>
          <li class="nav-item">
            <button class="nav-link me-2" to="/sign-up" @click="onLogout">
              <i
                class="fas fa-user-circle opacity-6 me-1 fs-6"
                aria-hidden="true"
              ></i>
              Logout
            </button>
          </li>
          <!-- <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link me-2" to="/sign-up">
              <i
                class="fas fa-user-circle opacity-6 me-1 fs-6"
                aria-hidden="true"
              ></i>
              Sign Up
            </router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link me-2" to="/">
              <i class="fas fa-key opacity-6 me-1 fs-6" aria-hidden="true"></i>
              Sign In
            </router-link>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import downArrWhite from "@/assets/img/down-arrow-white.svg";
import downArrBlack from "@/assets/img/down-arrow-dark.svg";
import router from '@/router'
import axios from "axios";
export default {
  name: "navbar",
  data() {
    return {
      downArrWhite,
      downArrBlack,
      isLoggedIn: false,
    };
  },
  props: {
    btnBackground: String,
    isBlur: String,
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    darkModes() {
      return {
        "text-dark": this.darkMode,
      };
    },
  },
  methods : {
    onLogout(){
          axios.get("http://localhost:8001/logout").then((res) => {
      console.log(res);
      this.isLoggedIn =true;
      router.push({name : "SignIn"})
    });
    }
  }
};
</script>
<style scoped>
.bg-light {
  background: rgb(255, 255, 255, 0.4) !important;
}
</style>
