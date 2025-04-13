<template>
  <div class="filter-dropdown">
    <div class="filter-label">{{ label }}:</div>
    <div class="dropdown-container" @click="toggleDropdown" ref="dropdownRef">
      <div class="selected-value">{{ getSelectedLabel }}</div>
      <div class="dropdown-icon">▼</div>
      
      <div class="dropdown-options" v-if="isOpen">
        <div 
          v-for="option in options" 
          :key="option.value" 
          class="dropdown-option"
          :class="{ 'active': option.value === modelValue }"
          @click="selectOption(option.value)"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted, PropType } from 'vue';

interface DropdownOption {
  label: string;
  value: string;
}

export default defineComponent({
  name: 'FilterDropdown',
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array as PropType<DropdownOption[]>,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const isOpen = ref(false);
    const dropdownRef = ref<HTMLElement | null>(null);
    
    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };
    
    const selectOption = (value: string) => {
      emit('update:modelValue', value);
      isOpen.value = false;
    };
    
    const getSelectedLabel = computed(() => {
      const option = props.options.find(opt => opt.value === props.modelValue);
      return option ? option.label : '';
    });
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        isOpen.value = false;
      }
    };
    
    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });
    
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });
    
    return {
      isOpen,
      dropdownRef,
      toggleDropdown,
      selectOption,
      getSelectedLabel
    };
  }
});
</script>

<style scoped>
.filter-dropdown {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.filter-label {
  margin-right: 0.5rem;
  font-size: 0.875rem;
  color: #666;
}

.dropdown-container {
  position: relative;
  min-width: 150px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.selected-value {
  font-size: 0.875rem;
  font-weight: bold;
  color: #3786d6;
}

.dropdown-icon {
  font-size: 0.625rem;
  color: #666;
  margin-left: 0.5rem;
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  margin-top: 0.25rem;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown-option {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.dropdown-option:hover {
  background-color: #f3f4f6;
}

.dropdown-option.active {
  background-color: #4a90e2;
  color: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .filter-dropdown {
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 480px) {
  .dropdown-container {
    min-width: 100px;
    padding: 0.25rem 0.5rem;
  }
}
</style>