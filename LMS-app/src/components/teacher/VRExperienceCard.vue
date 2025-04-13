<template>
  <div class="vr-experience-card">
    <div class="card-header">
      <div class="thumbnail">Thumbnail</div>
      <div class="card-details">
        <div class="detail-row">
          <span class="detail-label">Estimated Duration</span>
          <span class="detail-value">{{ experience.duration }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">AVG Global Score</span>
          <span class="detail-value" :class="getScoreClass(experience.avgGlobalScore)">{{ experience.avgGlobalScore }}%</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">AVG Classes Score</span>
          <span class="detail-value" :class="getScoreClass(experience.avgClassesScore)">{{ experience.avgClassesScore }}%</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Class Assignments</span>
          <span class="detail-value">{{ experience.classAssignments }}</span>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-title">{{ experience.title }}</div>
      <div class="action-buttons">
        <button class="run-button">Run ▶</button>
        <button class="tool-button stats-button">👤</button>
        <button class="tool-button calendar-button">📅</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { VRExperience } from '../../stores/vrExperiences';

export default defineComponent({
  name: 'VRExperienceCard',
  props: {
    experience: {
      type: Object as PropType<VRExperience>,
      required: true
    }
  },
  setup() {
    const getScoreClass = (score: number) => {
      if (score >= 90) return 'high';
      if (score >= 80) return 'medium';
      return '';
    };
    
    return {
      getScoreClass
    };
  }
});
</script>

<style scoped>
.vr-experience-card {
  display: flex;
  flex-direction: column;
  background-color: #e6f0fc;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-right: 1rem;
  flex: 0 0 auto;
  width: 300px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  padding: 0.75rem;
  gap: 0.75rem;
}

.thumbnail {
  width: 100px;
  height: 80px;
  background-color: #d6e9ff;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3786d6;
  font-size: 0.75rem;
}

.card-details {
  flex: 1;
  font-size: 0.75rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.375rem;
}

.detail-label {
  color: #666;
}

.detail-value {
  font-weight: bold;
  color: #333;
}

.detail-value.high {
  color: #4caf50;
}

.detail-value.medium {
  color: #ff9800;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #d6e9ff;
}

.card-title {
  font-weight: bold;
  color: #3786d6;
}

.action-buttons {
  display: flex;
  gap: 0.375rem;
}

.thumbnail-label {
  font-size: 0.875rem;
}

.card-right {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.stats-container {
  display: flex;
  margin-bottom: 1rem;
}

.stat-item {
  margin-right: 1.5rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #4a7bb7;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-weight: 500;
  color: #2c5282;
}

.title-container {
  margin-bottom: 0.5rem;
}

.experience-title {
  color: #4a90e2;
  margin: 0;
  font-size: 1.25rem;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.run-button {
  background-color: #3786d6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.run-button:hover {
  background-color: #2a6eb6;
}

.play-icon {
  margin-left: 0.5rem;
  font-size: 0.75rem;
}

.tools {
  display: flex;
}

.tool-button {
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: #3786d6;
  color: white;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 0.5rem;
}

.circle-icon {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: #ffcc00;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar-icon {
  width: 1.5rem;
  height: 1.5rem;
  background-color: #cccccc;
  border-radius: 0.25rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .vr-experience-card {
    flex-direction: column;
  }
  
  .card-left {
    width: 100%;
    padding: 0.75rem;
  }
  
  .thumbnail {
    height: 80px;
  }
  
  .stats-container {
    flex-wrap: wrap;
  }
  
  .stat-item {
    width: 45%;
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 480px) {
  .stats-container {
    flex-direction: column;
  }
  
  .stat-item {
    width: 100%;
    margin-right: 0;
  }
  
  .action-bar {
    flex-direction: column;
  }
  
  .tools {
    margin-top: 0.5rem;
    justify-content: flex-end;
  }
}
</style>