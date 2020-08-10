<template>
  <v-app id="app">
    <v-app-bar dense class="flex-grow-0">
      <v-tabs id="nav" background-color="primary" dense>
        <v-tab to="/">Home</v-tab>
        <v-tab to="/about">About</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<style>
</style>
