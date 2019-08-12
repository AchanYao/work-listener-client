<template>
  <div class="block container">
    <h4 class="title">{{title}}</h4>
    <div class="container">
      <slot>Content</slot>
    </div>
    <hr class="my-4" />
  </div>
</template>

<script>
export default {
  name: "ABlock",
  props: ["title"]
};
</script>

<style scoped>
.block.container {
  padding: 10px;
  margin-bottom: 20px;
}
.title {
  margin-bottom: 20px;
}
</style>

