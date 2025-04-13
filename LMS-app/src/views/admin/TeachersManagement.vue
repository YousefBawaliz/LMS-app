<template>
  <div class="teachers-management">
    <!-- Main layout with sidebar and content -->
    <div class="container">
      <!-- Teachers sidebar -->
      <TeachersSidebar
        :teachers="activeTeachers"
        :deactivated-teachers="deactivatedTeachers"
        :selected-teacher-id="selectedTeacherId"
        :search-query="searchQuery"
        @select-teacher="selectTeacher"
        @set-search-query="setSearchQuery"
        @add-teacher="addNewTeacher"
        @toggle-deactivated="toggleDeactivatedVisible"
      />

      <!-- Main content area -->
      <div class="main-content" v-if="selectedTeacher">
        <!-- Profile Section -->
        <SectionHeader title="Profile" @add-clicked="showAddTeacherDialog = true" />

        <TeacherProfile
          :teacher="selectedTeacher"
          @edit-teacher="openEditTeacherDialog"
          @deactivate-teacher="deactivateTeacher"
          @activate-teacher="activateTeacher"
        />

        <!-- Classes Assignment Section -->
        <SectionHeader title="Classes Assignment" @add-clicked="openAssignClassDialog" />

        <ClassesAssignment
          :teacher="selectedTeacher"
          :all-classes="allClasses"
          @unassign-class="unassignClass"
          @assign-class="assignClass"
        />

        <!-- VR Experiences Assignment Section -->
        <SectionHeader title="VR Experiences Assignment" @add-clicked="openAssignVRExperienceDialog" />

        <VRExperiencesAssignment
          :teacher="selectedTeacher"
          :all-experiences="allExperiences"
          @unassign-experience="unassignExperience"
          @assign-experience="assignExperience"
        />
      </div>

      <div class="main-content" v-else>
        <div class="no-selection">
          <p>Please select a teacher from the sidebar or add a new teacher.</p>
        </div>
      </div>
    </div>

    <!-- Dialogs -->
    <TeacherFormDialog
      v-model="showAddTeacherDialog"
      :teacher="newTeacher"
      title="Add New Teacher"
      @save="saveNewTeacher"
    />

    <TeacherFormDialog
      v-model="showEditTeacherDialog"
      :teacher="selectedTeacher"
      title="Edit Teacher"
      @save="updateTeacher"
    />

    <ClassSelectionDialog
      v-model="showAssignClassDialog"
      :teacher="selectedTeacher"
      :available-classes="availableClasses"
      @assign="assignSelectedClass"
    />

    <VRExperienceSelectionDialog
      v-model="showAssignVRExperienceDialog"
      :teacher="selectedTeacher"
      :available-experiences="availableExperiences"
      @assign="assignSelectedExperience"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTeachersStore } from '../../stores/teachers';
import { useClassesStore } from '../../stores/classes';
import { useVRExperiencesStore } from '../../stores/vrExperiences';

// Components
import TeachersSidebar from '../../components/admin/TeachersSidebar.vue';
import TeacherProfile from '../../components/admin/TeacherProfile.vue';
import ClassesAssignment from '../../components/admin/ClassesAssignment.vue';
import VRExperiencesAssignment from '../../components/admin/VRExperiencesAssignment.vue';
import SectionHeader from '../../components/common/SectionHeader.vue';
import TeacherFormDialog from '../../components/admin/dialogs/TeacherFormDialog.vue';
import ClassSelectionDialog from '../../components/admin/dialogs/ClassSelectionDialog.vue';
import VRExperienceSelectionDialog from '../../components/admin/dialogs/VRExperienceSelectionDialog.vue';

// Initialize stores
const teachersStore = useTeachersStore();
const classesStore = useClassesStore();
const vrExperiencesStore = useVRExperiencesStore();

// Local state
const selectedTeacherId = ref('');
const searchQuery = ref('');
const showDeactivatedTeachers = ref(false);
const showAddTeacherDialog = ref(false);
const showEditTeacherDialog = ref(false);
const showAssignClassDialog = ref(false);
const showAssignVRExperienceDialog = ref(false);
const newTeacher = ref({
  name: '',
  email: '',
  subject: '',
  assignedClasses: [],
  assignedExperiences: [],
  stats: {
    assignedClasses: 0,
    numberOfStudents: 0,
    assignedExperiences: 0,
    averageStudentsScore: 0,
    averageStudentsCompletion: 0,
    averageTimePerExperience: '0 minutes'
  },
  isActive: true
});

// Computed properties
const activeTeachers = computed(() => teachersStore.activeTeachers);
const deactivatedTeachers = computed(() => teachersStore.deactivatedTeachers);

const selectedTeacher = computed(() =>
  teachersStore.teachers.find(t => t.id === selectedTeacherId.value) || null
);

