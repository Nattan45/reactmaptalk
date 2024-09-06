<template>
  <el-card class="cargo-detail" v-loading="loading" element-loading-text="Loading...">
    <!-- Error Message -->
    <el-alert
      v-if="error"
      title="Error loading cargo details. Please try again later."
      type="error"
      class="error"
    />

    <!-- Cargo Info -->
    <div v-if="!loading && cargo" class="cargo-info">
      <h1>Cargo #{{ cargo.id }}</h1>
      <el-row :gutter="20">
        <el-col :span="12">
          <p><strong>Name:</strong> {{ cargo.name }}</p>
          <p><strong>Status:</strong> {{ cargo.status }}</p>
          <p><strong>Location:</strong> {{ cargo.location }}</p>
          <p><strong>Last Update:</strong> {{ cargo.lastUpdate }}</p>
        </el-col>
      </el-row>

      <!-- History -->
      <el-card v-if="cargo.history && cargo.history.length > 0" class="cargo-history">
        <h2>History</h2>
        <el-timeline>
          <el-timeline-item
            v-for="event in cargo.history"
            :key="event.timestamp"
            :timestamp="new Date(event.timestamp).toLocaleString()"
          >
            {{ event.description }}
          </el-timeline-item>
        </el-timeline>
      </el-card>

      <!-- Map Component Placeholder -->
      <el-card class="map">
        <p>Map showing cargo location will go here.</p>
      </el-card>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CargoDetail',
  props: {
    cargoId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      cargo: null,
      loading: true,
      error: false
    }
  },
  methods: {
    async fetchCargoDetail() {
      this.loading = true
      this.error = false
      try {
        const response = await axios.get(`/api/cargo/${this.cargoId}`)
        this.cargo = response.data
      } catch (error) {
        this.error = true
        console.error('Error fetching cargo details:', error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.fetchCargoDetail()
  }
}
</script>

<style scoped>
.cargo-detail {
  padding: 20px;
}

.error {
  margin-bottom: 20px;
}

.cargo-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.cargo-history {
  margin-top: 20px;
}

.map {
  margin-top: 20px;
  height: 400px;
  background-color: #ddd;
}
</style>
