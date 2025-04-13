<template>
  <div class="dialog-overlay" v-if="modelValue" @click.self="closeDialog">
    <div class="dialog-container">
      <div class="dialog-header">
        <h2>Assign Class to {{ teacher ? teacher.name : 'Teacher' }}</h2>
        <button class="close-button" @click="closeDialog">×</button>
      </div>
      
      <div class="dialog-content">
        <div class="search-container">
          <input 
            type="text" 
            placeholder="Search classes..." 
            v-model="searchQuery"
            class="search-input"
          />
        </div>
        
        <!-- Grade filter buttons -->
        <div class="grade-filters">
          <button 
            v-for="grade in uniqueGrades" 
            :key="grade"
            class="grade-filter"
            :class="{ 'active': selectedGrade === grade }"
            @click="toggleGradeFilter(grade)"
          >
            {{ grade }}
          </button>
          <button 
            v-if="selectedGrade" 
            class="grade-filter clear"
            @click="selectedGrade = ''"
          >
            Clear Filter
          </button>
        </div>
        
        <div v-if="filteredClasses.length === 0" class="empty-state">
          No available classes found. All classes may already be assigned.
        </div>
        
        <div v-else class="classes-grid">
          <div
            v-for="classItem in filteredClasses"
            :key="classItem.id"
            class="class-item"
            @click="selectClass(classItem)"
            :class="{ 'selected': selectedClassId === classItem.id }"
            draggable="true"
            @dragstart="handleDragStart($event, classItem)"
          >
            <div class="class-header">
              <span class="class-name">{{ classItem.name }}</span>
              <span class="class-section">{{ classItem.grade }}</span>
            </div>
            <div class="class-details">
              <div class="class-subject">
                <span class="icon-subject">📚</span>
                {{ classItem.subject }}
              </div>
              <div class="class-students">
                <span class="icon-students">👨‍🎓</span>
                {{ classItem.studentCount }} Students
              </div>
              <div class="class-stats" v-if="classItem.avgScore">
                <div class="stat-item">
                  <span class="stat-label">Avg. Score:</span>
                  <span class="stat-value">{{ classItem.avgScore }}%</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Completion:</span>
                  <span class="stat-value">{{ classItem.completionRate }}%</span>
                </div>
              </div>
            </div>
            
            <div class="class-teacher" v-if="classItem.teacher">
              <span class="teacher-label">Currently assigned to:</span>
              <span class="teacher-name">{{ classItem.teacher }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="dialog-footer">
        <button class="cancel-button" @click="closeDialog">Cancel</button>
        <button 
          class="assign-button" 
          @click="assignClass"
          :disabled="!selectedClassId"
        >
          Assign Class
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  teacher: {
    type: Object,
    default: null
  },
  availableClasses: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue', 'assign']);

// Local state
const searchQuery = ref('');
const selectedClassId = ref('');
const selectedGrade = ref('');

// Reset selection when dialog opens/closes
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    selectedClassId.value = '';
    searchQuery.value = '';
    selectedGrade.value = '';
  }
});

// Computed properties
const uniqueGrades = computed(() => {
  const grades = new Set(props.availableClasses
    .map(cls => cls.grade)
    .filter(Boolean)); // Filter out undefined/null values
  return Array.from(grades).sort();
});

const filteredClasses = computed(() => {
  let result = props.availableClasses;
  
  // Apply grade filter
  if (selectedGrade.value) {
    result = result.filter(cls => cls.grade === selectedGrade.value);
  }
  
  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(cls => 
      cls.name.toLowerCase().includes(query) ||
      cls.subject.toLowerCase().includes(query) ||
      (cls.grade && cls.grade.toLowerCase().includes(query)) ||
      (cls.teacher && cls.teacher.toLowerCase().includes(query))
    );
  }
  
  return result.sort((a, b) => {
    // Sort by grade and then by name
    if (a.grade === b.grade) {
      return a.name.localeCompare(b.name);
    }
    return a.grade.localeCompare(b.grade);
  });
});

// Methods
const closeDialog = () => {
  emit('update:modelValue', false);
};

const toggleGradeFilter = (grade) => {
  selectedGrade.value = selectedGrade.value === grade ? '' : grade;
};

const selectClass = (classItem) => {
  selectedClassId.value = classItem.id;
};

const assignClass = () => {
  if (selectedClassId.value) {
    emit('assign', selectedClassId.value);
    closeDialog();
  }
};

const handleDragStart = (event, classItem) => {
  // Set data transfer for drag and drop
  event.dataTransfer.effectAllowed = 'copy';
  event.dataTransfer.setData('text/plain', JSON.stringify({
    type: 'new-class',
    id: classItem.id,
    name: classItem.name
  }));
  
  // Select the class that is being dragged
  selectedClassId.value = classItem.id;
  
  // Add visual feedback
  event.target.classList.add('dragging');
  
  // Add a custom drag image (optional)
  const dragImage = document.createElement('div');
  dragImage.className = 'drag-ghost';
  dragImage.textContent = classItem.name;
  document.body.appendChild(dragImage);
  event.dataTransfer.setDragImage(dragImage, 0, 0);
  
  // Remove the ghost element after a short delay
  setTimeout(() => {
    document.body.removeChild(dragImage);
  }, 0);
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.dialog-container {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  background-color: #3786d6;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-header h2 {
  margin: 0;
  font-size: 18px;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.dialog-content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.dialog-footer {
  padding: 15px 20px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.search-container {
  margin-bottom: 15px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.grade-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.grade-filter {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.grade-filter:hover {
  background-color: #e0e0e0;
}

.grade-filter.active {
  background-color: #3786d6;
  color: white;
  border-color: #3786d6;
}

.grade-filter.clear {
  background-color: #f5f5f5;
  color: #666;
}

.classes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.class-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #f9f9f9;
}

.class-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #3786d6;
}

.class-item.selected {
  background-color: #e6f0fc;
  border-color: #3786d6;
  box-shadow: 0 0 0 2px rgba(55, 134, 214, 0.3);
}

.class-item.dragging {
  opacity: 0.6;
}

.class-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.class-name {
  font-weight: bold;
  font-size: 16px;
  color: #3786d6;
}

.class-section {
  background-color: #3786d6;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.class-details {
  font-size: 14px;
  color: #666;
}

.class-subject, .class-students {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.icon-subject, .icon-students {
  margin-right: 5px;
}

.class-stats {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.stat-item {
  display: flex;
  align-items: center;
  font-size: 13px;
}

.stat-label {
  color: #888;
  margin-right: 5px;
}

.stat-value {
  font-weight: bold;
  color: #333;
}

.class-teacher {
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px dashed #ddd;
  font-size: 13px;
  color: #e88a8a;
}

.teacher-label {
  color: #888;
  margin-right: 5px;
}

.teacher-name {
  font-weight: bold;
}

.empty-state {
  padding: 20px;
  text-align: center;
  color: #666;
  font-style: italic;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-top: 10px;
}

.cancel-button {
  padding: 8px 15px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.assign-button {
  padding: 8px 15px;
  background-color: #3786d6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.assign-button:disabled {
  background-color: #9bbfe0;
  cursor: not-allowed;
}

/* Drag ghost element (not rendered in the DOM) */
.drag-ghost {
  position: absolute;
  top: -1000px;
  left: -1000px;
  padding: 8px 12px;
  background-color: #3786d6;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  pointer-events: none;
  z-index: -1;
}
</style>