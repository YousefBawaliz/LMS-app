<template>
  <div class="class-card" :class="{ 'dragging': isDragging, 'drag-over': isDragOver }">
    <div class="class-id">{{ classItem.name }}</div>
    
    <button 
      class="unassign-btn"
      @click="$emit('unassign', classItem.id, classItem.name)"
    >
      Unassign
    </button>
    
    <div class="class-count">
      <span class="student-icon">👨‍🎓</span>
      {{ classItem.studentCount }}
    </div>
    
    <div class="class-subject">
      <span class="book-icon">📚</span>
      {{ classItem.subject }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  classItem: {
    type: Object,
    required: true
  },
  isDragging: {
    type: Boolean,
    default: false
  },
  isDragOver: {
    type: Boolean,
    default: false
  }
});

defineEmits(['unassign']);
</script>

<style scoped>
.class-card {
  min-width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e6eff9;
  border-radius: 4px;
  padding: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.class-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.class-card.dragging {
  opacity: 0.6;
  transform: scale(0.95);
}

.class-card.drag-over {
  border: 2px dashed #3786d6;
  background-color: #d1e3f8;
}

.class-id {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #3786d6;
}

.class-count {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 14px;
}

.student-icon {
  margin-right: 5px;
}

.class-subject {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.book-icon {
  margin-right: 5px;
}

.unassign-btn {
  background-color: #e88a8a;
  color: white;
  border: none;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  margin: 5px 0;
  transition: background-color 0.2s;
}

.unassign-btn:hover {
  background-color: #e66767;
}
</style>