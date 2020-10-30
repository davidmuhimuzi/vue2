<template>
  <div class="submit-form mt-3 mx-auto">
    <H1>Add an OC Student</H1>

    <form @submit.prevent="saveStudent">

      <v-text-field
        v-model="students.first_name"
        label="First Name"
        required
      ></v-text-field>


      <v-text-field
        v-model="students.last_name"
        label="Last Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="students.major"
        label="Major"
        required
      ></v-text-field>


      <v-text-field
        v-model="students.advisor_id"
        label="Student ID"
        required
      ></v-text-field>


      <v-text-field 
        v-model="students.graduation_date" 
        label="Name" 
        required></v-text-field>

      <v-text-field
        v-model="students.email"
        label="Email"
        required
      ></v-text-field>

       </form>
  <v-divider class="my-5"></v-divider>
      <v-btn color="primary" class="mt-3" @click="saveStudent">Submit</v-btn>

      <v-btn color="primary" class="mt-3" @click="cancel">Cancel</v-btn>

  </div>
</template>

<script>
import StudentDataService from "../services/StudentDataService";

export default {
  data() {
    return {
      students: {}
  
    };
  },
  methods: {
    saveStudent() {
      console.log(this.students)
      StudentDataService.create(this.students)
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