<template>
  <div>
    <H1>Delete Course</H1>
    <input v-model="course.id" type="text" id="id">
    <h4> {{ course.id }} </h4>
    <button v-on:click="deleteCourse()">Delete</button>
    <button v-on:click="cancel()">Cancel</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['id'],

  data() {
    return {
      course: [],
      errors: {}
    }
  },
  /*,
  created() {
    axios
      .get('http://localhost:8080/courseapi/courses/' + this.id, { crossOrigin: true })
      .then(response => {
        this.course = response.data[0]
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  }, */

  methods: {

    deleteCourse() {
      axios
        .delete('http://localhost:8080/courseapi/courses/' + this.id)
        .then((response) => {
          
          this.errors = response.data
          console.log("RESPONSE FROM POST", response.data);
          this.$router.push({ name: 'list' })
        })
        .catch(error => {
          console.log("Error While Posting Data", error);
          this.errors = error.data
        })
    },
    cancel() {
      this.$router.push({ name: 'list' })
    }
  }
}
</script>

<style>
h1{
    color: firebrick;
}

</style>
