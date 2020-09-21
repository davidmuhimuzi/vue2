<template>
  <div>
    
    <H1>Course List</H1>
    <CourseDisplay v-for="course in courses" :key="course.id" :course="course"/>
    <h2>{{ course.id }} {{ course.dept }} {{ course.course_number }} {{ course.level }} {{ course.hours }} {{ course.name }} {{ course.description }}</h2>
  </div>
</template>

<script>
//delete ??
import CourseDisplay from '@/components/CourseDisplay.vue'
import axios from 'axios'
export default {
  components: {
    CourseDisplay
  },
  data() {
    return {
      course: {}
      
    }
  },
  created() {
    axios
      .get('http://localhost:8080/courseapi/dept/', { crossOrigin: true })
      .then(response => {
        this.courses = response.data
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  }
}
</script>

<style></style>
