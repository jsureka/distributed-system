<template>
  <div class="page-header align-items-middle min-vh-100" style="">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-8 text-center">
          <img
            src="../assets/img/signinImage.png"
            alt=""
            width=" 700"
            class=""
          />
        </div>
        <div class="col-lg-3 col-md-4">
          <img src="../assets/img/logo.png" alt="" height="140" class="" />

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
              <form role="form" class="text-start mt-3"  @submit.prevent="onSubmit">
                <div class="mb-3 border-1 border-secondary">
                  <input
                    id="email"
                    class="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    v-model="email"
                    name="email"
                  />
                </div>
                <div class="mb-3 border-1 border-secondary">
                  <input
                    id="password"
                    class="form-control form-control-lg"
                    type="password"
                    v-model="password"
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <div class="text-center">
                  <material-button
                    class="my-4 mb-2 materialButton text-white"
                    fullWidth
                    type="submit"
                    >Sign in</material-button
                  >
                </div>
                <p class="mt-4 text-sm text-center">
                  Don't have an account?
                  <router-link :to="{ name: 'SignUp' }" class="font-weight-bold"
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
import MaterialButton from "@/components/MaterialButton.vue";
import { mapMutations } from "vuex";
import axios from 'axios';
import router from '@/router'
axios.defaults.withCredentials = true;

export default {
  name: "sign-in",
  data: () => ({
    email: "",
    password:""
  }),
  components: {
    MaterialButton,
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    onSubmit() {
      const myForm = new FormData();
      myForm.set("email", this.email);
      myForm.set("password", this.password);
      const headers = {
        "Content-Type" : "multipart/form-data"
      }
      axios.post('http://localhost:5000/api/login', myForm,{headers}).then((res) => {
        console.log(res);
        if(res.data.success === true){
          router.push({name : 'Dashboard'});
        }
      })
    },
  },
};
</script>

<style scoped>
.signin-bg {
  background: #6f42c1;
}
.materialButton:hover {
  background: #e4d4ed !important;
  color: #6f42c1 !important;
}
</style>
