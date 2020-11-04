<template>
  <div class="submit-form mt-3 mx-auto">
    <H1>Add an OC Semester</H1>

    <form @submit.prevent="saveSemester">

      <v-text-field 
      v-model="semester.semester_name" 
      label="Name" 
      required></v-text-field>

      <v-text-field 
      v-model="semester.start_date" 
      label="Start Date (YYYY-MM-DD)" 
      required></v-text-field>

    
      <v-text-field 
      v-model="semester.end_date" 
      label="End Date (YYYY-MM-DD)" 
      required>
      </v-text-field>
    

    

      

      </form>
  <v-divider class="my-5"></v-divider>
      <v-btn color="primary" class="mt-3" @click="saveSemester">Submit</v-btn>

      <v-btn color="primary" class="mt-3" @click="cancel">Cancel</v-btn>

  </div>
</template>

<script>
import SemesterDataService from "../services/SemesterDataService";
export default {
  data() {
    return {
      semester: {},
    };
  },

  methods: {

    saveSemester() {
      SemesterDataService.create(this.semester)
        .then(() => {
          this.$router.push({ name: "semesterlist" });
          console.log(this.data)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cancel() {
      this.$router.push({ name: "semesterlist" });
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