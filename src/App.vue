<template>
  <div id="app" :class="isDarkTheme ? 'darkTheme' : 'lightTheme'">
    <Header @toggleTheme="toggleTheme" />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  name: 'App',
  components: { Header },
  data() {
    return {
      isDarkTheme: null,
    };
  },
  methods: {
    toggleTheme: function() {
      this.isDarkTheme = !this.isDarkTheme;
      window.localStorage.setItem('isDarkTheme', this.isDarkTheme);
    },
  },
  mounted() {
    this.isDarkTheme = window.localStorage.getItem('isDarkTheme') === 'true';
  },
};
</script>
