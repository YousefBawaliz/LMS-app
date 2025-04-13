<template>
  <div class="classes-assignment">
    <div class="classes-grid" 
         @dragover.prevent="handleDragOver"
         @drop.prevent="handleDrop">
      
      <!-- Add Class Card -->
      <div class="class-card add-class-card" @click="$emit('assign-class')">
        <div class="add-class-content">
          <span class="add-icon">+</span>
          <div>Assign</div>
          <div>Class</div>
        </div>
      </div>
      
      <!-- Assigned Classes -->
      <div
        v-for="classItem in assignedClassesData"
        :key="classItem.id"
        class="class-card"
        :class="{ 'drag-over': dragOverClassId === classItem.id }"
        draggable="true"
        @dragstart="handleDragStart($event, classItem)"
        @dragend="handleDragEnd"
        :data-id="classItem.id"
      >
        <div class="class-id">{{ classItem.name }}</div>
        
        <button 
          class="unassign-btn"
          @click="$emit('unassign-class', classItem.id, classItem.name)"
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
      
      <!-- Empty state when no classes are assigned -->
      <div v-if="assignedClassesData.length === 0 && !isDraggingNewClass" class="empty-state">
        No classes assigned to this teacher. Click the "Assign Class" card to assign a class.
      </div>
    </div>
    
    <!-- Drag & Drop Instructions when needed -->
    <div v-if="isDraggingNewClass" class="drag-instructions">
      <div class="instruction-text">Drag classes to assign them to this teacher</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  teacher: {
    type: Object,
    required: true
  },
  allClasses: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['unassign-class', 'assign-class']);

// Local state
const isDraggingNewClass = ref(false);
const dragOverClassId = ref(null);
const draggedClassId = ref(null);

// Computed properties
const assignedClassesData = computed(() => {
  // Map assigned class names to full class objects
  return props.allClasses.filter(cls => 
    props.teacher.assignedClasses.includes(cls.name)
  );
});

// Drag and drop handlers
const handleDragStart = (event, classItem) => {
  // Set data transfer
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', JSON.stringify({
    type: 'class',
    id: classItem.id,
    name: classItem.name
  }));
  
  draggedClassId.value = classItem.id;
  
  // Add dragging class to element
  event.target.classList.add('dragging');
};

const handleDragEnd = (event) => {
  // Reset state
  draggedClassId.value = null;
  dragOverClassId.value = null;
  
  // Remove dragging class
  if (event.target.classList) {
    event.target.classList.remove('dragging');
  }
};

const handleDragOver = (event) => {
  // Allow drop
  event.preventDefault();
  
  // Get the class element that is being dragged over
  const classCard = event.target.closest('.class-card');
  if (classCard && classCard.dataset.id) {
    dragOverClassId.value = classCard.dataset.id;
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  
  try {
    // Get data from the drop
    const data = JSON.parse(event.dataTransfer.getData('text/plain'));
    
    if (data.type === 'class') {
      // This is a class being rearranged (not implemented yet)
      console.log('Rearranging class:', data);
    } else if (data.type === 'new-class') {
      // This is a new class being assigned
      emit('assign-class', data.id, data.name);
    }
  } catch (error) {
    console.error('Error processing drop:', error);
  }
  
  // Reset state
  dragOverClassId.value = null;
  isDraggingNewClass.value = false;
};

// Global drag event handlers
const handleGlobalDragStart = (event) => {
  const dataTransfer = event.dataTransfer;
  if (dataTransfer && dataTransfer.types.includes('text/plain')) {
    try {
      const data = JSON.parse(dataTransfer.getData('text/plain'));
      if (data.type === 'new-class') {
        isDraggingNewClass.value = true;
      }
    } catch (error) {
      // Not our data, ignore
    }
  }
};

const handleGlobalDragEnd = () => {
  isDraggingNewClass.value = false;
};

// Lifecycle hooks
onMounted(() => {
  // Listen for global drag events to detect when new classes are being dragged
  document.addEventListener('dragstart', handleGlobalDragStart);
  document.addEventListener('dragend', handleGlobalDragEnd);
});

onBeforeUnmount(() => {
  // Clean up event listeners
  document.removeEventListener('dragstart', handleGlobalDragStart);
  document.removeEventListener('dragend', handleGlobalDragEnd);
});
</script>

<style scoped>
.classes-assignment {
  margin-bottom: 20px;
}

.classes-grid {
  display: flex;
  overflow-x: auto;
  padding-bottom: 10px;
  min-height: 150px;
}

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

.add-class-card {
  background-color: #7eb1e8;
  color: white;
  cursor: pointer;
}

.add-class-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.add-icon {
  font-size: 24px;
  margin-bottom: 5px;
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

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 150px;
  background-color: #f5f5f5;
  border-radius: 4px;
  color: #666;
  font-style: italic;
  padding: 0 20px;
  text-align: center;
}

.drag-instructions {
  margin-top: 10px;
  padding: 10px;
  background-color: #e6f0fc;
  border-radius: 4px;
  text-align: center;
  color: #3786d6;
  font-size: 14px;
  border: 1px dashed #3786d6;
}
</style>