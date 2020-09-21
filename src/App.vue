<template>
  <div id="app">
    <div id="nav">
      <h1> Course Navigator </h1>
    <img alt="OC logo" src="./assets/OC.png" >
    <br>
      <router-link to="/">List</router-link>|
      <router-link to="/courses"> Add </router-link>
    </div>
       <router-view />

    <!-- <router-link to="/courses/:id"> 
    <router-link to="/dept"> 
      <span>edit</span>
    </router-link>
    <span>|</span>
    <router-link to="/">
      <span>delete</span>
    </router-link> -->
  
  </div> 

</template>


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
