<template>
  <div>
    <Line :data="chartData" :options="options" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register the required components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

export default {
  name: 'LineChart',
  components: {
    Line
  },
  data() {
    return {
      chartData: {
        labels: [], // X-axis labels
        datasets: [
          {
            label: 'Cargo Shipments',
            backgroundColor: '#42A5F5',
            data: [] // Data for Y-axis
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top' // Adjust legend position if needed
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.parsed.y}`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'X Axis Label' // Customize the X-axis label
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Y Axis Label' // Customize the Y-axis label
            }
          }
        }
      }
    }
  },
  async mounted() {
    await this.fetchChartData()
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await fetch('/api/chart-data') // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json()
          this.chartData.labels = data.labels // e.g., ['January', 'February', 'March']
          this.chartData.datasets[0].data = data.values // e.g., [12, 19, 3]
        } else {
          console.error('Failed to fetch chart data')
        }
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }
  }
}
</script>

<style scoped>
/* Add any additional styling for the chart container here */
</style>
