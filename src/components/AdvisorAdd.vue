<template>
  <div class="submit-form mt-3 mx-auto">
    <H1>Add an OC Advisor</H1>

    <form @submit.prevent="saveAdvisor">

      <v-text-field
        v-model="advisor.first_name"
        label="First Name"
        required
      ></v-text-field>


      <v-text-field
        v-model="advisor.last_name"
        label="Last Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="advisor.dept"
        label="Department"
        required
      ></v-text-field>


      <v-text-field
        v-model="advisor.email"
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
      advisor: {} //keep

    };
  },
  methods: {
    saveAdvisor() {
     
      AdvisorDataService.create(this.advisor)
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