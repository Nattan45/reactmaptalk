<template>
  <div class="report-container">
    <h1 class="report-title">Report an Issue</h1>
    <div class="form-wrapper">
      <el-form ref="form" :model="form" label-width="120px" class="report-form">
        <el-form-item label="Name">
          <el-input v-model="form.name" placeholder="Enter your name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email" placeholder="Enter your email"></el-input>
        </el-form-item>
        <el-form-item label="Issue Type">
          <el-select v-model="form.issueType" placeholder="Select issue type">
            <el-option label="Bug" value="bug"></el-option>
            <el-option label="Feature Request" value="feature"></el-option>
            <el-option label="Other" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Description">
          <el-input
            type="textarea"
            v-model="form.description"
            placeholder="Describe the issue in detail"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReportPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        issueType: '',
        description: ''
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:5000/api/report', this.form)
        console.log('Form submitted successfully:', response.data)
        // Handle success, e.g., reset form or show success message
      } catch (error) {
        console.error('Error submitting form:', error)
        // Handle error, e.g., show error message
      }
    }
  }
}
</script>

<style scoped>
.report-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.report-title {
  font-size: 36px;
  margin-bottom: 40px;
  text-align: center;
  color: #333;
}

.form-wrapper {
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.report-form {
  width: 100%;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input,
.el-select {
  width: 100%;
}

.el-button {
  width: 100%;
}
</style>
