<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p class="signup-link">Don't have an account? <a @click="navigateToSignup">Sign Up</a></p>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    async submitForm() {
      if (this.email && this.password) {
        // Mock authentication
        localStorage.setItem('userToken', 'abc123')
        const userRole = this.email === 'admin@example.com' ? 'admin' : 'user'
        localStorage.setItem('userRole', userRole)

        // Update Vuex store
        this.login()
        this.$router.push('/') // Redirect to home page
      } else {
        alert('Email and password cannot be empty!')
      }
    }
    /*
    ...mapActions(['login']),
    async submitForm() {
      if (this.email && this.password) {
        try {
          // Make API request to authenticate user
          const response = await axios.post('https://your-server.com/api/login', {
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
          console.error('Login failed:', error)
          alert('Login failed. Please check your email and password.')
        }
      } else {
        alert('Email and password cannot be empty!')
      }
    },
    navigateToSignup() {
      this.$router.push('/signup') // Navigate to the sign-up page
    }*/
  }
}
</script>

<style scoped>
.login {
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
  background-color: #007bff;
  color: white;
  font-size: 1em;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.signup-link {
  margin-top: 15px;
  font-size: 1em;
  color: #333;
}

.signup-link a {
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>
