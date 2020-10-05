<template>

  <div v-if="currentCourse" class="edit-form py-3">

      <v-form ref="form" lazy-validation>

      <!--v-text-field
        v-model="currentCourse.id"
        :rules="[(v) => !!v || 'ID is required']"
        label="ID"
        required
      ></v-text-field-->

      <v-text-field
        v-model="currentCourse.dept"
        :rules="[(v) => !!v || 'Department is required']"
        label="Department"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentCourse.course_number"
        :rules="[(v) => !!v || 'Course # is required']"
        label="Course Number"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentCourse.level"
        :rules="[(v) => !!v || 'level is required']"
        label="Level"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentCourse.hours"
        :rules="[(v) => !!v || 'Hours is required']"
        label="Hours"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentCourse.name"
        :rules="[(v) => !!v || 'Name is required']"
        label="Name"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentCourse.description"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field> 

      <v-divider class="my-5"></v-divider>
      <v-btn color="error" small class="mr-2" @click="deleteCourse">
        Delete
      </v-btn>
    <v-btn color="success" small @click="updateCourse">
        Update
      </v-btn>


     </v-form>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Course...</p>
    
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
    getCourse(id) {
      CourseDataService.get(id)
        .then(response => {
          this.currentCourse = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCourse() {
      CourseDataService.update(this.currentCourse.id, this.currentCourse)
        .then(response => {
          console.log(response.data);
          this.message = 'The course was updated successfully!';
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCourse() {
      CourseDataService.delete(this.currentCourse.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "list" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getCourse(this.$route.params.id);
  }
};
</script>

<style>
h4 {
  font-size: 25px;
  text-align: center;
}
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>