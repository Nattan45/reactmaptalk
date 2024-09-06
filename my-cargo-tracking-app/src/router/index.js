// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import CargoTrackingPage from '@/views/CargoTrackingPage.vue'
import ProfileForm from '@/components/ProfilePage.vue'
import ReportPage from '@/views/ReportPage.vue'
import GPSControl from '@/components/GPSControl.vue'
import SignUpPage from '@/views/SignUpPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/admin', component: AdminDashboard },
  { path: '/cargo-tracker', component: CargoTrackingPage },
  { path: '/profile', component: ProfileForm },
  { path: '/report', component: ReportPage },
  { path: '/gps-control', component: GPSControl },
  { path: '/signup', component: SignUpPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
