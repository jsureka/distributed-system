<template>

  <div
    class="page-header align-items-middle min-vh-100"
    style="
      
    "
  >
    <navbar></navbar>
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class=" col-md-8 text-center">
          <img src="../assets/img/signinImage.png" alt="" height="700" class="">
        </div>
        <div class="col-lg-3 col-md-4 ">
                            <img src="../assets/img/logo.png" alt="" height="140" class="">

          <div class="card z-index-0 fadeIn3 fadeInBottom mt-5">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-success signin-bg border-radius-lg py-3 pe-1"
              >
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Sign in
                </h4>

              </div>
            </div>
            <div class="card-body">
              <form role="form" class="text-start mt-3">
                <div class="mb-3">
                  <material-input
                    id="email"
                    type="email"
                    label="Email"
                    name="email"
                  />
                </div>
                <div class="mb-3">
                  <material-input
                    id="password"
                    type="password"
                    label="Password"
                    name="password"
                  />
                </div>
                <div class="text-center">
                  <material-button
                    class="my-4 mb-2 materialButton text-white"
                    fullWidth
                    >Sign in</material-button
                  >
                </div>
                <p class="mt-4 text-sm text-center">
                  Don't have an account?
                  <router-link
                    :to="{ name: 'SignUp' }"
                    class=" font-weight-bold"
                    >Sign up</router-link
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import Navbar from "../examples/PageLayout/Navbar.vue"
import { mapMutations } from "vuex";

export default {
  name: "sign-in",
  components: {
    MaterialInput,
    MaterialButton,
    Navbar
  },
  beforeMount() {
  
  },
  beforeUnmount() {
  
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
  },
};
</script>

<style scoped>
  .signin-bg{
    background: #6f42c1;
  }
  .materialButton:hover{
    background: #e4d4ed !important;  
    color: #6f42c1 !important;
  }
</style>