<template>
  <el-container class="admin-dashboard">
    <el-header>
      <h1>Admin Dashboard</h1>
    </el-header>

    <el-main>
      <el-row :gutter="20">
        <!-- Statistics Overview -->
        <el-col :span="8">
          <el-card class="stat-card">
            <h2>Total Users</h2>
            <p>{{ totalUsers }}</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="stat-card">
            <h2>Total Cargo</h2>
            <p>{{ totalCargo }}</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="stat-card">
            <h2>Pending Requests</h2>
            <p>{{ pendingRequests }}</p>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <!-- Recent Activities -->
        <el-col :span="24">
          <el-card>
            <h2>Recent Activities</h2>
            <el-list>
              <el-list-item v-for="activity in recentActivities" :key="activity.id">
                {{ activity.description }}
              </el-list-item>
            </el-list>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <!-- Data Visualization -->
        <el-col :span="24">
          <el-card>
            <h2>Monthly Cargo Statistics</h2>
            <line-chart :data="chartData"></line-chart>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
import LineChart from '@/components/LineChart.vue'

export default {
  name: 'AdminDashboard',
  components: {
    LineChart
  },
  data() {
    return {
      totalUsers: 0,
      totalCargo: 0,
      pendingRequests: 0,
      recentActivities: [],
      chartData: {
        labels: [], // e.g., ['January', 'February', 'March']
        datasets: [
          {
            label: 'Cargo Shipments',
            backgroundColor: '#42A5F5',
            data: [1, 2, 3, 4] // e.g., [12, 19, 3]
          }
        ]
      }
    }
  },
  methods: {
    async fetchStatistics() {
      this.totalUsers = await this.getTotalUsers()
      this.totalCargo = await this.getTotalCargo()
      this.pendingRequests = await this.getPendingRequests()
    },
    async fetchRecentActivities() {
      this.recentActivities = await this.getRecentActivities()
    },
    async fetchChartData() {
      const data = await this.getChartData()
      this.chartData.labels = data.labels
      this.chartData.datasets[0].data = data.values
    },
    async getTotalUsers() {
      try {
        const response = await axios.get('/api/admin/total-users')
        return response.data.totalUsers
      } catch (error) {
        console.error('Error fetching total users:', error)
        return 0
      }
    },
    async getTotalCargo() {
      try {
        const response = await axios.get('/api/admin/total-cargo')
        return response.data.totalCargo
      } catch (error) {
        console.error('Error fetching total cargo:', error)
        return 0
      }
    },
    async getPendingRequests() {
      try {
        const response = await axios.get('/api/admin/pending-requests')
        return response.data.pendingRequests
      } catch (error) {
        console.error('Error fetching pending requests:', error)
        return 0
      }
    },
    async getRecentActivities() {
      try {
        const response = await axios.get('/api/admin/recent-activities')
        return response.data.activities
      } catch (error) {
        console.error('Error fetching recent activities:', error)
        return []
      }
    },
    async getChartData() {
      try {
        const response = await axios.get('/api/admin/cargo-statistics')
        return {
          labels: response.data.labels,
          values: response.data.values
        }
      } catch (error) {
        console.error('Error fetching chart data:', error)
        return {
          labels: [],
          values: []
        }
      }
    }
  },
  async mounted() {
    await this.fetchStatistics()
    await this.fetchRecentActivities()
    await this.fetchChartData()
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.el-card {
  margin-bottom: 20px;
}
</style>
