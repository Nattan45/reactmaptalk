<template>
  <el-footer class="footer-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/admin">Admin Dashboard</router-link></li>
          <li><router-link to="/cargo-tracker">Cargo Tracker</router-link></li>
        </ul>
      </el-col>
      <el-col :span="6">
        <h3>Contact Us</h3>
        <p>Email: <a href="mailto:support@yourcompany.com">support@yourcompany.com</a></p>
        <p>Phone: +123 456 7890</p>
        <p>Address: 123 Main Street, City, Country</p>
      </el-col>
      <el-col :span="6">
        <h3>Follow Us</h3>
        <a href="https://twitter.com/yourcompany" target="_blank">Twitter</a><br />
        <a href="https://facebook.com/yourcompany" target="_blank">Facebook</a><br />
        <a href="https://linkedin.com/company/yourcompany" target="_blank">LinkedIn</a>
      </el-col>
      <el-col :span="6">
        <h3>About Us</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula justo nec purus
          malesuada.
        </p>
      </el-col>
    </el-row>
    <div class="footer-bottom">
      <p>&copy; 2024 YourCompany. All rights reserved.</p>
    </div>
  </el-footer>
</template>

<script>
export default {
  name: 'FooterPage'
}
</script>

<style scoped>
.footer-container {
  background-color: #333;
  color: white;
  padding: 40px 20px; /* Increase padding for more space */
  text-align: center;
  position: fixed; /* Stick to the bottom */
  bottom: 0;
  width: 100%;
  left: 0; /* Align to the left edge of the screen */
}

.footer-bottom {
  margin-top: 20px;
}

h3 {
  color: white;
  margin-bottom: 15px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.el-row {
  flex-wrap: nowrap; /* Ensure items don't wrap, keeping them in one line */
}

@media (max-width: 768px) {
  .el-row {
    flex-wrap: wrap; /* Allow wrapping on smaller screens */
  }

  .el-col {
    margin-bottom: 20px;
  }
}
</style>
