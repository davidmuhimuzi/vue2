<template>
  <div class="submit-form mt-3 mx-auto">
    <H1>Add an OC Major</H1>

    <form @submit.prevent="saveMajor">

      <v-text-field 
      v-model="major.major_name" 
      label="Name" 
      required></v-text-field>

      <v-text-field
        v-model="major.dept"
        label="Department"
        required
      ></v-text-field>

      <v-text-field
        v-model="major.hours"
        label="Hours"
        required
      ></v-text-field>

      </form>
  <v-divider class="my-5"></v-divider>
      <v-btn color="primary" class="mt-3" @click="saveMajor">Submit</v-btn>

      <v-btn color="primary" class="mt-3" @click="cancel">Cancel</v-btn>

  </div>
</template>

<script>
import MajorDataService from "../services/MajorDataService";

export default {
  data() {
    return {
      major: {}
  
    };
  },
  methods: {
    saveMajor() {
      MajorDataService.create(this.major)
        .then(() => {
          this.$router.push({ name: "majorlist" });
          console.log(this.data)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cancel() {
      this.$router.push({ name: "majorlist" });
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