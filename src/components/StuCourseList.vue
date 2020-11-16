<template>
<div class="list row">
    <div class="col-md-6">
        <v-btn @click="download()">Download PDF </v-btn>
        <br>
      <h2>Course Plan for OC Students
        <v-btn
          to="/stucoursesadd"
          class="add-button"
          text-lg-right 
        >
        <span class="mr-2">
        <v-icon>mdi-plus</v-icon>
        </span>
        </v-btn>
        </h2>
      <!-- >
      <h4> {{students.first_name}} {{students.last_name}} {{status}} {{grade}}</h4>
      <ul class="list-group" id="students-list">
        <li class="list-group-item"
          :class="{ active: student.student_id == currentIndex }"
          v-for="student in students"
          :key="student.student_id"
          @click="setActiveStudent(student)"
        >
          {{ student.first_name }} {{ student.last_name }} 
        </li>
      </ul> -->
      
    </div>

<!--<div class="col-md-4">
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
        <p>Please click on a Semester to Add a Course to.</p>
      </div>
    </div-->
  </div>
</template>

<script>
import StudentDataService from "../services/StudentDataService";
//import StuCourseDataService from "../services/StuCourseDataService";
//import MajorDataService from "../services/MajorDataService";
//import SemesterDataService from "../services/SemesterDataService";
import jsPDF from 'jspdf';
import domtoimage from "dom-to-image";

export default {
  name: "students-list",
  data() {
    return {
      students: [],
      currentStudent: null,
      currentIndex: -1,

  
    };
  },
  methods: {
      download() {
    domtoimage
    .toPng(this.$refs.content)
    .then(function(dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      const doc = new jsPDF({
        orientation: "portrait",
        format: [300, 1400]
      });
      doc.addImage(img, "JPEG", 20, 20);
      const date = new Date();
      const filename =
        "Courseplan_" +
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ".pdf";
      doc.save(filename);
    })
    .catch(function(error) {
      console.error("oops, something went wrong!", error);
    });
  },
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
</style-->
