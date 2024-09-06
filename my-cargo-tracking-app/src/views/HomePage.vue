<template>
  <el-container class="home-container">
    <!-- Welcome Section -->
    <el-row class="welcome-section" justify="center">
      <el-col :span="24" style="text-align: center">
        <h1>Welcome to the Cargo Tracking System</h1>
        <p>Your one-stop solution for managing and tracking cargo efficiently.</p>
      </el-col>
    </el-row>

    <!-- Dashboard Content -->
    <el-row class="dashboard" gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <h2>Current Cargo Status</h2>
          <p>{{ cargoStatus }}</p>
          <el-button type="primary" @click="viewCargoDetails">View Details</el-button>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover">
          <h2>Recent Activities</h2>
          <el-timeline>
            <el-timeline-item v-for="activity in recentActivities" :key="activity.id" color="green">
              {{ activity.description }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover">
          <h2>Quick Access</h2>
          <el-menu class="el-menu-vertical-demo" background-color="#1f03032f" text-color="#333">
            <el-menu-item index="1">
              <router-link to="/gps-tracking">GPS Tracking</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/driver-info">Driver Information</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/admin">Admin Dashboard</router-link>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import axios from 'axios'
export default {
  /*
  name: 'HomePage',
  components: {},
  data() {
    return {
      cargoStatus: 'All cargos are currently on time.',
      recentActivities: [
        { id: 1, description: 'Cargo # departed from New York' },
        { id: 2, description: 'Cargo # arrived in Los Angeles' },
        { id: 3, description: 'Cargo # is in transit to Chicago' }
      ]
    }
  },
  methods: {
    viewCargoDetails() {
      this.$router.push('/cargo-details')
    }
  }*/

  name: 'HomePage',
  data() {
    return {
      cargoStatus: 'All cargos are currently on time.',
      recentActivities: [
        { id: 1, description: 'Cargo # departed from New York' },
        { id: 2, description: 'Cargo # arrived in Los Angeles' },
        { id: 3, description: 'Cargo # is in transit to Chicago' }
      ]
    }
  },
  async mounted() {
    try {
      // Fetch Cargo Status
      const cargoStatusResponse = await axios.get('https://your-server.com/api/cargo-status')
      this.cargoStatus = cargoStatusResponse.data.status

      // Fetch Recent Activities
      const activitiesResponse = await axios.get('https://your-server.com/api/recent-activities')
      this.recentActivities = activitiesResponse.data.activities
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  },
  methods: {
    viewCargoDetails() {
      this.$router.push('/cargo-details')
    }
  }
}
</script>

<style scoped>
.home-container {
  padding: 20px;
}

.welcome-section {
  margin-bottom: 40px;
}

.dashboard {
  margin-top: 20px;
}

.el-card {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
}

.el-card h2 {
  margin-bottom: 10px;
}

.el-timeline-item {
  margin-bottom: 10px;
}
</style>
