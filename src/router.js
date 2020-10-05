import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === "development" ? "/" : "/courses/",
  
  routes: [
    {
      path: "/",
      //alias: "/courses",
      name: "list", //keep
      component: () => import("./components/CoursesList")
      //path: /courses with name list (doesnt work) for edit delete only gives me app.vue
      //path: / with name list and alias /courses (doesnt work)
      //path: / with name list and no alias and /:id below
    },
    {
      path: "/:id", //changed from /courses/:id since /courses/ is base 
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