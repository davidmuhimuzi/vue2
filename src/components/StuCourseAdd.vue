 <template>
  <div class="submit-form mt-3 mx-auto">
    <H1>Add a Course Plan for Student</H1>

    <form @submit.prevent="savestucourses">
    
      <!--no data available-->
     <v-select :items="students" 
              label="Students"
              item-text ="example"
              item-value= "students.student_id" 
              v-model="courses_for_student.student_id" />
   <!--object object-->
    <v-select :items="semesters"
              label="Semesters"
              item-text ="semester_id"
              item-value= "semesters.semester_id" 
              v-model="semesters.semester_id" />
       
       <v-select :items="courses"
              label="Courses"
              item-text ="ex"
              item-value= "courses.id" 
              v-model="courses_for_student.course_id" />
             

      <v-text-field
        v-model="courses_for_student.status"
        label="Status"
        required
      ></v-text-field>

      <v-text-field
        v-model="courses_for_student.grade"
        label="Grade"
        required
      ></v-text-field>
    </form>

    <v-divider class="my-5"></v-divider>
    <v-btn color="primary" class="mt-3" @click="savestucourses">Add</v-btn>
    <v-btn color="primary" class="mt-3" @click="cancel">Cancel</v-btn>
  </div>
</template> 

<script>

import StuCourseDataService from "../services/StuCourseDataService";
//import SemesterDataService from "../services/SemesterDataService";
//import StudentDataService from "../services/StudentDataService";
import CourseDataService from "../services/CourseDataService";
export default {
  //props: ['id'],
  data() {
    return {
      courses_for_student: {}, //keep
      students: [],
      courses: [],
      semesters: [],

      //grades to choose from
    };
  },
  created() {

     /*StudentDataService.getAll()
      .then(response => {
        this.students.forEach(function (students) {
                  students.ex = students[0].student_id;
                })
        //this.students.student_id = response.data;
        //this.courses_for_student.student_id = response.data;
        console.log(response.data); //this works
      })
      .catch((e) => {
        console.log(e);
      });
    //mine
   SemesterDataService.getAll()
 
      .then((response) => {
           this.courses_for_student.semesters = response.data;
        console.log(this.semesters);
      })
      .catch((e) => {
        console.log(e);
      });
  */

    CourseDataService.getAll()
      .then(response => {
        this.courses = response.data;
        this.courses.forEach(function (course) {
                course.ex = course.number+" "+course.name;
                })
        //put array to display here
        //console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    

  
  },
 
  methods: {
    //this hasnt been worked on since i havent even gotten the data to come up
    savestucourses() {
      //this.courses_for_student.student_id = this.student_id;

      StuCourseDataService.create(this.courses_for_student)
        .then(() => {
          this.$router.push({ name: "courseplan" });
          console.log(this.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cancel() {
      this.$router.push({ name: "courseplan" });
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