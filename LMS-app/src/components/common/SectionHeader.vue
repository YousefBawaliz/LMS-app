<template>
  <div class="section-header">
    <h2 class="section-title">{{ title }}</h2>
    <button class="add-button">
      +
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SectionHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3786d6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem 0.25rem 0 0;
  margin-bottom: 0;
}

.section-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
}

.add-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  background-color: transparent;
  color: white;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.add-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .section-title {
    font-size: 1rem;
  }
  
  .add-button {
    width: 1.25rem;
    height: 1.25rem;
    font-size: 1rem;
  }
}
</style>