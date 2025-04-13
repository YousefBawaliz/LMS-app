<template>
    <div class="teacher-layout">
      <app-header />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import AppHeader from '../components/common/AppHeader.vue';
  
  export default defineComponent({
    name: 'TeacherLayout',
    components: {
      AppHeader
    }
  });
  </script>
  
  <style scoped>
  .teacher-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f5f7fa;
  }
  
  .main-content {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .main-content {
      padding: 0.5rem;
    }
  }
  </style>