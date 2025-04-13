<template>
  <div 
    class="vr-card" 
    :style="{ backgroundColor: backgroundColor }"
    :class="{ 'dragging': isDragging }"
  >
    <span 
      v-if="showRemove" 
      class="vr-card-remove" 
      @click="$emit('unassign', experience.id, experience.title)"
      title="Remove this experience"
    >×</span>
    <div class="vr-card-title">{{ experience.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  experience: {
    type: Object,
    required: true
  },
  isDragging: {
    type: Boolean,
    default: false
  },
  showRemove: {
    type: Boolean,
    default: true
  },
  backgroundColor: {
    type: String,
    default: '#666666'
  }
});

defineEmits(['unassign']);
</script>

<style scoped>
.vr-card {
  width: 150px;
  height: 120px;
  background-color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  color: white;
  position: relative;
  border-radius: 4px;
  cursor: grab;
  transition: transform 0.2s, box-shadow 0.2s;
}

.vr-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.vr-card.dragging {
  opacity: 0.6;
  transform: scale(0.95);
}

.vr-card-title {
  padding: 8px;
  text-align: center;
  width: 100%;
  font-size: 13px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 0 0 4px 4px;
}

.vr-card-remove {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #e88a8a;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  z-index: 1;
  transition: background-color 0.2s;
}

.vr-card-remove:hover {
  background-color: #e66767;
}
</style>