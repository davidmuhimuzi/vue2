<template>
  <div v-if="currentAdvisor" class="edit-form py-3">

      <v-form ref="form" lazy-validation>

      <v-text-field
        v-model="currentAdvisor.first_name"
        :rules="[(v) => !!v || 'First name is required']"
        label="First Name"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentAdvisor.last_name"
        :rules="[(v) => !!v || 'Last Name is required']"
        label="Last Name"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentAdvisor.dept"
        :rules="[(v) => !!v || 'Department is required']"
        label="Dept"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentAdvisor.email"
        :rules="[(v) => !!v || 'Email is required']"
        label="Email"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>

      <v-btn color="error" small class="mr-2" @click="deleteAdvisor">
        Delete
      </v-btn>
    <v-btn color="success" small @click="updateAdvisor">
        Update
      </v-btn>


     </v-form>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on an Advisor...</p>
    
  </div>

</template>

<script>
import AdvisorDataService from "../services/AdvisorDataService";

export default {
  data() {
    return {
      currentAdvisor: null,
      message: ''
    };
  },
  methods: {
    getAdvisor(id) {
      AdvisorDataService.get(id)
        .then(response => {
          this.currentAdvisor = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateAdvisor() {
      AdvisorDataService.update(this.currentAdvisor.advisor_id, this.currentAdvisor)
        .then(response => {
          console.log(response.data);
          this.message = 'The advisor was updated successfully!';
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteAdvisor() {
      AdvisorDataService.delete(this.currentAdvisor.advisor_id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "advisorlist" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getAdvisor(this.$route.params.id);
    
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