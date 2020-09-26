<template>
  <div>
    <H1>Add Course</H1>
  
    <form @submit.prevent="saveCourse">
      Id:
      <input v-model="course.id" type="text" id="id">

      <br>
      <br>Department:
      <input v-model="course.dept" type="text" id="dept">

      <br>
      <br>Course Number:
      <input v-model="course.course_number" type="text" id="course_number">
      
      <br>
      <br>Level:
      <input v-model="course.level" type="text" id="level">

      <br>
      <br>Hours:
      <input v-model="course.hours" type="text" id="hours">
    
      <br>
      <br>Name:
      <input v-model="course.name" type="text" id="name">
      
      <br>
      <br>Description:
      <input v-model="course.description" type="text" id="description">

      <br>
      <input type="submit" name="submit" value="Save">
      <button name="cancel" v-on:click.prevent="cancel()">Cancel</button>
    </form>
  </div>
</template>

<script>
import CourseDataService from "../services/CourseDataService";

export default {
  data() {
    return {
      course: {},
      submitted: false
    };
  },
  methods: {
    saveCourse() {
      CourseDataService.create(this.course)
        .then(() => {
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