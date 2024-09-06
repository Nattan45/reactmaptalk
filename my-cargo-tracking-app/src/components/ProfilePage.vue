<template>
  <div class="profile-form">
    <h1>Profile</h1>
    <el-form :model="profileForm" @submit.prevent="handleProfileUpdate">
      <el-form-item label="Name">
        <el-input v-model="profileForm.name" required></el-input>
      </el-form-item>
      <el-form-item label="Phone">
        <el-input v-model="profileForm.phone" required></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Update Profile</el-button>
        <el-button type="danger" @click="handleLogout">Logout</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProfilePage',
  data() {
    return {
      profileForm: {
        name: '',
        phone: ''
      }
    }
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
          }
        })
        this.profileForm = {
          name: response.data.name,
          phone: response.data.phone
        }
      } catch (error) {
        console.error('Error fetching profile data:', error)
        // Optionally handle errors and inform the user
      }
    },
    async handleProfileUpdate() {
      try {
        // Make the PUT request to update the profile
        const response = await axios.put('/api/profile', this.profileForm, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
          }
        })
        console.log('Profile updated successfully:', response.data)
        // Optionally notify the user of success
      } catch (error) {
        console.error('Error updating profile:', error)
        // Optionally handle errors and inform the user
      }
    },
    handleLogout() {
      localStorage.removeItem('userToken')
      this.$router.push('/login')
    }
  },
  mounted() {
    this.fetchUserProfile()
  }
}
</script>

<style scoped>
.profile-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
</style>
