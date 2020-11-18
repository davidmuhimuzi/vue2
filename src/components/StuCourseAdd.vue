 <template>
  <div class="submit-form mt-3 mx-auto">
    <H1>Add a Course Plan for Student</H1>

    <form @submit.prevent="savestucourses">
    
      <!--no data available-->
      <v-select :items="students" 
              label="Students"
              item-text ="first_name"
              item-value= "student_id" 
              v-model="courses_for_student.student_id" />
      <!--object object-->
      <v-select :items="semesters"
              label="Semesters"
              item-text ="semester_name"
              item-value= "semester_id" 
              v-model="courses_for_student.semester_id" />
       
      <v-select :items="courses"
              label="Courses"
              item-text ="name"
              item-value= "id" 
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
import SemesterDataService from "../services/SemesterDataService";
import StudentDataService from "../services/StudentDataService";
import CourseDataService from "../services/CourseDataService";
export default {
  //props: ['id'],
  data() {
    return {
      courses_for_student: {}, //keep
      students: [],
      courses: [],
      semesters: [],

    };
  },
  created() {

    StudentDataService.getAll()
      .then(response => {
        this.students = response.data.students;
        console.log(this.students);
      })
      .catch((e) => {
        console.log(e);
      });
    //mine
    SemesterDataService.getAll()
      .then((response) => {
        this.semesters = response.data.semesters;
        console.log(this.semesters);
      })
      .catch((e) => {
        console.log(e);
      });

    CourseDataService.getAll()
      .then(response => {
        this.courses = response.data.courses;
        console.log(this.courses);
      })
      .catch((e) => {
        console.log(e);
      });
  },
 
  methods: {
    //this hasnt been worked on since i havent even gotten the data to come up
    savestucourses() {
      //this.courses_for_student.student_id = this.student_id;
      console.log(this.courses_for_student);
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