import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
        path: "/",
        alias: "/welcome",
        name: "welcome",
        component: () => import("./components/welcome")
    },
    {
      path: "/",
      alias: "/courses",
      name: "courses",
      component: () => import("./components/CourseList")
    },
    {
      path: "/courses/:id",
      name: "course-details",
      component: () => import("./components/Course")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddCourse")
    },
    {
        path: "/edit",
        name: "edit",
        component: () => import("./components/EditCourse")
      }
  ]
});