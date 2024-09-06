<template>
  <el-card class="driver-info" v-loading="loading" element-loading-text="Loading...">
    <!-- Error Message -->
    <el-alert
      v-if="error"
      title="Error loading driver information. Please try again later."
      type="error"
      class="error"
    />

    <!-- Driver Info -->
    <div v-if="!loading && driver" class="driver-info-content">
      <h1>Driver Information</h1>
      <el-row :gutter="20">
        <el-col :span="12">
          <p><strong>Name:</strong> {{ driver.name }}</p>
          <p><strong>Contact:</strong> {{ driver.contact }}</p>
          <p><strong>License Number:</strong> {{ driver.licenseNumber }}</p>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'
import { ElCard, ElAlert, ElRow, ElCol } from 'element-plus'

export default {
  name: 'DriverInformation',
  components: {
    ElCard,
    ElAlert,
    ElRow,
    ElCol
  },
  props: {
    driverId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      driver: null,
      loading: true,
      error: false
    }
  },
  methods: {
    async fetchDriverInfo() {
      this.loading = true
      this.error = false
      try {
        const response = await axios.get(`/api/drivers/${this.driverId}`)
        this.driver = response.data
      } catch (error) {
        this.error = true
        console.error('Error fetching driver information:', error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchDriverInfo()
  }
}
</script>

<style scoped>
.driver-info {
  padding: 20px;
}

.error {
  margin-bottom: 20px;
}

.driver-info-content {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
