import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === "development" ? "/" : "/courses/",
  
  routes: [
    {
      path: "/",
      name: "list", //changed name to list instead of course
      component: () => import("./components/CoursesList")
    },
    {
      path: "/courses/:id",
      name: "course-details",
      component: () => import("./components/Course")
    },
    {
      path: "/add",
      name: "add",
      target: "add",
      component: () => import("./components/AddCourse")
    }
  ]
});