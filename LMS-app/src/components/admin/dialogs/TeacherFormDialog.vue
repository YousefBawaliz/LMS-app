<template>
  <div class="dialog-overlay" v-if="modelValue" @click.self="closeDialog">
    <div class="dialog-container">
      <div class="dialog-header">
        <h2>{{ title }}</h2>
        <button class="close-button" @click="closeDialog">×</button>
      </div>
      
      <div class="dialog-content">
        <div class="form-group">
          <label for="teacher-name">Name</label>
          <input 
            id="teacher-name" 
            type="text" 
            v-model="formData.name"
            placeholder="Enter teacher's name"
          />
        </div>
        
        <div class="form-group">
          <label for="teacher-email">Email</label>
          <input 
            id="teacher-email" 
            type="email" 
            v-model="formData.email"
            placeholder="Enter teacher's email"
          />
        </div>
        
        <div class="form-group">
          <label for="teacher-subject">Subject</label>
          <select id="teacher-subject" v-model="formData.subject">
            <option value="">Select a subject</option>
            <option v-for="subject in subjects" :key="subject" :value="subject">
              {{ subject }}
            </option>
          </select>
        </div>
        
        <div class="form-group checkbox-group" v-if="isEditMode">
          <label class="checkbox-label">
            <input type="checkbox" v-model="formData.isActive" />
            Active Status
          </label>
        </div>
      </div>
      
      <div class="dialog-footer">
        <button class="cancel-button" @click="closeDialog">Cancel</button>
        <button 
          class="save-button" 
          @click="saveTeacher"
          :disabled="!isFormValid"
        >
          Save
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
    default: () => ({
      name: '',
      email: '',
      subject: '',
      isActive: true
    })
  },
  title: {
    type: String,
    default: 'Teacher Form'
  }
});

const emit = defineEmits(['update:modelValue', 'save']);

// Available subjects
const subjects = [
  'Chemistry',
  'Physics',
  'Biology',
  'Math',
  'English',
  'History',
  'Computer Science',
  'Art',
  'Music',
  'Physical Education'
];

// Form data
const formData = ref({
  id: '',
  name: '',
  email: '',
  subject: '',
  isActive: true
});

// Check if we're in edit mode
const isEditMode = computed(() => !!props.teacher.id);

// Initialize form with teacher data when dialog opens
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen && props.teacher) {
      formData.value = { ...props.teacher };
    }
  }
);

// Watch for changes to teacher prop
watch(
  () => props.teacher,
  (newTeacher) => {
    if (props.modelValue && newTeacher) {
      formData.value = { ...newTeacher };
    }
  }
);

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return (
    formData.value.name.trim() !== '' &&
    formData.value.email.trim() !== '' &&
    formData.value.subject.trim() !== ''
  );
});

// Methods
const closeDialog = () => {
  emit('update:modelValue', false);
};

const saveTeacher = () => {
  if (isFormValid.value) {
    emit('save', { ...formData.value });
    closeDialog();
  }
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
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
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
}

.dialog-footer {
  padding: 15px 20px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-label input {
  width: auto;
}

.cancel-button {
  padding: 8px 15px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.save-button {
  padding: 8px 15px;
  background-color: #3786d6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-button:disabled {
  background-color: #9bbfe0;
  cursor: not-allowed;
}
</style>