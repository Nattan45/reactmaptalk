<template>
  <el-container style="min-height: 100vh">
    <!-- Sidebar: Conditionally rendered based on authentication -->
    <el-aside v-if="isAuthenticated" width="250px" class="sidebar">
      <SidebarPage />
    </el-aside>

    <el-container>
      <!-- Header -->
      <el-header class="header">
        <NavbarPage />
      </el-header>

      <!-- Main Content -->
      <el-main class="main">
        <router-view />
      </el-main>

      <!-- Footer -->
      <el-footer class="footer">
        <FooterPage />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import FooterPage from './views/FooterPage.vue'
import NavbarPage from './components/NavbarPage.vue'
import SidebarPage from './components/SidebarPage.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    FooterPage,
    NavbarPage,
    SidebarPage
  },
  computed: {
    ...mapState(['isAuthenticated'])
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.el-container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.header {
  background-color: #333;
  color: white;
  height: 64px;
  z-index: 1;
  width: 100%;
}

.sidebar {
  background-color: #fff;
  border-right: 1px solid #ddd;
  position: fixed;
  top: 64px;
  bottom: 0;
  left: 0;
  width: 250px;
  overflow-y: auto;
}

.main {
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  margin-top: 64px;
  overflow-y: auto;
}

.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px;
  position: relative; /* Changed from fixed to relative */
  width: calc(100% - 250px);
  height: auto; /* Let the height adjust based on content */
  min-height: 100px; /* Set a minimum height */
  z-index: 1;
  margin-left: 250px; /* Account for sidebar */
  bottom: 0;
}

.footer-content {
  max-height: calc(100vh - 124px); /* Account for header and minimum footer space */
  overflow-y: auto; /* Allow scrolling within the footer if content overflows */
}

.footer-bottom {
  margin-top: 20px;
}

h3 {
  color: white;
  margin-bottom: 15px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.el-row {
  flex-wrap: nowrap;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    top: 0;
    bottom: 0;
  }

  .main {
    margin-left: 0;
  }

  .footer {
    margin-left: 0;
    width: 100%;
  }
}
</style>
