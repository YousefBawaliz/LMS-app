<template>
  <div class="student-table-container">
    <table class="student-table">
      <thead>
        <tr>
          <th @click="sortBy('name')" :class="{ active: sortField === 'name' }">
            Name <span class="sort-icon">{{ getSortIcon('name') }}</span>
          </th>
          <th @click="sortBy('studentId')" :class="{ active: sortField === 'studentId' }">
            ID <span class="sort-icon">{{ getSortIcon('studentId') }}</span>
          </th>
          <th @click="sortBy('score')" :class="{ active: sortField === 'score' }">
            Score <span class="sort-icon">{{ getSortIcon('score') }}</span>
          </th>
          <th @click="sortBy('attempts')" :class="{ active: sortField === 'attempts' }">
            Attempts <span class="sort-icon">{{ getSortIcon('attempts') }}</span>
          </th>
          <th @click="sortBy('mistakes')" :class="{ active: sortField === 'mistakes' }">
            Mistakes <span class="sort-icon">{{ getSortIcon('mistakes') }}</span>
          </th>
          <th @click="sortBy('time')" :class="{ active: sortField === 'time' }">
            Time <span class="sort-icon">{{ getSortIcon('time') }}</span>
          </th>
          <th @click="sortBy('completion')" :class="{ active: sortField === 'completion' }">
            Completion <span class="sort-icon">{{ getSortIcon('completion') }}</span>
          </th>
          <th @click="sortBy('badges')" :class="{ active: sortField === 'badges' }">
            Badges <span class="sort-icon">{{ getSortIcon('badges') }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in displayedStudents" :key="student.id">
          <td>{{ student.name }}</td>
          <td>{{ student.studentId }}</td>
          <td>{{ student.score }}%</td>
          <td>{{ student.attempts }}</td>
          <td>{{ student.mistakes }}</td>
          <td>{{ student.time }}</td>
          <td>{{ student.completion }}%</td>
          <td>
            <div class="badges-container">
              <div v-if="student.badges > 0" class="badge-icon" v-for="n in student.badges" :key="n">⭐</div>
              <div v-if="student.badges === 0">-</div>
            </div>
          </td>
        </tr>
        <!-- Add empty rows to maintain consistent table height -->
        <tr v-for="n in emptyRowsCount" :key="`empty-${n}`" class="empty-row">
          <td colspan="8">&nbsp;</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, watch } from 'vue';
import { StudentPerformance } from '../../stores/students';

export default defineComponent({
  name: 'StudentTable',
  props: {
    students: {
      type: Array as PropType<StudentPerformance[]>,
      required: true
    },
    sortField: {
      type: String,
      default: 'name'
    },
    sortDirection: {
      type: String as PropType<'asc' | 'desc'>,
      default: 'asc'
    }
  },
  setup(props, { emit }) {
    const getSortIcon = (field: string) => {
      if (props.sortField !== field) return '▼';
      return props.sortDirection === 'asc' ? '▲' : '▼';
    };
    
    const sortBy = (field: string) => {
      let direction: 'asc' | 'desc' = 'asc';
      
      if (props.sortField === field) {
        direction = props.sortDirection === 'asc' ? 'desc' : 'asc';
      }
      
      emit('sort', field, direction);
    };
    
    // Always display a fixed number of rows (6)
    const rowsToDisplay = 6;
    
    const displayedStudents = computed(() => {
      return props.students.slice(0, rowsToDisplay);
    });
    
    const emptyRowsCount = computed(() => {
      return Math.max(0, rowsToDisplay - displayedStudents.value.length);
    });
    
    return {
      getSortIcon,
      sortBy,
      displayedStudents,
      emptyRowsCount
    };
  }
});
</script>

<style scoped>
.student-table-container {
  overflow-x: auto;
  margin-top: 0;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.student-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.student-table th {
  background-color: white;
  color: #3786d6;
  padding: 0.75rem;
  text-align: left;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid #ddd;
}

.student-table th.active {
  font-weight: bold;
}

.student-table th:hover {
  background-color: #f9f9f9;
}

.sort-icon {
  margin-left: 0.25rem;
  font-size: 0.625rem;
}

.student-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.empty-row td {
  border-bottom: 1px solid #e5e7eb;
  height: 48px;
}

.student-table tbody tr:nth-child(even) {
  background-color: #f9fafb;
}

.student-table tbody tr:hover {
  background-color: #f3f4f6;
}

.badges-container {
  display: flex;
}

.badge-icon {
  color: gold;
  margin-right: 0.25rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .student-table th, .student-table td {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  /* On very small screens, we'll rely on horizontal scrolling */
  .student-table th, .student-table td {
    padding: 0.375rem;
    font-size: 0.75rem;
  }
}
</style>