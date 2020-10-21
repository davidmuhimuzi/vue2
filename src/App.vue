<template>
  <v-app>
    <v-app-bar
      app
      absolute
      color="#B22222"
      dark
      elevation-18
      extended
      tile
      extension-height="20"
    >
      <div class="d-flex align-center">
        <v-img
          alt="OC Logo"
          class="shrink mr-2"
          contain
          src="./assets/OC.png"
          transition="scale-transition"
          width="60"
        />
    <v-toolbar-title> 
      Team 3
    </v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        to="/"
        text-lg-right
      >
        <span class="mr-2">
        <v-icon>mdi-home</v-icon>
        </span>
      </v-btn>
    
       <v-btn
        to="/add"
       
        text-lg-right
      >
        <span class="mr-2">
        <v-icon>mdi-plus</v-icon>
        </span>
      </v-btn>

      <v-btn
        to="/addsemester"
       
        text-lg-right
      >
        <span class="mr-2">
        <v-icon>mdi-plus</v-icon>
        </span>
      </v-btn>

      
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
