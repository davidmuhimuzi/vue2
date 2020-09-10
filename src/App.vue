<template>
  <div id="app">
    <img alt="OC logo" src="./assets/OC.png">
  <div id="appTitle">
    <HelloStudent msg="OC Courses"/>
  </div>
  </div>
</template>

<script>
import HelloStudent from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    //you can register components here
    HelloStudent
  }
}
</script>

<style>
#app {
  margin-top: 5px;
  text-align: left;
}

#appTitle, HelloStudent {
  text-align: center;
  color: #2c3e50;
  margin-top: -190px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 40px;
}

</style>
