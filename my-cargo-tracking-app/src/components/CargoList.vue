<template>
  <el-card class="cargo-list">
    <el-list v-if="!loading">
      <el-list-item v-for="cargo in cargos" :key="cargo.id" @click="selectCargo(cargo)">
        <cargo-item :cargo="cargo" />
      </el-list-item>
    </el-list>
    <el-empty v-else description="No Cargo Data Available"></el-empty>
  </el-card>
</template>

<script>
import axios from 'axios'
import CargoItem from './CargoItem.vue'
import { ElCard, ElList, ElListItem, ElEmpty } from 'element-plus'

export default {
  name: 'CargoList',
  components: {
    CargoItem,
    ElCard,
    ElList,
    ElListItem,
    ElEmpty
  },
  data() {
    return {
      cargos: [],
      loading: true
    }
  },
  methods: {
    async fetchCargos() {
      try {
        const response = await axios.get('/api/cargo')
        this.cargos = response.data
      } catch (error) {
        console.error('Error fetching cargos:', error)
      } finally {
        this.loading = false
      }
    },
    selectCargo(cargo) {
      this.$emit('selectCargo', cargo)
    }
  },
  mounted() {
    this.fetchCargos()
  }
}
</script>

<style scoped>
.cargo-list {
  padding: 20px;
}

.el-list {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Space between items */
}

.el-list-item {
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.el-list-item:hover {
  background-color: #f5f5f5;
}
</style>
