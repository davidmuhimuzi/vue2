<template>
  <div>
    <H1>Add Course</H1>
  
    <form @submit.prevent="saveCourse">
      Id:
      <input v-model="course.id" type="text" id="id">
      <span id="idErr" class="error">{{ errors.id || '*' }}</span>
      <br>
      <br>Department:
      <input v-model="course.dept" type="text" id="dept">
      <span id="deptErr" class="error">{{ errors.dept || '*' }}</span>
      <br>
      <br>Course Number:
      <input v-model="course.course_number" type="text" id="course_number">
      
      <span id="coursenumberErr" class="error">{{ errors.course_number || '*' }}</span>
      <br>
      <br>Level:
      <input v-model="course.level" type="text" id="level">
      <span id="levelErr" class="error">{{ errors.level || '*' }}</span>
      <br>
      <br>Hours:
      <input v-model="course.hours" type="text" id="hours">
      <span id="hoursErr" class="error">{{ errors.hours || '*' }}</span>
      <br>
      <br>Name:
      <input v-model="course.name" type="text" id="name">
      <span id="nameErr" class="error">{{ errors.name || '*' }}</span>
      <br>
      <br>Description:
      <input v-model="course.description" type="text" id="description">
      <span id="descriptionErr" class="error">{{ errors.desc || '*' }}</span>
      <br>
      <input type="submit" name="submit" value="Save">
      <button name="cancel" v-on:click.prevent="cancel()">Cancel</button>
    </form>
  </div>
</template>

<script>
import CourseDataService from "../services/CourseDataService";

export default {
  name: "add-course",
  data() {
    return {
      course: {},
      submitted: false
    };
  },
  methods: {
    saveCourse() {
      TutorialDataService.create(this.course)
        .then(response => {
          this.$router.push({ name: 'list' });
        })
        .catch(e => {
          console.log(e);
        });
    },
    cancel()  {
        this.$router.push({ name: 'list' });
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>