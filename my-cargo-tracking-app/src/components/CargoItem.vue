<template>
  <el-card class="cargo-item" shadow="always">
    <div class="cargo-content">
      <h3>{{ cargo.name }}</h3>
      <p>Status: {{ cargo.status }}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'CargoItem',
  data() {
    return {
      cargoList: []
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
    }
  },
  mounted() {
    this.fetchCargoList()
  }
}
</script>

<style scoped>
.cargo-item {
  margin-bottom: 20px; /* Add spacing between items if used in a list */
  padding: 20px; /* Adjust padding as needed */
}

.cargo-content h3 {
  margin: 0; /* Remove default margin */
  font-size: 18px; /* Adjust font size if needed */
}

.cargo-content p {
  margin: 0; /* Remove default margin */
  font-size: 14px; /* Adjust font size if needed */
}
</style>
