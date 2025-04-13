<template>
  <div class="vr-experiences-assignment">
    <!-- Assigned VR Experiences Section -->
    <div class="vr-section assigned-section">
      <div class="vr-tabs">
        <div class="vr-tab active">Assigned</div>
      </div>
      
      <div class="vr-assigned" 
           @dragover.prevent="handleDragOver" 
           @drop.prevent="handleDrop">
        
        <div v-if="assignedExperiences.length === 0" class="empty-state">
          No VR Experiences assigned yet. Drag experiences from below to assign them.
        </div>
        
        <div v-else class="vr-cards">
          <div 
            v-for="experience in assignedExperiences" 
            :key="experience.id"
            class="vr-card"
            :style="{ backgroundColor: getRandomGrayColor(experience.id) }"
          >
            <span 
              class="vr-card-remove" 
              @click="$emit('unassign-experience', experience.id, experience.title)"
              title="Remove this experience"
            >×</span>
            <div class="vr-card-title">{{ experience.title }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Available VR Experiences Section -->
    <div class="vr-section">
      <div class="vr-tabs">
        <div class="vr-tab active">Available</div>
      </div>
      
      <div class="vr-instructions">
        <span>Drag items to assign them</span>
        <span class="icon-arrow-up">↑</span>
      </div>
      
      <!-- Category filters -->
      <div class="vr-subjects">
        <div 
          v-for="category in uniqueCategories" 
          :key="category"
          class="vr-subject"
          :class="{ 'active': selectedCategory === category }"
          @click="selectedCategory = category === selectedCategory ? '' : category"
        >
          {{ category }}
        </div>
      </div>
      
      <!-- Available experiences -->
      <div v-if="filteredUnassignedExperiences.length === 0" class="empty-state">
        No available VR experiences found.
      </div>
      
      <div v-else class="vr-cards">
        <div 
          v-for="experience in filteredUnassignedExperiences" 
          :key="experience.id"
          class="vr-card"
          :style="{ backgroundColor: getRandomGrayColor(experience.id) }"
          draggable="true"
          @dragstart="handleDragStart($event, experience)"
          @dragend="handleDragEnd"
        >
          <div class="vr-card-title">{{ experience.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  teacher: {
    type: Object,
    required: true
  },
  allExperiences: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['unassign-experience', 'assign-experience']);

// Local state
const selectedCategory = ref('');

// Computed properties
const assignedExperiences = computed(() => {
  return props.allExperiences.filter(exp => 
    props.teacher.assignedExperiences.includes(exp.title)
  );
});

const unassignedExperiences = computed(() => {
  return props.allExperiences.filter(exp => 
    !props.teacher.assignedExperiences.includes(exp.title)
  );
});

const filteredUnassignedExperiences = computed(() => {
  if (!selectedCategory.value) {
    return unassignedExperiences.value;
  }
  return unassignedExperiences.value.filter(exp => 
    exp.category === selectedCategory.value
  );
});

const uniqueCategories = computed(() => {
  const categories = new Set(props.allExperiences.map(exp => exp.category));
  return Array.from(categories);
});

// Methods
const getRandomGrayColor = (id) => {
  // Generate a consistent gray shade based on the id
  const hash = id.toString().split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const gray = Math.abs(hash) % 50 + 75; // 75-125 range for darker grays
  return `rgb(${gray}, ${gray}, ${gray})`;
};

// Drag and drop handlers
const handleDragStart = (event, experience) => {
  // Set data transfer
  event.dataTransfer.effectAllowed = 'copy';
  event.dataTransfer.setData('text/plain', JSON.stringify({
    type: 'vr-experience',
    id: experience.id,
    title: experience.title
  }));
  
  // Add a class to indicate dragging
  event.target.classList.add('dragging');
};

const handleDragEnd = (event) => {
  // Remove the dragging class
  event.target.classList.remove('dragging');
};

const handleDragOver = (event) => {
  // Allow drop
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
  
  // Highlight drop area
  event.currentTarget.classList.add('drag-over');
};

const handleDrop = (event) => {
  // Remove highlight
  event.currentTarget.classList.remove('drag-over');
  
  try {
    // Get data from the drop
    const data = JSON.parse(event.dataTransfer.getData('text/plain'));
    
    if (data.type === 'vr-experience') {
      // Assign experience to teacher
      emit('assign-experience', data.id, data.title);
    }
  } catch (error) {
    console.error('Error processing drop:', error);
  }
};
</script>

<style scoped>
.vr-experiences-assignment {
  margin-bottom: 20px;
}

.vr-section {
  margin-bottom: 20px;
}

.vr-tabs {
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}

.vr-tab {
  padding: 8px 15px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.vr-tab.active {
  border-bottom: 2px solid #3786d6;
  color: #3786d6;
  font-weight: bold;
}

.vr-assigned {
  border: 1px dashed #3786d6;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
  min-height: 150px;
  transition: background-color 0.2s;
}

.vr-assigned.drag-over {
  background-color: rgba(55, 134, 214, 0.1);
}

.vr-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

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
  transition: transform 0.2s;
}

.vr-card:hover {
  transform: translateY(-3px);
}

.vr-card.dragging {
  opacity: 0.6;
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
}

.vr-instructions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #3786d6;
  margin-bottom: 10px;
  font-size: 14px;
}

.icon-arrow-up {
  margin-left: 5px;
}

.vr-subjects {
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0;
  gap: 5px;
}

.vr-subject {
  padding: 6px 12px;
  background-color: #7eb1e8;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.vr-subject:hover {
  background-color: #3786d6;
}

.vr-subject.active {
  background-color: #3786d6;
  font-weight: bold;
}

.empty-state {
  padding: 30px;
  text-align: center;
  color: #666;
  font-style: italic;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 4px;
}
</style>