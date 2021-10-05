<template>
  <div class="header p-2">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <h2 @click="() => this.$router.push('/')">Where in the world?</h2>
        <p @click="toggleTheme"><i class="fa fa-moon-o"></i> Dark Mode</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  mounted() {
    const initUserTheme = this.getMediaPreference();
    this.setTheme(initUserTheme);
  },
  data() {
    return {
      userTheme: "light-theme",
    };
  },
  methods: {
    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme");
      if (activeTheme === "light-theme") {
        this.setTheme("dark-theme");
      } else {
        this.setTheme("light-theme");
      }
    },

    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },

    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (hasDarkPreference) {
        return "dark-theme";
      } else {
        return "light-theme";
      }
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  z-index: 1;
  box-shadow: 0px 0px 10px 0px var(--color-blur);
  background: var(--background-primary);
  color: var(--text-primary);
}
p {
  margin-bottom: 0;
  color: var(--text-sencondary);
}
</style>