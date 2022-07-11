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
        Create a Post
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
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="p-3 bg-white mt-5 rounded-t-2xl shadow-lg">
          <div class="flex items-center space-x-2">
            <img
              class="rounded-full icon"
              :src="image"
              width="40"
              height="40"
            />
            <div>
              <p class="font-medium">{{ name }}</p>
              <p v-if="timestamp" class="text-xs text-gray-400">
                {{ new Date(timestamp?.toDate()).toLocaleString() }}
              </p>
              <p v-else class="text-xs text-gray-400">Loading</p>
            </div>
          </div>

          <p class="pt-4">{{ message }}</p>
        </div>
        <div v-if="postImage" class="relative h-56 md:h-96 bg-white">
          <img :src="postImage" class="object-cover w-full" loading="lazy" />
        </div>

        <!-- Post Footer -->
        <div
          class="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t"
        >
          <div class="inputIcon p-3 rounded-none rounded-bl-2xl">
            <i class=" fa fa-thumbs-up"></i>
            <p class="text-xs sm:text-base d-inline p-2">Like</p>
          </div>

          <div class="inputIcon p-3 rounded-none">
            <i class=" fa fa-comment"></i>
            <p class="text-xs sm:text-base d-inline p-2">Comment</p>
          </div>

          <div class="inputIcon p-3 rounded-none rounded-br-2xl">
            <i class=" fa fa-share "></i>
            <p class="text-xs sm:text-base d-inline p-2">Share</p>
          </div>
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
    

    <!--Post Modal -->
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
            <h5 class="modal-title" id="exampleModalLabel">Create a Post</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <material-input
              id="text"
              placeholder=""
              label="What's on your mind?"
              name="post"
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
            <button type="button" class="btn btn-success">Post</button>
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
            <file-preview></file-preview>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-success">Post</button>
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
import MaterialInput from "@/components/MaterialInput.vue";
import FilePreview from "./FilePreview";

export default {
  components: {
    Navbar,
    Stories,
    MaterialInput,
    FilePreview,
  },
};
</script>

<style></style>
