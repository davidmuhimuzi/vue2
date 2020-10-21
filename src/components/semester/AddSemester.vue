<template>
  <div class="submit-form mt-3 mx-auto">
    <H1>Add an OC Semester</H1>

    <form @submit.prevent="saveSemester">

      <v-text-field
        v-model="semester.semester_name"
        label="Semester Name"
        required
      ></v-text-field>


      <div id="dater">
        <date-picker v-model="start_date" lang="en" type="date" format="YYYY-MM-dd"></date-picker>
      </div>

       <v-text-field
        v-model="semester.end_date"
        label="End Date"
        required
      ></v-text-field>
    </form>
  <v-divider class="my-5"></v-divider>
      <v-btn color="primary" class="mt-3" @click="saveSemester">Submit</v-btn>

      <v-btn color="primary" class="mt-3" @click="cancel">Cancel</v-btn>

  </div>
</template>

<script>
import SemesterDataService from "../services/SemesterDataService";
import Datepicker from 'vue2-datepicker'

export default {
  name: 'Dater',
  components: {
    Datepicker
  },
  data() {
    return {
       date: '',
      semester: {}
     
  
    };
  },
  methods: {
    saveSemester() {
      console.log(this.semester)
      SemesterDataService.create(this.semester)
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