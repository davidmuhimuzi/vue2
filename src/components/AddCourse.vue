<template>
  <div class="submit-form mt-3 mx-auto">
    <H1>Add an OC Course</H1>

    <form @submit.prevent="saveCourse">

      <v-text-field
        v-model="course.dept"
        label="Department"
        required
      ></v-text-field>


      <v-text-field
        v-model="course.course_number"
        label="Course #"
        required
      ></v-text-field>

      <v-text-field
        v-model="course.level"
        label="Level"
        required
      ></v-text-field>


      <v-text-field
        v-model="course.hours"
        label="Hours"
        required
      ></v-text-field>


      <v-text-field 
      v-model="course.name" 
      label="Name" 
      required></v-text-field>

      <v-text-field
        v-model="course.description"
        label="Description"
        required
      ></v-text-field>

       </form>
  <v-divider class="my-5"></v-divider>
      <v-btn color="primary" class="mt-3" @click="saveCourse">Submit</v-btn>

      <v-btn color="primary" class="mt-3" @click="cancel">Cancel</v-btn>

  </div>
</template>

<script>
import CourseDataService from "../services/CourseDataService";

export default {
  data() {
    return {
      course: {}
      //submitted: false,
    };
  },
  methods: {
    saveCourse() {
      console.log(this.course)
      CourseDataService.create(this.course)
        .then(() => {
          this.$router.push({ name: "list" });
          console.log(this.data)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cancel() {
      this.$router.push({ name: "list" });
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 400px;
  margin: auto;
  font-size: 20px;
}


h1 {
  text-align: center;
}


</style>