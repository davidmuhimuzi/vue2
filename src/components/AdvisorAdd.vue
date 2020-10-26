<template>
  <div class="submit-form mt-3 mx-auto">
    <H1>Add an OC Advisor</H1>

    <form @submit.prevent="saveAdvisor">

      <v-text-field
        v-model="advisors.first_name"
        label="First Name"
        required
      ></v-text-field>


      <v-text-field
        v-model="advisors.last_name"
        label="Last Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="advisors.dept"
        label="Department"
        required
      ></v-text-field>


      <v-text-field
        v-model="advisors.email"
        label="Email"
        required
      ></v-text-field>
       </form>

  <v-divider class="my-5"></v-divider>
      <v-btn color="primary" class="mt-3" @click="saveAdvisor">Add</v-btn>
      <v-btn color="primary" class="mt-3" @click="cancel">Cancel</v-btn>
  </div>
</template>

<script>
import AdvisorDataService from "../services/AdvisorDataService";

export default {
  data() {
    return {
      advisors: {} //keep

    };
  },
  methods: {
    saveAdvisor() {
      console.log(this.advisors)
      AdvisorDataService.create(this.advisors)
        .then(() => {
          this.$router.push({ name: "advisorlist" });
          console.log(this.data)
     
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cancel() {
      this.$router.push({ name: "advisorlist" });
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