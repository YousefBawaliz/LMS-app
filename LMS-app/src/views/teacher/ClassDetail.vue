<template>
  <div class="class-detail-view">
    <!-- VR Experiences Section -->
    <section>
      <section-header title="VR Experiences" />
      <div class="experiences-container">
        <VRExperienceCard 
          v-for="experience in vrExperiences" 
          :key="experience.id" 
          :experience="experience" 
        />
      </div>
    </section>
    
    <!-- My Classes Section -->
    <section>
      <section-header title="My Classes" />
      <div class="classes-container">
        <router-link 
          v-for="classItem in classes" 
          :key="classItem.id" 
          :to="`/teacher/class/${classItem.id}`"
          class="class-link"
        >
          <class-card :class-data="classItem" />
        </router-link>
      </div>
    </section>
    
    <!-- Students Performance Section -->
    <section>
      <div class="filters-row">
        <search-bar @search="setSearchQuery" />
        <div class="dropdowns-container">
          <filter-dropdown 
            label="Class" 
            :options="classOptions" 
            v-model="selectedClass"
            @update:modelValue="updateClassFilter"
          />
          <filter-dropdown 
            label="Experience" 
            :options="experienceOptions" 
            v-model="selectedExperience"
            @update:modelValue="updateExperienceFilter"
          />
        </div>
      </div>
      
      <student-table 
        :students="filteredStudents" 
        :sort-field="sortField" 
        :sort-direction="sortDirection"
        @sort="handleSort"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import SectionHeader from '../../components/common/SectionHeader.vue';
import VRExperienceCard from '../../components/teacher/VRExperienceCard.vue';
import ClassCard from '../../components/teacher/ClassCard.vue';
import SearchBar from '../../components/common/SearchBar.vue';
import FilterDropdown from '../../components/common/FilterDropdown.vue';
import StudentTable from '../../components/teacher/StudentTable.vue';

import { useVRExperiencesStore } from '../../stores/vrExperiences';
import { useClassesStore } from '../../stores/classes';
import { useStudentsStore } from '../../stores/students';

export default defineComponent({
  name: 'ClassDetail',
  components: {
    SectionHeader,
    VRExperienceCard,
    ClassCard,
    SearchBar,
    FilterDropdown,
    StudentTable
  },
  setup() {
    const vrExperiencesStore = useVRExperiencesStore();
    const classesStore = useClassesStore();
    const studentsStore = useStudentsStore();
    
    // Fetch data
    onMounted(() => {
      vrExperiencesStore.fetchExperiences();
      classesStore.fetchClasses();
      studentsStore.fetchStudents();
    });
    
    // VR Experiences
    const vrExperiences = computed(() => vrExperiencesStore.experiences);
    
    // Classes
    const classes = computed(() => classesStore.classes);
    
    // Class filter options
    const classOptions = computed(() => {
      return classesStore.classes.map(cls => ({
        label: cls.name,
        value: cls.id
      }));
    });
    
    // Experience filter options
    const experienceOptions = computed(() => {
      return vrExperiencesStore.experiences.map(exp => ({
        label: exp.title,
        value: exp.id
      }));
    });
    
    // Selected filters - Initialize with first option or empty string
    const selectedClass = ref(studentsStore.classFilter || '');
    const selectedExperience = ref(studentsStore.experienceFilter || '');
    
    // Initialize filters when options are available
    watch(experienceOptions, (newOptions) => {
      if (newOptions.length > 0 && !selectedExperience.value) {
        selectedExperience.value = newOptions[0].value;
      }
    }, { immediate: true });

    watch(classOptions, (newOptions) => {
      if (newOptions.length > 0 && !selectedClass.value) {
        selectedClass.value = newOptions[0].value;
      }
    }, { immediate: true });
    
    // Sorting
    const sortField = computed(() => studentsStore.sortField);
    const sortDirection = computed(() => studentsStore.sortDirection);
    
    // Filtered students
    const filteredStudents = computed(() => studentsStore.filteredStudents);
    
    // Methods
    const setSearchQuery = (query: string) => {
      studentsStore.setSearchQuery(query);
    };
    
    const updateClassFilter = (classId: string) => {
      studentsStore.setClassFilter(classId);
    };
    
    const updateExperienceFilter = (experienceId: string) => {
      studentsStore.setExperienceFilter(experienceId);
    };
    
    const handleSort = (field: string, direction: 'asc' | 'desc') => {
      studentsStore.sortField = field;
      studentsStore.sortDirection = direction;
      studentsStore.applyFilters();
    };
    
    return {
      vrExperiences,
      classes,
      classOptions,
      experienceOptions,
      selectedClass,
      selectedExperience,
      filteredStudents,
      sortField,
      sortDirection,
      setSearchQuery,
      updateClassFilter,
      updateExperienceFilter,
      handleSort
    };
  }
});
</script>

<style scoped>
.class-detail-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

section {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.experiences-container {
  padding: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  overflow-x: auto;
}

.classes-container {
  padding: 1rem;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
}

.class-link {
  text-decoration: none;
  color: inherit;
  flex: 0 0 auto;
  width: 350px;
}

.filters-row {
  padding: 0 0 1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.search-wrapper {
  flex: 1;
}

.dropdowns-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .class-link {
    width: 280px;
  }
}

@media (max-width: 768px) {
  .filters-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .dropdowns-container {
    justify-content: space-between;
  }
  
  .class-link {
    width: 100%;
    max-width: 350px;
  }
}

@media (max-width: 480px) {
  .experiences-container, 
  .classes-container,
  .filters-row {
    padding: 0.5rem;
  }
}
</style>
