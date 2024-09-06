<template>
  <el-card
    class="gps-control"
    shadow="always"
    v-loading="loading"
    element-loading-text="Loading..."
  >
    <!-- Error Message -->
    <el-alert
      v-if="error"
      title="Error loading GPS data. Please try again later."
      type="error"
      class="error"
    />

    <!-- GPS Control -->
    <div v-if="!loading && gpsData" class="gps-content">
      <h2>GPS Tracking</h2>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Latitude">
            <el-input :value="gpsData.lat" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Longitude">
            <el-input :value="gpsData.lng" disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'
import { ElCard, ElAlert, ElRow, ElCol, ElFormItem, ElInput } from 'element-plus'

export default {
  name: 'GPSControl',
  components: {
    ElCard,
    ElAlert,
    ElRow,
    ElCol,
    ElFormItem,
    ElInput
  },
  props: {
    vehicleId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      gpsData: null,
      loading: true,
      error: false
    }
  },
  methods: {
    async fetchGPSData() {
      this.loading = true
      this.error = false
      try {
        const response = await axios.get(`/api/gps/${this.vehicleId}`)
        this.gpsData = response.data
      } catch (error) {
        this.error = true
        console.error('Error fetching GPS data:', error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchGPSData()
  }
}
</script>

<style scoped>
.gps-control {
  margin-top: 20px;
  padding: 20px;
}

.error {
  margin-bottom: 20px;
}

.gps-content {
  padding: 10px;
}
</style>
