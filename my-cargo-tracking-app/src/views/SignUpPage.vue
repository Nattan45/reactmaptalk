<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'SignUpPage',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    async submitForm() {
      if (this.name && this.email && this.password) {
        try {
          const response = await axios.post('https://your-server.com/api/signup', {
            name: this.name,
            email: this.email,
            password: this.password
          })

          // Assuming the server responds with a token and user role
          const { token, role } = response.data

          // Store token and user role in local storage
          localStorage.setItem('userToken', token)
          localStorage.setItem('userRole', role)

          // Update Vuex store
          this.login()

          // Redirect to the home page
          this.$router.push('/')
        } catch (error) {
          console.error('Sign Up failed:', error)
          alert('Sign Up failed. Please try again.')
        }
      } else {
        alert('All fields are required!')
      }
    }
  }
}
</script>

<style scoped>
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
}

h1 {
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

form {
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  font-size: 1em;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
