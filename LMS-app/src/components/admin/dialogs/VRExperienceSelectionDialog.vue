<template>
  <div class="dialog-overlay" v-if="modelValue" @click.self="closeDialog">
    <div class="dialog-container">
      <div class="dialog-header">
        <h2>Assign VR Experience to {{ teacher ? teacher.name : 'Teacher' }}</h2>
        <button class="close-button" @click="closeDialog">×</button>
      </div>
      
      <div class="dialog-content">
        <!-- Search and Filters -->
        <div class="filters-container">
          <div class="search-container">
            <input 
              type="text" 
              placeholder="Search experiences..." 
              v-model="searchQuery"
              class="search-input"
            />
          </div>
          
          <div class="category-filters">
            <div 
              v-for="category in uniqueCategories" 
              :key="category"
              class="category-filter"
              :class="{ 'active': selectedCategory === category }"
              @click="toggleCategory(category)"
            >
              {{ category }}
            </div>
          </div>
        </div>
        
        <!-- VR Experiences List -->
        <div v-if="filteredExperiences.length === 0" class="empty-state">
          No available VR experiences found.
        </div>
        
        <div v-else class="experiences-grid">
          <div
            v-for="experience in filteredExperiences"
            :key="experience.id"
            class="experience-item"
            @click="selectExperience(experience)"
            :class="{ 'selected': selectedExperienceId === experience.id }"
          >
            <div 
              class="experience-thumbnail" 
              :style="{ backgroundColor: getRandomGrayColor(experience.id) }"
            ></div>
            
            <div class="experience-details">
              <div class="experience-title">{{ experience.title }}</div>
              
              <div class="experience-meta">
                <div class="experience-duration">
                  <span class="icon-time">⏱️</span>
                  {{ experience.duration }}
                </div>
                
                <div class="experience-category">
                  <span class="icon-category">🔬</span>
                  {{ experience.category }}
                </div>
              </div>
              
              <div class="experience-scores">
                <div class="score-item">
                  <span class="score-label">Global:</span>
                  <span class="score-value">{{ experience.avgGlobalScore }}%</span>
                </div>
                
                <div class="score-item">
                  <span class="score-label">Classes:</span>
                  <span class="score-value">{{ experience.avgClassesScore }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="dialog-footer">
        <button class="cancel-button" @click="closeDialog">Cancel</button>
        <button 
          class="assign-button" 
          @click="assignExperience"
          :disabled="!selectedExperienceId"
        >
          Assign Experience
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
  availableExperiences: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue', 'assign']);

// Local state
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedExperienceId = ref('');

// Reset selection when dialog opens/closes
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    selectedExperienceId.value = '';
    searchQuery.value = '';
    selectedCategory.value = '';
  }
});

// Computed properties
const uniqueCategories = computed(() => {
  const categories = new Set(props.availableExperiences.map(exp => exp.category));
  return Array.from(categories);
});

const filteredExperiences = computed(() => {
  let result = props.availableExperiences;
  
  // Apply category filter
  if (selectedCategory.value) {
    result = result.filter(exp => exp.category === selectedCategory.value);
  }
  
  // Apply search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(exp => 
      exp.title.toLowerCase().includes(query) ||
      exp.description?.toLowerCase().includes(query) ||
      exp.category.toLowerCase().includes(query)
    );
  }
  
  return result;
});

// Methods
const closeDialog = () => {
  emit('update:modelValue', false);
};

const toggleCategory = (category) => {
  selectedCategory.value = selectedCategory.value === category ? '' : category;
};

const selectExperience = (experience) => {
  selectedExperienceId.value = experience.id;
};

const assignExperience = () => {
  if (selectedExperienceId.value) {
    emit('assign', selectedExperienceId.value);
    closeDialog();
  }
};

const getRandomGrayColor = (id) => {
  // Generate a consistent gray shade based on the id
  const hash = id.toString().split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const gray = Math.abs(hash) % 50 + 75; // 75-125 range for darker grays
  return `rgb(${gray}, ${gray}, ${gray})`;
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
  max-width: 800px;
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

.filters-container {
  margin-bottom: 20px;
}

.search-container {
  margin-bottom: 10px;
}

.search-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.category-filter {
  padding: 6px 12px;
  background-color: #7eb1e8;
  color: white;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.category-filter:hover {
  background-color: #3786d6;
}

.category-filter.active {
  background-color: #3786d6;
  font-weight: bold;
}

.experiences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 15px;
}

.experience-item {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #fff;
}

.experience-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #3786d6;
}

.experience-item.selected {
  background-color: #e6f0fc;
  border-color: #3786d6;
  box-shadow: 0 0 0 2px rgba(55, 134, 214, 0.3);
}

.experience-thumbnail {
  width: 100px;
  background-color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.experience-details {
  flex: 1;
  padding: 12px;
}

.experience-title {
  font-weight: bold;
  color: #3786d6;
  margin-bottom: 5px;
  font-size: 16px;
}

.experience-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
}

.experience-duration, .experience-category {
  display: flex;
  align-items: center;
}

.icon-time, .icon-category {
  margin-right: 5px;
  font-size: 14px;
}

.experience-scores {
  display: flex;
  gap: 15px;
  font-size: 13px;
}

.score-item {
  display: flex;
  align-items: center;
}

.score-label {
  color: #666;
  margin-right: 5px;
}

.score-value {
  font-weight: bold;
  color: #333;
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
</style>