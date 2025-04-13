<template>
  <div class="profile-section">
    <div class="profile-info">
      <div class="profile-name">
        <span class="user-icon">👤</span>
        {{ teacher.name }}
      </div>
      
      <div class="profile-position">{{ teacher.subject }} Teacher</div>
      
      <div class="profile-email">
        <span class="email-icon">✉️</span>
        {{ teacher.email }}
      </div>
      
      <div class="profile-actions">
        <span class="action-icon edit-icon" @click="$emit('edit-teacher', teacher)" title="Edit Teacher">✏️</span>
        <span class="action-icon print-icon" @click="printTeacherProfile" title="Print Profile">🖨️</span>
        
        <span 
          v-if="teacher.isActive" 
          class="action-icon toggle-icon" 
          @click="$emit('deactivate-teacher', teacher.id)" 
          title="Deactivate Teacher"
        >⚙️</span>
        
        <span 
          v-else 
          class="action-icon toggle-icon" 
          @click="$emit('activate-teacher', teacher.id)" 
          title="Activate Teacher"
        >⚙️</span>
      </div>
    </div>
    
    <div class="profile-stats">
      <div class="stats-title">
        <span class="chart-icon">📊</span>
        Stats
      </div>
      
      <div class="stats-content">
        <div class="stats-left">
          <div class="stat-item">
            <span class="stat-label">Assigned Classes</span>
            <span class="stat-value">{{ teacher.stats.assignedClasses }}</span>
          </div>
          
          <div class="stat-item">
            <span class="stat-label">Number of Students</span>
            <span class="stat-value">{{ teacher.stats.numberOfStudents }}</span>
          </div>
          
          <div class="stat-item">
            <span class="stat-label">Assigned VR Experiences</span>
            <span class="stat-value">{{ teacher.stats.assignedExperiences }}</span>
          </div>
        </div>
        
        <div class="stats-right">
          <div class="stat-item">
            <span class="stat-label">Average Students Score</span>
            <span class="stat-value">{{ teacher.stats.averageStudentsScore }}%</span>
          </div>
          
          <div class="stat-item">
            <span class="stat-label">Average Students Completion</span>
            <span class="stat-value">{{ teacher.stats.averageStudentsCompletion }}%</span>
          </div>
          
          <div class="stat-item">
            <span class="stat-label">Average Time per Experience</span>
            <span class="stat-value">{{ teacher.stats.averageTimePerExperience }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  teacher: {
    type: Object,
    required: true
  }
});

defineEmits(['edit-teacher', 'deactivate-teacher', 'activate-teacher']);

// Methods
const printTeacherProfile = () => {
  window.print();
};
</script>

<style scoped>
.profile-section {
  display: flex;
  margin-bottom: 20px;
}

.profile-info {
  flex: 1;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  margin-right: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.profile-name {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #3786d6;
  font-weight: bold;
  margin-bottom: 10px;
}

.user-icon {
  margin-right: 10px;
  font-size: 24px;
  color: #3786d6;
}

.profile-position {
  color: #666;
  margin-bottom: 15px;
  font-size: 14px;
}

.profile-email {
  display: flex;
  align-items: center;
  color: #666;
}

.email-icon {
  margin-right: 10px;
  color: #3786d6;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.action-icon {
  margin-left: 15px;
  cursor: pointer;
  font-size: 18px;
  transition: opacity 0.2s;
}

.action-icon:hover {
  opacity: 0.7;
}

.profile-stats {
  flex: 2;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.stats-title {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #3786d6;
  font-weight: bold;
  margin-bottom: 20px;
}

.chart-icon {
  margin-right: 10px;
  font-size: 24px;
}

.stats-content {
  display: flex;
  flex: 1;
}

.stats-left, .stats-right {
  flex: 1;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.stat-label {
  color: #666;
}

.stat-value {
  font-weight: bold;
  color: #333;
}

@media (max-width: 768px) {
  .profile-section {
    flex-direction: column;
  }
  
  .profile-info {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .stats-content {
    flex-direction: column;
  }
  
  .stats-left {
    margin-bottom: 15px;
  }
}
</style>