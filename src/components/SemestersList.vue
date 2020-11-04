<template>
  
  <div class="list row">
    

     <div class="col-md-12">
      <div class="mb-3">
        Semesters per Page:
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
      
      <h4>Semesters List 
        <v-btn
          to="/semesteradd"
          class="add-button"
          text-lg-right
        >
        <span class="mr-2">
        <v-icon>mdi-plus</v-icon>
        </span>
        </v-btn>
      </h4>
      <ul class="list-group" id="semesters-list">
        <li class="list-group-item"
          :class="{ active: semester.id == currentIndex }"
          v-for="semester in semesters"
          :key="semester.semester_id"
          @click="setActiveSemester(semester)"
        >
          {{ semester.semester_name }}
        </li>
      </ul>

      
    </div>

    <div class="col-md-4">
      <div v-if="currentSemester">
        <h4>Semester</h4>
        
        <div>
          <label><strong>Name: </strong></label> {{ currentSemester.semester_name }}
        </div>
        <div>
          <label><strong>Start Date: </strong></label> {{ currentSemester.start_date }}
        </div>
        <div>
          <label><strong>End Date: </strong></label> {{ currentSemester.end_date }}
        </div>
        
        <v-btn @click="editSemester">Edit and Delete</v-btn>
   
      </div>
      <div v-else>
        <br />
        <p>Please click on a Semester..</p>
      </div>
    </div>
  </div>
</template>

<script>
import SemesterDataService from "../services/SemesterDataService";

export default {
  name: "semesters-list",
  data() {
    return {
      semesters: [],
      currentSemester: null,
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

    retrieveSemesters() {
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );

        SemesterDataService.getAll(params)
        .then((response) => {
          const { semesters, totalItems } = response.data;
          this.semesters = semesters;
          this.count = totalItems;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveSemesters();
    },

     handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveSemesters();
    },

    refreshList() {
      this.retrieveSemesters();
      this.currentSemester = null;
      this.currentIndex = -1;
    },

    setActiveSemester(semester) {
      this.currentSemester = semester;
      this.currentIndex = semester.semester_id;
    },

    editSemester() {
      this.$router.push({ name: 'semesteredit', params: { id: this.currentIndex } })
    }
  },
  mounted() {
    this.retrieveSemesters();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 1400px;
  margin: fixed;
}

.add-button {
  margin-left:90%; 
  margin-right:0;
}
</style>