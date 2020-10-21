<template>
  <div class="list row">

     <div class="col-md-12">
      <div class="mb-3">
        Items per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>
        <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        pills
        @change="handlePageChange"
      ></b-pagination>
    </div>

    <div class="col-md-6">
      <h4>Majors List</h4>
      <ul class="list-group" id="majors-list">
        <li class="list-group-item"
          :class="{ active: major.id == currentIndex }"
          v-for="major in majors"
          :key="major.major_id"
          @click="setActiveMajor(major)"
        >
          {{ major.major_name }}
        </li>
      </ul>

      
    </div>

    <div class="col-md-4">
      <div v-if="currentMajor">
        <h4>Major</h4>
        <div>
          <label><strong>ID: </strong></label> {{ currentMajor.major_id }}
        </div>
        <div>
          <label><strong>Name: </strong></label> {{ currentMajor.major_name }}
        </div>
        <div>
          <label><strong>Department: </strong></label> {{ currentMajor.dept }}
        </div>
        <div>
          <label><strong>Hours: </strong></label> {{ currentMajor.hours }}
        </div>
        
        <v-btn @click="editMajor">Edit and Delete</v-btn>
       <!--a class="badge badge-warning" :href="'/courses/' + currentCourse.id"> Edit or Delete</a-->
   
      </div>
      <div v-else>
        <br />
        <p>Please click on a Major..</p>
      </div>
    </div>
  </div>
</template>

<script>
import MajorDataService from "../services/MajorDataService";

export default {
  name: "majors-list",
  data() {
    return {
      majors: [],
      currentMajor: null,
      currentIndex: -1,

      page: 1,
      count: 0,
      pageSize: 3,

      pageSizes: [5,10,15],
    };
  },
  methods: {
    getRequestParams(page, pageSize) {
      let params = {};

      if (page) {
        params["page"] = page -1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    retrieveMajors() {
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );

        MajorDataService.getAll(params)
        .then((response) => {
          const { majors, totalItems } = response.data;
          this.majors = majors;
          this.count = totalItems;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveMajors();
    },

     handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveMajors();
    },

    refreshList() {
      this.retrieveMajors();
      this.currentMajor = null;
      this.currentIndex = -1;
    },

    setActiveMajor(major) {
      this.currentMajor = major;
      this.currentIndex = major.major_id;
    },

    editMajor() {
      this.$router.push({ name: 'majoredit', params: { id: this.currentIndex } })
    }
  },
  mounted() {
    this.retrieveMajors();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 1400px;
  margin: fixed;
}
</style>