import axios from 'axios'

// Create an axios instance with default configuration
const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend API base URL
  timeout: 10000, // Optional: Set a timeout for requests
  headers: { 'Content-Type': 'application/json' }
})

export default instance
