import Vue from "vue";
import VueRouter from "vue-router";
import List from '../views/course-list.vue'
//import Edit from '../views/course-edit.vue'
import Delete from '../views/course-delete.vue'
import Add from '../views/course-add.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/courseapi/courses",
    name: "list",
    component: List
  },
  {
    path: "/courseapi/courses/delete",
    name: "delete",
    component: Delete
  },
  //{
    //path: "/dept/dept",
    //name: "Departments",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () =>
      //import("../views/course-list.vue")
  //},
  { //WORKING
    path: "/courseapi/courses/add",
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
