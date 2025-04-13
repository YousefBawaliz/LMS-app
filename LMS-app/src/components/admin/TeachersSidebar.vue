<template>
  <div class="teachers-sidebar">
    <SectionHeader title="Teachers" @add-clicked="$emit('add-teacher')" />
    
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search Teachers"
        v-model="localSearchQuery"
        @input="handleSearchInput"
      />
    </div>
    
    <div class="teachers-list">
      <!-- Active Teachers -->
      <div class="teachers-items">
        <div
          v-for="teacher in filteredTeachers"
          :key="teacher.id"
          class="teacher-item"
          :class="{ 'active': teacher.id === selectedTeacherId }"
          @click="selectTeacher(teacher.id)"
        >
          {{ teacher.name }}
        </div>
        <div v-if="filteredTeachers.length === 0" class="empty-state">
          No teachers found
        </div>
      </div>
      
      <!-- Deactivated Teachers -->
      <div class="deactivated-section">
        <div 
          class="deactivated-header" 
          @click="isDeactivatedExpanded = !isDeactivatedExpanded"
        >
          Deactivated Teachers
          <span class="caret-icon">{{ isDeactivatedExpanded ? '▼' : '▶' }}</span>
        </div>
        
        <div v-if="isDeactivatedExpanded">
          <div
            v-for="teacher in filteredDeactivatedTeachers"
            :key="teacher.id"
            class="deactivated-item"
            :class="{ 'active': teacher.id === selectedTeacherId }"
            @click="selectTeacher(teacher.id)"
          >
            {{ teacher.name }}
          </div>
          <div v-if="filteredDeactivatedTeachers.length === 0" class="empty-state">
            No deactivated teachers found
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import SectionHeader from '../common/SectionHeader.vue';

const props = defineProps({
  teachers: {
    type: Array,
    required: true
  },
  deactivatedTeachers: {
    type: Array,
    required: true
  },
  selectedTeacherId: {
    type: String,
    default: ''
  },
  searchQuery: {
    type: String,
    default: ''
  }
});

const emit = defineEmits([
  'select-teacher', 
  'set-search-query', 
  'add-teacher', 
  'toggle-deactivated'
]);

// Local state
const isDeactivatedExpanded = ref(false);
const localSearchQuery = ref(props.searchQuery);

// Watch for external search query changes
watch(() => props.searchQuery, (newQuery) => {
  localSearchQuery.value = newQuery;
});

// Computed properties
const filteredTeachers = computed(() => {
  if (!localSearchQuery.value.trim()) return props.teachers;
  
  const query = localSearchQuery.value.toLowerCase();
  return props.teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(query) || 
    teacher.email.toLowerCase().includes(query) ||
    teacher.subject.toLowerCase().includes(query)
  );
});

const filteredDeactivatedTeachers = computed(() => {
  if (!localSearchQuery.value.trim()) return props.deactivatedTeachers;
  
  const query = localSearchQuery.value.toLowerCase();
  return props.deactivatedTeachers.filter(teacher => 
    teacher.name.toLowerCase().includes(query) || 
    teacher.email.toLowerCase().includes(query) ||
    teacher.subject.toLowerCase().includes(query)
  );
});

// Methods
const selectTeacher = (teacherId) => {
  emit('select-teacher', teacherId);
};

const handleSearchInput = () => {
  emit('set-search-query', localSearchQuery.value);
};

const toggleDeactivatedSection = () => {
  isDeactivatedExpanded.value = !isDeactivatedExpanded.value;
  emit('toggle-deactivated', isDeactivatedExpanded.value);
};
</script>

<style scoped>
.teachers-sidebar {
  width: 230px;
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.teachers-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
}

.search-box {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 8px;
  border-radius: 4px;
}

.search-icon {
  color: #666;
  margin-right: 8px;
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
}

.teachers-items {
  background-color: #3786d6;
  color: white;
  flex: 1;
}

.teacher-item {
  padding: 12px 15px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.teacher-item:hover {
  background-color: #2863a0;
}

.teacher-item.active {
  background-color: #2863a0;
  font-weight: bold;
}

.deactivated-section {
  margin-top: auto;
  background-color: #3786d6;
  color: white;
}

.deactivated-header {
  padding: 12px 15px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.deactivated-header:hover {
  background-color: #2863a0;
}

.caret-icon {
  font-size: 10px;
}

.deactivated-item {
  padding: 12px 15px;
  cursor: pointer;
  background-color: #4a91d7;
}

.deactivated-item:hover {
  background-color: #2863a0;
}

.deactivated-item.active {
  background-color: #2863a0;
  font-weight: bold;
}

.empty-state {
  padding: 12px 15px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
}
</style>