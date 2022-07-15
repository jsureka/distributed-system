<template>
  <div class="bg-white">
    <main class="mt-0 main-content">
      <section>
        <div class="page-header min-vh-100">
          <navbar></navbar>
          <div class="container">
            <div class="row">
              <div
                class="col-6 d-lg-flex d-none h-100 my-auto pe-0 ps-0 position-absolute top-0 start-0 text-center justify-content-center flex-column"
              >
                <img src="../assets/img/signupImage.webp" alt="" />
                <!-- <div
                  class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/signupImage.webp') +
                      ')',
                  }"
                ></div> -->
              </div>
              <div
                class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5"
              >
                <div class="card card-plain">
                  <div class="pb-0 card-header bg-transparent mb-4">
                    <h4 class="font-weight-bolder">Sign Up</h4>
                    <p class="mb-0">
                      Enter your email and password to register
                    </p>
                  </div>
                  <div class="card-body">
                    <form role="form" @submit.prevent="submit">
                      <div class="mb-3 border-secondary border-1">
                        <input
                          class="form-control form-control-lg"
                          id="name"
                          type="text"
                          label="Name"
                          v-model="userName"
                          placeholder=" Name"
                        />
                      </div>
                      <div class="mb-3 border-secondary border-1">
                        <input
                          class="form-control form-control-lg"
                          id="email"
                          type="email"
                          v-model="userEmail"
                          placeholder="Email"
                          name="email"
                          size="lg"
                        />
                      </div>
                      <div class="mb-3 border-secondary border-1">
                        <input
                          class="form-control form-control-lg"
                          id="password"
                          type="password"
                          v-model="userPassword"
                          placeholder="Password"
                          name="password"
                          size="lg"
                        />
                      </div>
                      <div class="mb-3 border-secondary border-1">
                        <input
                          class="form-control form-control-lg"
                          id="file"
                          v-on:change="onFileSelected"
                          type="file"
                          size="lg"
                        />
                      </div>
                      <div class="text-center">
                        <material-button
                          class="mt-4"
                          variant="gradient"
                          type="submit"
                          color="success"
                          fullWidth
                          size="lg"
                          >Sign Up</material-button
                        >
                      </div>
                    </form>
                  </div>
                  <div class="px-1 pt-0 text-center card-footer px-lg-2">
                    <p class="mx-auto mb-4 text-sm">
                      Don't have an account?
                      <router-link
                        :to="{ name: 'SignIn' }"
                        class="text-success text-gradient font-weight-bold"
                        >Sign In</router-link
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import MaterialButton from "@/components/MaterialButton.vue";
import Navbar from "../examples/PageLayout/Navbar.vue";
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "sign-up",
  data: () => ({
    userName: "",
    userEmail: "",
    userPassword: "",
    userImage: "",
  }),
  components: {
    MaterialButton,
    Navbar,
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    submit() {
      // const userData = {
      //   name : this.userName,
      //   email : this.userEmail,
      //   password : this.userPassword,
      //   image : this.userImage
      // }
      let myForm = new FormData();
      myForm.set("name", this.userName);
      myForm.set("email", this.userEmail);
      myForm.set("password", this.userPassword);
      myForm.set("image", this.userImage);
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      console.log(myForm.get("name"));
      axios.post("http://localhost:5000/api/register", myForm, {headers}).then((res) => {
        console.log(res);
      });
    },
    onFileSelected(event) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          this.userImage = reader.result;
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    },
  },
};
</script>
<style scoped>
.myForm:focus {
  border-color: #6f42c1 !important ;
}
</style>
