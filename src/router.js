import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === "development" ? "/" : "/courses/",
  
  routes: [
    {
      path: "/",
      name: "list", //keep
      component: () => import("./components/course/CoursesList")
      
    },
    {
      path: "/courses/:id",  
      name: "course-details",
      component: () => import("./components/course/Course")
    },
    {
      path: "/add",
      name: "add",
      target: "add",
      component: () => import("./components/course/AddCourse")
    },

    {
      path: "/addsemester",
      name: "addsemester",
      target: "addsemester",
      component: () => import("./components/semester/AddSemester")
    }
  ]
});