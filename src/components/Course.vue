<template>

  <div v-if="currentCourse" class="edit-form py-3">

      <v-form ref="form" lazy-validation>

      <v-text-field
        v-model="currentCourse.dept"
        :rules="[(v) => !!v || 'Department is required']"
        label="Department"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentCourse.course_number"
        :rules="[(v) => !!v || 'Course # is required']"
        label="Course Number"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentCourse.level"
        :rules="[(v) => !!v || 'level is required']"
        label="Level"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentCourse.hours"
        :rules="[(v) => !!v || 'Hours is required']"
        label="Hours"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentCourse.name"
        :rules="[(v) => !!v || 'Name is required']"
        label="Name"
        required
      ></v-text-field>

        <v-text-field
        v-model="currentCourse.description"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field> 

        <v-text-field
        v-model="currentCourse.when_off"
        :rules="[(v) => !!v || 'Offered is required']"
        label="Offered"
        required
      ></v-text-field> 

      <v-divider class="my-5"></v-divider>

      <v-data-table
        :headers="headers"
        :items="courseMajors"
        hide-default-footer
        class="elevation - 1">
        <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="deleteMajorForCourse(item)"
            >
              mdi-trash-can-outline
            </v-icon>
        </template>
      </v-data-table>
      <v-row justify="center">
        <v-col col="2">  
              <v-btn color="success" @click="addMajorForCourse()"
                  >Add</v-btn
              >
        </v-col>
        <v-col justify="left" col="2"> 
            <v-select :items="majors"
              label="Major"
              item-text ="major_name"
              item-value= "major_id" 
              v-model="major.major_id" />
        </v-col>
      </v-row>
      <v-btn color="error" small class="mr-2" @click="deleteCourse">
        Delete
      </v-btn>
    <v-btn color="success" small @click="updateCourse">
        Update
      </v-btn>


     </v-form>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Course...</p>
    
  </div>

</template>

<script>
import CourseDataService from "../services/CourseDataService";
import MajorCourseService from '@/services/MajorCourseService.js';
import MajorDataService from '@/services/MajorDataService.js';


export default {
  data() {
    return {
      currentCourse: null,
      courseMajors: [],
      majors: [],
      major: {},
      message: '',
      headers: [
                {
                    text: 'major',
                    align: 'left',
                    value: 'major.major_name',
                },
                {
                    text: 'Action',
                    value: 'actions',
                    align: 'left',
                    sortable: false,
                }
            ],
    };
  },
  methods: {
    getCourse(id) {
      CourseDataService.get(id)
        .then(response => {
          this.currentCourse = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCourse() {
      CourseDataService.update(this.currentCourse.id, this.currentCourse)
        .then(response => {
          console.log(response.data);
          this.message = 'The course was updated successfully!';
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCourse() {
      CourseDataService.delete(this.currentCourse.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "list" });
        })
        .catch(e => {
          console.log(e);
        });
      MajorCourseService.deleteAllForCourse(this.course.id)
        .catch(error => {
              this.message = error.response.data.message;
        });
    },

    getMajorsForCourse(id)  {
      MajorCourseService.getAllForCourse(id)
        .then(response => {
            this.courseMajors = response.data;
            console.log(this.courseMajors);
        })
        .catch(error => {
            this.message = error.response.data.message;
        });
    },

    getMajors() {
      MajorDataService.getAll()
        .then(response => {
            this.majors = response.data.majors;
            console.log(response.data.majors);
        })
        .catch(error => {
            this.message = error.response.data.message;
        });
    },

    deleteMajorForCourse(coursemajor) {
      MajorCourseService.delete(coursemajor.pair_id)
        .then(() => {  
          this.courseMajors = this.courseMajors.filter(courseMajor => courseMajor.pair_id!=coursemajor.pair_id);
        })
        .catch(error => {
            this.message = error.response.data.message;
        });
    },
    addMajorForCourse() {
        let majorCourse = {};
        majorCourse.major_id = this.major.major_id;
        majorCourse.id = this.currentCourse.id;
        console.log(majorCourse)
        MajorCourseService.create(majorCourse)
            .then(() => {                
              MajorCourseService.create(this.currentCourse.id)
              .then(response => {
                  this.courseMajors = response.data;
                  console.log(this.courseMajors);
              })
        .catch(error => {
            this.message = error.response.data.message;
        });
            })
            .catch(error => {
                this.message = error.response.data.message;
            });
    }
  },
  mounted() {
    this.message = '';
    console.log(this.$route.params.id);
    this.getCourse(this.$route.params.id);
    this.getMajorsForCourse(this.$route.params.id);
    this.getMajors();
    
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