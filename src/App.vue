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
        to="/majorlist"
        text-lg-right
        elevation="6"
      >
      <span class="mr-2">
      <v-icon>Majors</v-icon>
      </span>
      </v-btn>

      <v-btn
        to="/"
        text-lg-right
        elevation="6"
      >
        <span class="mr-2">
        <v-icon>Courses</v-icon>
        </span>
      </v-btn>

      <v-btn
        to="/studentlist">
            <span class="mr-2">
        <v-icon>Students</v-icon>
        </span>
      </v-btn>

  
      <v-btn
        to="/advisor"
        text-lg-right
        elevation="6"
      >
        <span class="mr-2">
        <v-icon>Advisors</v-icon>
        </span>
      </v-btn>

      <v-btn
        to="/semesterlist"
        text-lg-right
        elevation="6"
      >
      <span class="mr-2">
      <v-icon>Semesters</v-icon>
      </span>
      </v-btn>

      <v-btn
        to="/stucourseslist"
        text-lg-right
        elevation="6"
      >
        <span class="mr-2">
        <v-icon>Course Plan</v-icon>
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
