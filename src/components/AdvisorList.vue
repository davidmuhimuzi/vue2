<template>
  <div class="list row">
    <v-btn
          to="/advisoradd"
          class="add-button"
          text-lg-right
        >
        <span class="mr-2">
        <v-icon>mdi-plus</v-icon>
        </span>
        </v-btn>
 
     <div class="col-md-12">
      <div class="mb-3">
        Advisors per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>
        <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        pills
        @change="handlePageChange"
      ></b-pagination>
    </div>

      <div class="col-md-6">
       <h4>Advisor List </h4>
        <ul class="list-group" id="advisors-list">
          <li
            class="list-group-item"
            :class="{ active: advisors.id == currentIndex }"
            v-for="advisor in advisors"
            :key="advisor.advisor_id"
            @click="setActiveAdvisor(advisor)"
          >
            {{ advisors.first_name }}
          </li>
        </ul>
      </div>

      <div class="col-md-4">
        <div v-if="currentAdvisor">
          <h4>Advisor</h4>
          <div>
            <label><strong>First Name: </strong></label> {{ currentAdvisor.first_name }}
          </div>
          <div>
            <label><strong>Last Name: </strong></label>
            {{ currentAdvisor.last_name }}
          </div>
          <div>
            <label><strong>Department: </strong></label>
            {{ currentAdvisor.dept }}
          </div>
          <div>
            <label><strong>Email: </strong></label> {{ currentAdvisor.email }}
          </div>
  
          <v-btn @click="editAdvisor">Edit and Delete</v-btn>

        </div>
        <div v-else>
          <br />
          <p>Please click on an Advisor...</p>
        </div>
      </div>
    </div>
</template>

<script>
import AdvisorDataService from "../services/AdvisorDataService";



export default {
  name: "advisors-list",
  data() {
    return {
      advisors: [],
      currentAdvisor: null,
      currentIndex: -1,

      page: 1,
      count: 0,
      pageSize: 3,

      pageSizes: [5, 10, 15],
    };
  },
  methods: {

    getRequestParams(page, pageSize) {
      let params = {};

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    retrieveAdvisors() {
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );

      AdvisorDataService.getAll(params)
        .then((response) => {
          const { advisors, totalItems } = response.data;
          this.advisors = advisors;
          this.count = totalItems;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveAdvisors();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveAdvisors();
    },

    refreshList() {
      this.retrieveAdvisors();
      this.currentAdvisor = null;
      this.currentIndex = -1;
    },

    setActiveAdvisor(advisors) {
      this.currentAdvisor = advisors;
      this.currentIndex = advisors.advisor_id;
    },

    editAdvisor() {
      this.$router.push({
        name: "advisoredit",
        params: { id: this.currentIndex },
      });
    },
  },
  mounted() {
    this.retrieveAdvisors();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 1400px;
  margin: fixed;

}
.add-button {
  margin-left:71%; 
  margin-right:0;
}
</style>