<template>
  <div class="logo-page">
    <header class="header">
      <img :src="logoSrc" alt="" class="logo" />
    </header>
  </div>
</template>

<script>
export default {
  name: 'LogoPage',
  data() {
    return {
      logoSrc: new URL('@/assets/logo.jpg', import.meta.url).href // For Vite
      // logoSrc: require('@/assets/logo.png') // For Webpack/Vue CLI
    }
  }
}
</script>

<style scoped>
.logo-page {
  text-align: center;
  padding: auto;
  /*background-color: #fff; /* Ensure the background is not affecting visibility */
}

.header {
  padding: 0;
}

.logo {
  width: 135px; /* Adjust size as needed */
  height: auto; /* Maintain aspect ratio */
  display: block;
  margin: 0; /* Center the logo */
  /* Add border to visualize if the logo is present */
}
</style>
