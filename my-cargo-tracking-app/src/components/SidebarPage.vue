<template>
  <el-aside class="sidebar">
    <el-menu
      :default-active="activeMenu"
      class="sidebar-menu"
      background-color="#000"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="1">
        <router-link to="/">Home</router-link>
      </el-menu-item>
      <el-menu-item v-if="isAuthenticated" index="2">
        <router-link to="/gps-tracking">GPS Tracking</router-link>
      </el-menu-item>
      <el-menu-item v-if="isAuthenticated && userRole === 'admin'" index="3">
        <router-link to="/admin">Admin Dashboard</router-link>
      </el-menu-item>
      <el-menu-item v-if="isAuthenticated" index="4">
        <router-link to="/driver-info">Driver Information</router-link>
      </el-menu-item>
      <el-menu-item v-if="isAuthenticated" index="4">
        <router-link to="/driver-info">Admin Dashboard</router-link>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SidebarPage',
  computed: {
    ...mapState(['isAuthenticated', 'userRole']),
    activeMenu() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh; /* Full height */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow-y: auto;
}

.sidebar-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
