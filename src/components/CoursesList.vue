<template>
  <div ref="content">
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search by Department"
            v-model="searchDept"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="
                page = 1;
                retrieveCourses();
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
        <h4>Courses List</h4>
        <ul class="list-group" id="courses-list">
          <li
            class="list-group-item"
            :class="{ active: course.id == currentIndex }"
            v-for="course in courses"
            :key="course.id"
            @click="setActiveCourse(course)"
          >
            {{ course.name }}
          </li>
        </ul>
      </div>

      <div class="col-md-4">
        <div v-if="currentCourse">
          <h4>Course</h4>
          <div>
            <label><strong>ID: </strong></label> {{ currentCourse.id }}
          </div>
          <div>
            <label><strong>Department: </strong></label>
            {{ currentCourse.dept }}
          </div>
          <div>
            <label><strong>Course Number: </strong></label>
            {{ currentCourse.course_number }}
          </div>
          <div>
            <label><strong>Level: </strong></label> {{ currentCourse.level }}
          </div>
          <div>
            <label><strong>Hours: </strong></label> {{ currentCourse.hours }}
          </div>
          <div>
            <label><strong>Name: </strong></label> {{ currentCourse.name }}
          </div>
          <div>
            <label><strong>Description:</strong></label>
            {{ currentCourse.description }}
          </div>
          <v-btn @click="editCourse">Edit and Delete</v-btn>

        </div>
        <div v-else>
          <br />
          <p>Please click on a Course...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseDataService from "../services/CourseDataService";
import jsPDF from 'jspdf';
import domtoimage from "dom-to-image";


export default {
  name: "courses-list",
  data() {
    return {
      courses: [],
      currentCourse: null,
      currentIndex: -1,
      searchDept: "",

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
    

    getRequestParams(searchDept, page, pageSize) {
      let params = {};

      if (searchDept) {
        params["dept"] = searchDept;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    retrieveCourses() {
      const params = this.getRequestParams(
        this.searchDept,
        this.page,
        this.pageSize
      );

      CourseDataService.getAll(params)
        .then((response) => {
          const { courses, totalItems } = response.data;
          this.courses = courses;
          this.count = totalItems;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveCourses();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveCourses();
    },

    refreshList() {
      this.retrieveCourses();
      this.currentCourse = null;
      this.currentIndex = -1;
    },

    setActiveCourse(course) {
      this.currentCourse = course;
      this.currentIndex = course.id;
      //this.$router.push({ params: { id: id } });
    },

    editCourse() {
      this.$router.push({
        name: "course-details",
        params: { id: this.currentIndex },
      });
    },
  },
  mounted() {
    this.retrieveCourses();
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