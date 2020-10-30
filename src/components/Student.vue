<template>

  <div v-if="currentStudent" class="edit-form py-3">

      <v-form ref="form" lazy-validation>

      <v-text-field
        v-model="currentStudent.student_id"
        :rules="[(v) => !!v || 'ID is required']"
        label="Student ID"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentStudent.first_name"
        :rules="[(v) => !!v || 'First Name is required']"
        label="Student First Name"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentStudent.last_name"
        :rules="[(v) => !!v || 'Last Name is required']"
        label="Student Last Name"
        required
      ></v-text-field>

              <v-text-field
        v-model="currentStudent.major"
        :rules="[(v) => !!v || 'Major is required']"
        label="Student Major"
        required
      ></v-text-field>

              <v-text-field
        v-model="currentStudent.advisor_id"
        :rules="[(v) => !!v || 'Advisor is required']"
        label="Student Advisor"
        required
      ></v-text-field>

              <v-text-field
        v-model="currentStudent.graduation_date"
        :rules="[(v) => !!v || 'Graduation Date is required']"
        label="Student Graduation Date"
        required
      ></v-text-field>

              <v-text-field
        v-model="currentStudent.email"
        :rules="[(v) => !!v || 'Email is required']"
        label="Student Email"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>
      <v-btn color="error" small class="mr-2" @click="deleteStudent">
        Delete
      </v-btn>
    <v-btn color="success" small @click="updateStudent">
        Update
      </v-btn>


     </v-form>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Student...</p>
    
  </div>

</template>

<script>
import StudentDataService from "../services/StudentDataService";

export default {
  data() {
    return {
      currentStudent: null,
      message: ''
    };
  },
  methods: {
    getStudent(id) {
      StudentDataService.get(id)
        .then(response => {
          this.currentStudent = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateStudent() {
      StudentDataService.update(this.currentStudent.student_id, this.currentStudent)
        .then(response => {
          console.log(response.data);
          this.message = 'The course was updated successfully!';
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteStudent() {
      StudentDataService.delete(this.currentStudent.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "studentlist" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getStudent(this.$route.params.id);
    
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