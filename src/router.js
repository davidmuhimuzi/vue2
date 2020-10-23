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
      component: () => import("./components/CourseAdd")
    },

    {
      path: "/majorlist",
      name: "majorlist",
      component: () => import("./components/MajorsList")
      
    },
    
    {
      path: "/majoredit/:id",  
      name: "majoredit",
      component: () => import("./components/Major")
    },

    {
      path: "/majoradd",
      name: "majoradd",
      component: () => import("./components/MajorAdd")
    }
  ]
});