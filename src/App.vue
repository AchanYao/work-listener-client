<template>
  <div id="app">
    <my-header></my-header>
    <div id="page-container" style="padding-top: 50px;">
      <router-view />
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
export default {
  name: "App",
  components: {
    MyHeader
  }
};
</script>

<style>
</style>
