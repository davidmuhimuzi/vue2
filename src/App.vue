<template>
  <div id="app">
    <div id="nav">
      <h1> Course Navigator </h1>
    <img alt="OC logo" src="./assets/OC.png" >
    <br>
      <router-link to="/courseapi/dept"> List </router-link>|
      <router-link to="/courseapi/courses/add">  Add  </router-link>| 
      <router-link to="/courseapi/courses/delete"> Delete </router-link>|
    </div>
       <router-view />
  
  </div> 

</template>
<script>

</script>

<style>

h1 {
  text-align: center;
  
}
#app {
  margin-top: 100px;
  font-size: 25px;
}

#app, router-link {
  text-align: center;
}


</style>
