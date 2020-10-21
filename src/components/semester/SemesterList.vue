<template>
  <div ref="content">
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search by Semester"
            v-model="searchSemesterName"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="
                page = 1;
                retrieveSemesters();
              "
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <div class="mb-3">
          <v-btn @click="download()">Download PDF </v-btn>
          <br />
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
        <h4>Semesters List</h4>
        <ul class="list-group" id="semesters-list">
          <li
            class="list-group-item"
            :class="{ active: semester.id == currentIndex }"
            v-for="semester in semesters"
            :key="semester.id"
            @click="setActiveSemester(semester)"
          >
            {{ semester.name }}
          </li>
        </ul>
      </div>

      <div class="col-md-4">
        <div v-if="currentSemester">
          <h4>Semester</h4>
          <div>
            <label><strong>ID: </strong></label> {{ currentSemester.id }}
          </div>
          <div>
            <label><strong>Name: </strong></label>
            {{ currentSemester.semester_name }}
          </div>
          <div>
            <label><strong>Start Date: </strong></label>
            {{ currentSemester.start_date }}
          </div>
          <div>
            <label><strong>End Date: </strong></label> {{ currentSemester.end_date }}
          </div>
            
          <v-btn @click="editSemester">Edit and Delete</v-btn>

        </div>
        <div v-else>
          <br />
          <p>Please click on a Semester...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SemesterDataService from "../services/SemesterDataService";
import jsPDF from 'jspdf';
import domtoimage from "dom-to-image";


export default {
  name: "semesters-list",
  data() {
    return {
      semesters: [],
      currentSemester: null,
      currentIndex: -1,
      searchSemesterName: "",

      page: 1,
      count: 0,
      pageSize: 5,

      pageSizes: [5, 10, 15],
    };
  },
  methods: {
  download() {
    domtoimage
    .toPng(this.$refs.content)
    .then(function(dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      const doc = new jsPDF({
        orientation: "portrait",
        format: [300, 1400]
      });
      doc.addImage(img, "JPEG", 20, 20);
      const date = new Date();
      const filename =
        "Courseplan_" +
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ".pdf";
      doc.save(filename);
    })
    .catch(function(error) {
      console.error("oops, something went wrong!", error);
    });
  },
    

    getRequestParams(searchSemesterName, page, pageSize) {
      let params = {};

      if (searchSemesterName) {
        params["semester_name"] = searchSemesterName;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    retrieveSemesters() {
      const params = this.getRequestParams(
        this.searchSemesterName,
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
      this.currentIndex = course.id;
      //this.$router.push({ params: { id: id } });
    },

    editSemester() {
      this.$router.push({
        name: "semester-details",
        params: { id: this.currentIndex },
      });
    },
  },
  mounted() {
    this.retrieveSemesters();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 1400px;
  margin: fixed;
}
</style>