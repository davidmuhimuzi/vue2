import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === "development" ? "/" : "/courses/",
  
  routes: [
    {
      path: "/",
      name: "list",
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
    },
    {
      path: "/advisors",
      name: "advisorlist",
      component: () => import("./components/AdvisorList")
    },
    {
      path: "/advisoredit/:id",
      name: "advisoredit",
      component: () => import("./components/AdvisorEdit")
    },
    {
      path: "/advisoradd",
      name: "advisoradd",
      component: () => import("./components/AdvisorAdd")
    }

  ]
});