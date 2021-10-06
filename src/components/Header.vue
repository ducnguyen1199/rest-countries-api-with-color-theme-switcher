<template>
  <div class="header p-2">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <h2 @click="() => this.$router.push('/')" class="cursor-pointer">
          Where in the world?
        </h2>
        <p @click="() => this.$emit('toggleTheme')" class="cursor-pointer">
          <i class="fa fa-moon-o"></i> Dark Mode
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 1;
  @include theme() {
    box-shadow: 0 0 10px theme-get("color-blur");
    background-color: theme-get("bg-primary");
    color: theme-get("text-primary");
  }
  p {
    margin-bottom: 0;
    @include theme() {
      color: theme-get("text-sencondary");
    }
  }
}
</style>