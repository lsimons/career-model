<template>
  <v-app id="app">
    <v-app-bar class="flex-grow-0" dense>
      <v-toolbar-title class="flex-shrink-0" style="margin-right: 20px">Career Model</v-toolbar-title>
      <v-tabs id="nav" dense>
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
