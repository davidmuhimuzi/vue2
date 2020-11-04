<template>
<div class="list row">
     <div class="col-md-12">
      <div class="mb-3">
        Student per Page:
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
      
      <h4>Students List 
        <v-btn
          to="/studentadd"
          class="add-button"
          text-lg-right
        >
        <span class="mr-2">
        <v-icon>mdi-plus</v-icon>
        </span>
        </v-btn>
      </h4>
      <ul class="list-group" id="students-list">
        <li class="list-group-item"
          :class="{ active: student.student_id == currentIndex }"
          v-for="student in students"
          :key="student.student_id"
          @click="setActiveStudent(student)"
        >
          {{ student.first_name }}
        </li>
      </ul>

      
    </div>

    <div class="col-md-4">
      <div v-if="currentStudent">
        <h4>Student</h4>
        <div>
          <label><strong>ID: </strong></label> {{ currentStudent.student_id }}
        </div>
        <div>
          <label><strong>First Name: </strong></label> {{ currentStudent.first_name }}
        </div>
                <div>
          <label><strong>Last Name: </strong></label> {{ currentStudent.last_name }}
        </div>
        <div>
          <label><strong>Major: </strong></label> {{ currentStudent.major }}
        </div>
        <div>
          <label><strong>Advisor ID: </strong></label> {{ currentStudent.advisor_id }}
        </div>
        <div>
          <label><strong>Graduation Date: </strong></label> {{ currentStudent.graduation_date }}
        </div>
        <div>
          <label><strong>Email: </strong></label> {{ currentStudent.email }}
        </div>
        
        <v-btn @click="editStudent">Edit and Delete</v-btn>
   
      </div>
      <div v-else>
        <br />
        <p>Please click on a Student.</p>
      </div>
    </div>
  </div>
</template>

<script>
import StudentDataService from "../services/StudentDataService";

export default {
  name: "students-list",
  data() {
    return {
      students: [],
      currentStudent: null,
      currentIndex: -1,

      page: 1,
      count: 0,
      pageSize: 3,

      pageSizes: [5,10,15],
    };
  },
  methods: {
    getRequestParams(page, pageSize) {
      let params = {};

      if (page) {
        params["page"] = page -1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    retrieveStudents() {
      const params = this.getRequestParams(
        this.page,
        this.pageSize
      );

        StudentDataService.getAll(params)
        .then((response) => {
          const { students, totalItems } = response.data;
          this.students = students;
          this.count = totalItems;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveStudents();
    },

     handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveStudents();
    },

    refreshList() {
      this.retrieveStudents();
      this.currentStudent = null;
      this.currentIndex = -1;
    },

    setActiveStudent(student) {
      this.currentStudent = student;
      this.currentIndex = student.student_id;
    },

    editStudent() {
      this.$router.push({ 
        name: 'studentedit', 
        params: { student_id: this.currentIndex }, 
        })
    }
  },
  mounted() {
    this.retrieveStudents();
  }
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