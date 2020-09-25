<template>
  <div v-if="currentCourse" class="edit-form">
    <h4>Course</h4>
    <form>
      <div class="form-group">
        <label for="id">ID</label>
        <input type="text" class="form-control" id="id"
          v-model="currentCourse.id"
        />
      </div>
      <div class="form-group">
        <label for="dept">Department</label>
        <input type="text" class="form-control" id="id"
          v-model="currentCourse.dept"
        />
      </div>
      <div class="form-group">
        <label for="course_number">Course Number</label>
        <input type="text" class="form-control" id="course_number"
          v-model="currentCourse.course_number"
        />
      </div>
      <div class="form-group">
        <label for="level">Level</label>
        <input type="text" class="form-control" id="level"
          v-model="currentCourse.level"
        />
      </div>
      <div class="form-group">
        <label for="hours">Hours</label>
        <input type="text" class="form-control" id="hours"
          v-model="currentCourse.hours"
        />
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
          v-model="currentCourse.name"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentCourse.description"
        />
      </div>


    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteTutorial"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateTutorial"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import CourseDataService from "../services/CourseDataService";

export default {
  data() {
    return {
      currentCourse: null,
      message: ''
    };
  },
  methods: {
    getTutorial(id) {
      CourseDataService.get(id)
        .then(response => {
          this.currentCourse = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateTutorial() {
      CourseDataService.update(this.currentCourse.id, this.currentCourse)
        .then(response => {
          console.log(response.data);
          this.message = 'The course was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteTutorial() {
      CourseDataService.delete(this.currentCourse.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "courses" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>