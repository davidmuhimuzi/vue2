<template>

  <div v-if="currentMajor" class="edit-form py-3">

      <v-form ref="form" lazy-validation>

      <v-text-field
        v-model="currentMajor.major_name"
        :rules="[(v) => !!v || 'Name is required']"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentMajor.dept"
        :rules="[(v) => !!v || 'Department is required']"
        label="Department"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentMajor.hours"
        :rules="[(v) => !!v || 'Hours is required']"
        label="Hours"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>
      <v-btn color="error" small class="mr-2" @click="deleteMajor">
        Delete
      </v-btn>
    <v-btn color="success" small @click="updateMajor">
        Update
      </v-btn>


     </v-form>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Major...</p>
    
  </div>

</template>

<script>
import MajorDataService from "../services/MajorDataService";

export default {
  data() {
    return {
      currentMajor: null,
      message: ''
    };
  },
  methods: {
    getMajor(id) {
      MajorDataService.get(id)
        .then(response => {
          this.currentMajor = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateMajor() {
      MajorDataService.update(this.currentMajor.major_id, this.currentMajor)
        .then(response => {
          console.log(response.data);
          this.message = 'The course was updated successfully!';
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteMajor() {
      MajorDataService.delete(this.currentMajor.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "majorlist" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getMajor(this.$route.params.id);
    
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