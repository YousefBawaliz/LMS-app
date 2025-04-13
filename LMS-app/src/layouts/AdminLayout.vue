<template>
  <div class="admin-layout">
    <app-header userType="Administrator" />
    <nav class="nav-tabs">
      <router-link to="/admin/vr-experiences" class="nav-tab">VR Experiences</router-link>
      <router-link to="/admin/teachers" class="nav-tab">Teachers Management</router-link>
      <router-link to="/admin/students" class="nav-tab">Students Management</router-link>
      <router-link to="/admin/stats" class="nav-tab">Stats and Reports</router-link>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/common/AppHeader.vue';
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.nav-tabs {
  background-color: #3986d6;
  display: flex;
  padding: 0 20px;
}

.nav-tab {
  padding: 15px 25px;
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-tab:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.router-link-active {
  background-color: white;
  color: #333;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .nav-tabs {
    overflow-x: auto;
    padding: 0 10px;
  }

  .nav-tab {
    padding: 15px 15px;
    white-space: nowrap;
  }
}
</style>