<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by department" v-model="dept"/>
        <div class="input-group-append">
          <v-btn color="secondary" class="mt-3" @click="searchDept">Submit</v-btn>
          
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <h4>Courses List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: course.id == currentIndex }"
          v-for="course in courses"
          :key="course.id"
          @click="setActiveCourse(course)"
        >
          {{ course.name }}
        </li>
      </ul>

      
    </div>

    <div class="col-md-6">
      <div v-if="currentCourse">
        <h4>Course</h4>
        <div>
          <label><strong>ID: </strong></label> {{ currentCourse.id }}
        </div>
        <div>
          <label><strong>Department: </strong></label> {{ currentCourse.dept }}
        </div>
        <div>
          <label><strong>Course Number: </strong></label> {{ currentCourse.course_number }}
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
          <label><strong>Description:</strong></label> {{ currentCourse.description }}
        </div>
       
       
        <a class="badge badge-warning" :href="'/courses/' + currentCourse.id"> Edit or Delete</a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Course...</p>
      </div>
    </div>
  </div>
</template>

<script>
import CourseDataService from "../services/CourseDataService";

export default {
  name: "courses-list",
  data() {
    return {
      courses: [],
      currentCourse: null,
      currentIndex: -1,
      dept: ''
    };
  },
  methods: {
    retrieveCourses() {
      CourseDataService.getAll()
        .then(response => {
          this.courses = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCourses();
      this.currentCourse = null;
      this.currentIndex = -1;
    },

    setActiveCourse(course) {
      this.currentCourse = course;
      this.currentIndex = course.id;
    },

  
    
    searchDept() {
      CourseDataService.getByDept(this.dept)
        .then(response => {
          this.courses = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveCourses();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>