<template>
  <header class="app-header">
    <div class="logo-container">
      <div class="logo-icon"></div>
      <h1 class="logo-text">Teachers</h1>
    </div>
    
    <div class="user-actions">
      <div class="user-profile">
        <div class="user-icon"></div>
        <span class="user-name">{{ user?.name }}</span>
      </div>
      
      <div class="notifications">
        <div class="notification-icon"></div>
        <span class="notification-text">Notifications</span>
        <span class="notification-count">({{ notificationCount }})</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAuthStore } from '../../stores/auth';

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const authStore = useAuthStore();
    
    const user = computed(() => authStore.user);
    const notificationCount = computed(() => authStore.notificationCount);
    
    return {
      user,
      notificationCount
    };
  }
});
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #3786d6;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  border-radius: 0.25rem;
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo-icon::after {
  content: '';
  width: 1.25rem;
  height: 1.25rem;
  background-color: #3786d6;
  border-radius: 50%;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.user-actions {
  display: flex;
  align-items: center;
}

.user-profile {
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.4rem 0.75rem;
  border-radius: 0.25rem;
}

.user-icon {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
}

.user-icon::after {
  content: '👤';
  font-size: 1rem;
}

.user-name {
  font-weight: 500;
}

.notifications {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.4rem 0.75rem;
  border-radius: 0.25rem;
}

.notification-icon {
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
}

.notification-icon::after {
  content: '🔔';
  font-size: 1rem;
}

.notification-text {
  margin-right: 0.25rem;
}

.notification-count {
  margin-left: 0.25rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-header {
    padding: 0.5rem 1rem;
    flex-direction: column;
  }
  
  .user-actions {
    margin-top: 0.5rem;
    width: 100%;
    justify-content: center;
  }
  
  .logo-text {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .user-profile, .notifications {
    font-size: 0.875rem;
  }
  
  .user-profile {
    margin-right: 1rem;
  }
}
</style>