<template>
<div ref="content">
<div class="list row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <v-btn @click="download()">Download PDF </v-btn>
      <br>
      <v-select :items="students" 
            label="Students"
            item-text ="first_name"
            item-value= "student" 
            v-model="currentStudent" 
            return-object
            @change="getCoursesForStudent(currentStudent.student_id)"/>
      <h2>Course Plan for {{ currentStudent.first_name }}
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
      <v-data-table
        :headers="headers"
        :items="stuCourses"
        item-key="id"
        sort-by="semester.startDate"
        group-by="semester.semester_name"
        class="elevation-1"
        show-group-by
        hide-default-footer
      ></v-data-table>
      
    </div>
  </div>
  </div>
</template>

<script>
import StudentDataService from "../services/StudentDataService";
import StuCourseDataService from "../services/StuCourseDataService";
//import MajorDataService from "../services/MajorDataService";
//import SemesterDataService from "../services/SemesterDataService";
import jsPDF from 'jspdf';
import domtoimage from "dom-to-image";
import autoTable from 'jspdf-autotable';

export default {
  name: "students-list",
  data() {
    return {
      students: [],
      currentStudent: {},
      stuCourses: [],
      headers: [
                {
                    text: 'Course Number',
                    align: 'left',
                    value: 'course.course_number',
                    groupable: false,
                },
                {
                    text: 'Course Name',
                    align: 'left',
                    value: 'course.name',
                    groupable: false,
                },
                {
                    text: 'Grade',
                    align: 'left',
                    value: 'grade',
                    groupable: false,
                },
                {
                    text: 'Status',
                    align: 'left',
                    value: 'status',
                    groupable: false,
                },
                
            ],
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
        doc.autoTable({
        theme: 'striped'
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
    retrieveStudents() {
        StudentDataService.getAll()
        .then((response) => {
          this.students = response.data.students;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCoursesForStudent(id)  {
      StuCourseDataService.getAllPerStudent(id)
        .then(response => {
            this.stuCourses = response.data;
            console.log(this.stucourses);

            this.stuCourses.sort(function(a, b) {
                  if (a.semester.startDate<b.semester.startDate) {
                    return -1;
                  }
                  else if (a.semester.startDate<b.semester.startDate) {
                    return 1;
                  }
                  else{
                    return 0
                  }
              }
            );
        })
        .catch(error => {
            this.message = error.response.data.message;
        });
    },
    setActiveStudent(student) {
      this.currentStudent = student;
      this.currentIndex = student.student_id;
    },
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
  margin-left:100%; 
  margin-right:0;
}
</style-->
