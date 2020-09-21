<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      
    <h3>Select your course department</h3>
    <li v-for= "course in courses" :key="course.id">{{course.name}}</li>
    
  </div>
</template>

<script>
import CourseDataService from "../services/CourseDataService";

export default {
  name: 'HelloStudent',
  data: function() {
    return {    
        courses: CourseDataService.getAll()
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 60px 0 0;
  font-size: 30px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
