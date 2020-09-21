<template>
  <div>
    <H1>Add Course</H1>
    <h4>{{ course.dept }} {{ course.course_number }} {{ course.level }} {{ course.hours }} {{ course.name }} {{ course.description }}</h4>

    <form @submit.prevent="addcourse">
      Id:
      <input v-model="course.idNumber" type="text" id="id">
      <span id="idNumberErr" class="error">{{ errors.idNumber || '*' }}</span>
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
import axios from 'axios'
export default {
  data() {
    return {
      course: {},
      errors: {}
    }
  },

  methods: {
    addcourse() {
      axios
        .post('http://localhost/courseapi/courses/', this.course)
        .then(() => {
          this.$router.push({ name: 'list' })
        })
        .catch(error => {
          if (error.response.status == '406') {
            this.errors = {}
            for (let obj of error.response.data) {
              this.$set(this.errors, obj.attributeName, obj.message)
            }
          }
        })
    },
    cancel() {
      this.$router.push({ name: 'list' })
    }
}
}
</script>

<style scoped>
.error {
  color: #ff0000;
}
</style>
