<template>
  <el-container class="cargo-tracking-page">
    <el-aside width="300px" class="cargo-list">
      <el-card>
        <h2>Cargo List</h2>
        <el-scrollbar>
          <el-menu
            :default-active="selectedCargoId"
            class="cargo-list-menu"
            @select="handleCargoSelect"
          >
            <el-menu-item v-for="item in cargoList" :key="item.id" :index="item.id.toString()">
              Cargo #{{ item.id }} - {{ item.name }}
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-card>
    </el-aside>

    <el-main class="cargo-detail" v-if="selectedCargo">
      <el-card>
        <h2>Details for Cargo #{{ selectedCargo.id }}</h2>
        <el-row :gutter="20">
          <el-col :span="12">
            <p><strong>Name:</strong> {{ selectedCargo.name }}</p>
            <p><strong>Status:</strong> {{ selectedCargo.status }}</p>
            <p><strong>Location:</strong> {{ selectedCargo.location }}</p>
            <p><strong>Last Update:</strong> {{ selectedCargo.lastUpdate }}</p>
          </el-col>
          <el-col :span="12" v-if="selectedCargo.driver">
            <el-card>
              <h3>Driver Details</h3>
              <p><strong>Name:</strong> {{ selectedCargo.driver.name }}</p>
              <p><strong>Contact:</strong> {{ selectedCargo.driver.contact }}</p>
            </el-card>
          </el-col>
        </el-row>

        <el-card v-if="selectedCargo.history && selectedCargo.history.length > 0">
          <h3>History</h3>
          <el-timeline>
            <el-timeline-item
              v-for="event in selectedCargo.history"
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
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CargoTrackingPage',
  data() {
    return {
      cargoList: [], // List of cargo items
      selectedCargo: null, // Currently selected cargo item
      selectedCargoId: null // ID of the selected cargo item
    }
  },
  methods: {
    async fetchCargoList() {
      try {
        const response = await axios.get('/api/cargo')
        this.cargoList = response.data
      } catch (error) {
        console.error('Error fetching cargo list:', error)
      }
    },
    async fetchCargoDetail(id) {
      try {
        const response = await axios.get(`/api/cargo/${id}`)
        this.selectedCargo = response.data
      } catch (error) {
        console.error('Error fetching cargo details:', error)
      }
    },
    handleCargoSelect(id) {
      this.selectedCargoId = id
      this.fetchCargoDetail(id)
    }
  },
  mounted() {
    this.fetchCargoList()
  }
}
</script>

<style scoped>
.cargo-tracking-page {
  display: flex;
}

.cargo-list-menu {
  height: 100%;
}

.cargo-detail {
  flex: 1;
  padding: 20px;
}

.map {
  margin-top: 20px;
  height: 400px;
  background-color: #ddd;
}
</style>
