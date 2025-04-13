<template>
  <div class="search-container">
    <div class="search-input-wrapper">
      <div class="search-icon"></div>
      <input 
        type="text" 
        class="search-input" 
        placeholder="Search" 
        v-model="searchQuery"
        @input="emitSearch"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SearchBar',
  props: {
    placeholder: {
      type: String,
      default: 'Search'
    }
  },
  setup(props, { emit }) {
    const searchQuery = ref('');
    
    const emitSearch = () => {
      emit('search', searchQuery.value);
    };
    
    return {
      searchQuery,
      emitSearch
    };
  }
});
</script>

<style scoped>
.search-container {
  margin-bottom: 0;
  width: 100%;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 100%;
}

.search-icon {
  width: 1rem;
  height: 1rem;
  background-color: #9ca3af;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.875rem;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .search-input-wrapper {
    padding: 0.375rem;
  }
}
</style>