const allClasses = computed(() => classesStore.classes);
const allExperiences = computed(() => vrExperiencesStore.experiences);

const availableClasses = computed(() => {
  if (!selectedTeacher.value) return [];

  return allClasses.value.filter(cls =>
    !selectedTeacher.value.assignedClasses.includes(cls.name)
  );
});

const availableExperiences = computed(() => {
  if (!selectedTeacher.value) return [];

  return allExperiences.value.filter(exp =>
    !selectedTeacher.value.assignedExperiences.includes(exp.title)
  );
});

// Methods
const selectTeacher = (teacherId) => {
  selectedTeacherId.value = teacherId;
};

const setSearchQuery = (query) => {
  searchQuery.value = query;
  teachersStore.setSearchQuery(query);
};

const toggleDeactivatedVisible = () => {
  showDeactivatedTeachers.value = !showDeactivatedTeachers.value;
};

const addNewTeacher = () => {
  newTeacher.value = {
    name: '',
    email: '',
    subject: '',
    assignedClasses: [],
    assignedExperiences: [],
    stats: {
      assignedClasses: 0,
      numberOfStudents: 0,
      assignedExperiences: 0,
      averageStudentsScore: 0,
      averageStudentsCompletion: 0,
      averageTimePerExperience: '0 minutes'
    },
    isActive: true
  };
  showAddTeacherDialog.value = true;
};

const saveNewTeacher = async (teacher) => {
  const createdTeacher = await teachersStore.createTeacher(teacher);
  if (createdTeacher) {
    selectedTeacherId.value = createdTeacher.id;
    showAddTeacherDialog.value = false;
  }
};

const openEditTeacherDialog = () => {
  showEditTeacherDialog.value = true;
};

const updateTeacher = async (teacher) => {
  await teachersStore.updateTeacher(teacher.id, teacher);
  showEditTeacherDialog.value = false;
};

const deactivateTeacher = async (teacherId) => {
  if (confirm('Are you sure you want to deactivate this teacher?')) {
    await teachersStore.deactivateTeacher(teacherId);
    // If the deactivated teacher was selected, clear the selection
    if (selectedTeacherId.value === teacherId) {
      selectedTeacherId.value = '';
    }
  }
};

const activateTeacher = async (teacherId) => {
  await teachersStore.activateTeacher(teacherId);
};

const openAssignClassDialog = () => {
  showAssignClassDialog.value = true;
};

const assignSelectedClass = async (classId) => {
  if (selectedTeacher.value) {
    const classObj = allClasses.value.find(c => c.id === classId);
    if (classObj) {
      await assignClass(classObj.id, classObj.name);
      showAssignClassDialog.value = false;
    }
  }
};

const assignClass = async (classId, className) => {
  if (selectedTeacher.value) {
    await teachersStore.assignClass(selectedTeacher.value.id, className);
    await classesStore.assignTeacher(classId, selectedTeacher.value.id, selectedTeacher.value.name);
  }
};

const unassignClass = async (classId, className) => {
  if (selectedTeacher.value) {
    await teachersStore.unassignClass(selectedTeacher.value.id, className);
    await classesStore.unassignTeacher(classId);
  }
};

const openAssignVRExperienceDialog = () => {
  showAssignVRExperienceDialog.value = true;
};

const assignSelectedExperience = async (experienceId) => {
  if (selectedTeacher.value) {
    const experience = allExperiences.value.find(e => e.id === experienceId);
    if (experience) {
      await assignExperience(experience.id, experience.title);
      showAssignVRExperienceDialog.value = false;
    }
  }
};

const assignExperience = async (experienceId, experienceTitle) => {
  if (selectedTeacher.value) {
    await teachersStore.assignExperience(selectedTeacher.value.id, experienceTitle);
    await vrExperiencesStore.assignExperienceToTeacher(experienceId, selectedTeacher.value.id, selectedTeacher.value.name);
  }
};

const unassignExperience = async (experienceId, experienceTitle) => {
  if (selectedTeacher.value) {
    await teachersStore.unassignExperience(selectedTeacher.value.id, experienceTitle);
    await vrExperiencesStore.unassignExperienceFromTeacher(experienceId, selectedTeacher.value.id);
  }
};

// Initialization
onMounted(async () => {
  // Fetch data from stores
  await teachersStore.fetchTeachers();
  await classesStore.fetchClasses();
  await vrExperiencesStore.fetchExperiences();

  // Select the first teacher by default if available
  if (activeTeachers.value.length > 0) {
    selectedTeacherId.value = activeTeachers.value[0].id;
  }
});
</script>

<style scoped>
.teachers-management {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
  width: 100%;
  height: calc(100vh - 120px); /* Adjust based on header/nav height */
  overflow: hidden;
}

.main-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.no-selection {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-style: italic;
}
</style>
