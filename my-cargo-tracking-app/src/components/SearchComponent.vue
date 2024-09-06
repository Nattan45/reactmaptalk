<template>
  <div class="search-container">
    <input type="text" placeholder="Search..." v-model="query" @input="performSearch" />
    <img src="@/assets/search-icon.png" alt="Search" class="search-icon" />
    <div v-if="loading" class="loading">Loading...</div>
    <ul v-if="results.length" class="results-list">
      <li v-for="item in results" :key="item.id">{{ item.name }}</li>
    </ul>
    <div v-if="error" class="error">Error fetching results</div>
  </div>
</template>

<script>
export default {
  name: 'SearchComponent',
  data() {
    return {
      query: '',
      results: [],
      loading: false,
      error: false
    }
  },
  methods: {
    async performSearch() {
      if (this.query.trim() === '') {
        this.results = []
        return
      }

      this.loading = true
      this.error = false

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(this.query)}`)
        if (!response.ok) throw new Error('Failed to fetch search results')
        this.results = await response.json()
      } catch (error) {
        this.error = true
        console.error('Error fetching search results:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  background-color: #fff;
  position: relative; /* Needed for absolute positioning of the loading indicator */
}

input[type='text'] {
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  flex: 1;
}

.search-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.loading {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 10px;
  text-align: center;
  color: #999;
}

.results-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 200px; /* Adjust based on design */
  overflow-y: auto;
}

.results-list li {
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
}

.results-list li:hover {
  background-color: #f5f5f5;
}

.error {
  color: red;
  text-align: center;
}
</style>
