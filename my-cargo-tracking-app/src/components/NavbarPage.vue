<template>
  <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    class="navbar"
    background-color="#333"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!-- Logo Component -->
    <el-menu-item class="logo-menu-item">
      <LogoPage />
    </el-menu-item>
    <el-menu-item index="1">
      <router-link to="/">Home</router-link>
    </el-menu-item>
    <el-menu-item v-if="!isAuthenticated" index="2">
      <router-link to="/login">Login</router-link>
    </el-menu-item>
    <el-menu-item v-if="isAuthenticated" index="3">
      <button @click="logout">Logout</button>
    </el-menu-item>
    <el-menu-item index="4" class="report-menu-item">
      <router-link to="/report">Report</router-link>
    </el-menu-item>
    <!-- Search button -->
    <el-menu-item class="search-menu-item">
      <SearchComponent />
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchComponent from './SearchComponent.vue' // Import the search component
import LogoPage from './LogoPage.vue'
export default {
  name: 'NavbarPage',
  components: {
    LogoPage,
    SearchComponent
  },
  computed: {
    ...mapState(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['logout']),
    checkAuthentication() {
      this.isAuthenticated = this.$store.getters.isAuthenticated
    }
  },
  mounted() {
    this.checkAuthentication()
  }
}
</script>

<style scoped>
.navbar {
  background-color: #333;
  position: fixed; /* Fixes the navbar to the top */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensures the navbar stays on top of other content */
}
.el-menu {
  display: flex; /* Enable flexbox layout */
  /*justify-content: space-between; /* Space items evenly */
  align-items: center; /* Center items vertically */
  width: 100%; /* Ensure full width */
}
.el-menu-item {
  margin: 0 10px;
}

.el-menu-item a,
.el-menu-item button {
  color: #fff;
  text-decoration: none;
}

.el-menu-item button {
  background: none;
  border: none;
  cursor: pointer;
}
.report-menu-item {
  margin-left: auto; /* Push the Report button to the right */
}
.search-menu-item {
  margin-left: 20px; /* Adds spacing between Report and Search */
}

.search-input {
  width: 200px; /* Adjust the width of the search input as needed */
  border-radius: 4px;
}
</style>
