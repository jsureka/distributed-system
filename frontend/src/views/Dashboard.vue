<template>
  <div class="container-fluid">
    <!-- Button trigger modal -->
    <div class="">
      <navbar></navbar>
      <br />
      <br />
      <br />
    </div>
    <div class="text-center">
      <div>
        <img :src="user.image" alt="image" v-bind:width="50" class="center" />
        <b>Hello!</b>
        <span>{{ user.name }}</span>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#storyModal"
      >
        View Stories
      </button>
    </div>
    <div class="text-center">
      <button
        class="btn btn-success m-1"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#postModal"
      >
        Post a Status
      </button>
      <button
        class="btn btn-info m-1"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#createStoryModal"
      >
        Create a Story
      </button>
    </div>
    <div class="row" v-for="(status, index) in statuses" :key="index">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="p-3 bg-white mt-5 rounded-t-2xl shadow-lg">
          <div class="flex items-center space-x-2">
            <div>
              <p class="font-medium">{{ status.username }}</p>
            </div>
          </div>

          <p class="pt-4">{{ status.status }}</p>
        </div>
        <div v-if="postImage" class="relative h-56 md:h-96 bg-white">
          <img :src="postImage" class="object-cover w-full" loading="lazy" />
        </div>

        <!-- Post Footer -->
        <div
          class="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t"
        >
          <div class="inputIcon p-3 rounded-none rounded-bl-2xl">
            <i class="fa fa-thumbs-up"></i>
            <p class="text-xs sm:text-base d-inline p-2">Like</p>
          </div>

          <div class="inputIcon p-3 rounded-none">
            <i class="fa fa-comment"></i>
            <p class="text-xs sm:text-base d-inline p-2">Comment</p>
          </div>

          <div class="inputIcon p-3 rounded-none rounded-br-2xl">
            <i class="fa fa-share"></i>
            <p class="text-xs sm:text-base d-inline p-2">Share</p>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>

    <!--Status Modal -->
    <div
      class="modal fade"
      id="postModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Post a Status</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <input
              class="form-control border-1 border-success"
              id="text"
              placeholder="What's on your mind?"
              name="post"
              v-model="status"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="statusSubmit"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--Create Story Modal -->
    <div
      class="modal fade"
      id="createStoryModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create a Story</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <file-preview @input="onFileSelected"></file-preview>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="onStorySubmit"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--Story Modal -->
    <div
      class="modal fade"
      id="storyModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog mw-100 m-0">
        <div class="modal-content background">
          <div class="modal-header border-0">
            <h5 class="modal-title text-white" id="exampleModalLabel">
              Stories
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <stories></stories>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../examples/PageLayout/Navbar.vue";
import Stories from "./Stories.vue";
import FilePreview from "./FilePreview";
import axios from "axios";
export default {
  data: () => ({
    status: "",
    user: {},
    statuses: {},
    inputImage: "",
    minioHost: "127.0.0.1",
    port: "9000",
    bucket: "avatars",
  }),
  components: {
    Navbar,
    Stories,
    FilePreview,
  },
  methods: {
    statusSubmit() {
      const myForm = new FormData();
      myForm.set("user_id", this.user._id);
      myForm.set("username", this.user.name);
      myForm.set("status", this.status);
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      axios
        .post("http://localhost:5000/api/status", myForm, { headers })
        .then((res) => {
          console.log(res);
          axios.get("http://localhost:5000/api/status").then((res) => {
            this.statuses = res.data.status;
          });
        });
    },
    onFileSelected(event) {
      const file = event.target.files[0];
      this.inputImage = file;
    },
    onStorySubmit() {
      let myForm = new FormData();
      myForm.set("image", this.inputImage);
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      axios
        .post("http://localhost:5000/api/story", myForm, { headers })
        .then((res) => {
          console.log(res);
        });
    },
  },
  mounted() {
    axios.get("http://localhost:5000/api/me").then((res) => {
      this.user = res.data.user;
      this.user.image =
        "http://" +
        this.minioHost +
        ":" +
        this.port +
        "/" +
        this.bucket +
        "/" +
        res.data.user.picture;
      console.log(this.user.image);
    });
    axios.get("http://localhost:5000/api/status").then((res) => {
      this.statuses = res.data.status;
    });
  },
};
</script>

<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
