import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/course-list.vue";
//import List from '../views/course-list.vue'
//import Edit from '../views/course-edit.vue'
//import Delete from '../views/course-delete.vue'
import Add from '../views/course-add.vue'
Vue.use(VueRouter);

const routes = [
  {
    //Displays info for one single course
    path: "courses/:id",
    name: "list",
    component: () => 
    import("../components/CourseDisplay.vue")
  },
  //Displays the different departments available
  {
    path: "/dept",
    name: "dept",
    component: () => import("../components/CourseDisplay.vue")
  },
  {
    //Displays courses for one single department
    path: "/dept/dept",
    name: "Departments",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/course-list.vue")
  },
  { //WORKING
    //Displays courses for one single department
    path: "/courses",
    name: "add",
    component: Add
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
