<template>
  <div>
    <!-- This makes one whole instance of one course.dept in courseapi/dept/dept -->
    <h1> Hello... coursedisplay.vue </h1>

    <span>{{ courses.dept }}(</span>
    <router-link :to="{ course: 'edit', params: { id: course.id } }">
      <span> Edit </span>
    </router-link>
    <span>|</span>
    <router-link :to="{ course: 'add', params: { id: course.id } }">
      <span> Add </span>
    </router-link>
    <span>)</span>
  </div>
</template>

<script>
export default {
  props: {
    course: Object
  }
}
//course: {}
</script>

<style></style>
