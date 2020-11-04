<template>

  <div v-if="currentSemester" class="edit-form py-3">

      <v-form ref="form" lazy-validation>

      <v-text-field
        v-model="currentSemester.semester_name"
        :rules="[(v) => !!v || 'Semester name is required']"
        label="Name"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentSemester.start_date"
        :rules="[(v) => !!v || 'Start date is required']"
        label="Start Date"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentSemester.end_date"
        :rules="[(v) => !!v || 'End date is required']"
        label="End date"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>
      <v-btn color="error" small class="mr-2" @click="deleteSemester">
        Delete
      </v-btn>
    <v-btn color="success" small @click="updateSemester">
        Update
      </v-btn>


     </v-form>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Semester...</p>
    
  </div>

</template>

<script>
import SemesterDataService from "../services/SemesterDataService";

export default {
  data() {
    return {
      currentSemester: null,
      message: ''
    };
  },
  methods: {
    getSemester(id) {
      SemesterDataService.get(id)
        .then(response => {
          this.currentSemester = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateSemester() {
      SemesterDataService.update(this.currentSemester.id, this.currentSemester)
        .then(response => {
          console.log(response.data);
          this.message = 'The semester was updated successfully!';
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteSemester() {
      SemesterDataService.delete(this.currentSemester.id)
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
    console.log(this.$route.params.id);
    this.getSemester(this.$route.params.id);
    
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