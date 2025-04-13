import { defineStore } from 'pinia';
// import api from '../services/api';

export interface StudentPerformance {
  id: string;
  name: string;
  studentId: string;
  email: string;
  score: number;
  attempts: number;
  mistakes: number;
  time: string;
  completion: number;
  badges: number;
  classId: string;
  gradeId?: string;
  experienceId: string;
}

interface StudentsState {
  students: StudentPerformance[];
  filteredStudents: StudentPerformance[];
  studentsByClass: Record<string, StudentPerformance[]>;
  studentsByGrade: Record<string, StudentPerformance[]>;
  loading: boolean;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  filters: {
    classId: string;
    gradeId: string;
    experienceId: string;
    searchQuery: string;
  };
}

export const useStudentsStore = defineStore('students', {
  state: (): StudentsState => ({
    students: [
      // Sample data - would normally come from API
      {
        id: 's001',
        name: 'John Cena',
        studentId: '1124',
        email: 'JohnCena@UnionSTC.uni',
        score: 95,
        attempts: 1,
        mistakes: 2,
        time: '8min 24secs',
        completion: 100,
        badges: 0,
        classId: 'class001',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's002',
        name: 'Emily Johnson',
        studentId: '1125',
        email: 'EmilyJohnson@UnionSTC.uni',
        score: 88,
        attempts: 2,
        mistakes: 4,
        time: '9min 12secs',
        completion: 100,
        badges: 1,
        classId: 'class001',
        gradeId: '9',
        experienceId: 'exp001'
      },
      // New mock students
      {
        id: 's003',
        name: 'Alice Smith',
        studentId: '1126',
        email: 'AliceSmith@UnionSTC.uni',
        score: 92,
        attempts: 1,
        mistakes: 3,
        time: '7min 45secs',
        completion: 100,
        badges: 2,
        classId: 'class001',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's004',
        name: 'Bob Wilson',
        studentId: '1127',
        email: 'BobWilson@UnionSTC.uni',
        score: 85,
        attempts: 2,
        mistakes: 5,
        time: '10min 30secs',
        completion: 95,
        badges: 1,
        classId: 'class001',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's005',
        name: 'Sarah Davis',
        studentId: '1128',
        email: 'SarahDavis@UnionSTC.uni',
        score: 78,
        attempts: 3,
        mistakes: 7,
        time: '12min 15secs',
        completion: 90,
        badges: 0,
        classId: 'class001',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's006',
        name: 'Michael Brown',
        studentId: '1129',
        email: 'MichaelBrown@UnionSTC.uni',
        score: 96,
        attempts: 1,
        mistakes: 1,
        time: '8min 50secs',
        completion: 100,
        badges: 3,
        classId: 'class001',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's007',
        name: 'Emma Taylor',
        studentId: '1130',
        email: 'EmmaTaylor@UnionSTC.uni',
        score: 89,
        attempts: 2,
        mistakes: 4,
        time: '9min 20secs',
        completion: 100,
        badges: 1,
        classId: 'class001',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's008',
        name: 'David Martinez',
        studentId: '1131',
        email: 'DavidMartinez@UnionSTC.uni',
        score: 91,
        attempts: 1,
        mistakes: 3,
        time: '8min 15secs',
        completion: 100,
        badges: 2,
        classId: 'class002',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's009',
        name: 'Sophie Anderson',
        studentId: '1132',
        email: 'SophieAnderson@UnionSTC.uni',
        score: 87,
        attempts: 2,
        mistakes: 5,
        time: '9min 45secs',
        completion: 95,
        badges: 1,
        classId: 'class002',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's010',
        name: 'James Wilson',
        studentId: '1133',
        email: 'JamesWilson@UnionSTC.uni',
        score: 83,
        attempts: 2,
        mistakes: 6,
        time: '10min 30secs',
        completion: 90,
        badges: 1,
        classId: 'class002',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's011',
        name: 'Olivia Garcia',
        studentId: '1134',
        email: 'OliviaGarcia@UnionSTC.uni',
        score: 94,
        attempts: 1,
        mistakes: 2,
        time: '7min 55secs',
        completion: 100,
        badges: 2,
        classId: 'class002',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's012',
        name: 'William Lee',
        studentId: '1135',
        email: 'WilliamLee@UnionSTC.uni',
        score: 88,
        attempts: 2,
        mistakes: 4,
        time: '9min 10secs',
        completion: 95,
        badges: 1,
        classId: 'class002',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's013',
        name: 'Ava White',
        studentId: '1136',
        email: 'AvaWhite@UnionSTC.uni',
        score: 90,
        attempts: 1,
        mistakes: 3,
        time: '8min 40secs',
        completion: 100,
        badges: 2,
        classId: 'class002',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's014',
        name: 'Lucas Rodriguez',
        studentId: '1137',
        email: 'LucasRodriguez@UnionSTC.uni',
        score: 86,
        attempts: 2,
        mistakes: 5,
        time: '9min 30secs',
        completion: 95,
        badges: 1,
        classId: 'class002',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's015',
        name: 'Isabella Thompson',
        studentId: '1138',
        email: 'IsabellaThompson@UnionSTC.uni',
        score: 93,
        attempts: 1,
        mistakes: 2,
        time: '8min 20secs',
        completion: 100,
        badges: 2,
        classId: 'class003',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's016',
        name: 'Mason Clark',
        studentId: '1139',
        email: 'MasonClark@UnionSTC.uni',
        score: 87,
        attempts: 2,
        mistakes: 4,
        time: '9min 15secs',
        completion: 95,
        badges: 1,
        classId: 'class003',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's017',
        name: 'Charlotte Walker',
        studentId: '1140',
        email: 'CharlotteWalker@UnionSTC.uni',
        score: 91,
        attempts: 1,
        mistakes: 3,
        time: '8min 45secs',
        completion: 100,
        badges: 2,
        classId: 'class003',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's018',
        name: 'Henry Hall',
        studentId: '1141',
        email: 'HenryHall@UnionSTC.uni',
        score: 85,
        attempts: 2,
        mistakes: 5,
        time: '10min 00secs',
        completion: 90,
        badges: 1,
        classId: 'class003',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's019',
        name: 'Amelia Young',
        studentId: '1142',
        email: 'AmeliaYoung@UnionSTC.uni',
        score: 89,
        attempts: 2,
        mistakes: 4,
        time: '9min 25secs',
        completion: 95,
        badges: 1,
        classId: 'class003',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's020',
        name: 'Alexander King',
        studentId: '1143',
        email: 'AlexanderKing@UnionSTC.uni',
        score: 92,
        attempts: 1,
        mistakes: 3,
        time: '8min 35secs',
        completion: 100,
        badges: 2,
        classId: 'class003',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's021',
        name: 'Victoria Scott',
        studentId: '1144',
        email: 'VictoriaScott@UnionSTC.uni',
        score: 88,
        attempts: 2,
        mistakes: 4,
        time: '9min 40secs',
        completion: 95,
        badges: 1,
        classId: 'class003',
        gradeId: '9',
        experienceId: 'exp001'
      },
      {
        id: 's022',
        name: 'Benjamin Green',
        studentId: '1145',
        email: 'BenjaminGreen@UnionSTC.uni',
        score: 90,
        attempts: 1,
        mistakes: 3,
        time: '8min 55secs',
        completion: 100,
        badges: 2,
        classId: 'class003',
        gradeId: '9',
        experienceId: 'exp001'
      }
    ],
    filteredStudents: [],
    studentsByClass: {},
    studentsByGrade: {},
    loading: false,
    sortField: 'name',
    sortDirection: 'asc',
    filters: {
      classId: '',
      gradeId: '',
      experienceId: '',
      searchQuery: ''
    }
  }),
  
  getters: {
    // Get students from a specific class
    getStudentsByClass: (state) => (classId: string) => {
      return state.students.filter(student => student.classId === classId);
    },
    
    // Get students from a specific grade
    getStudentsByGrade: (state) => (gradeId: string) => {
      return state.students.filter(student => student.gradeId === gradeId);
    },
    
    // Get student count by class
    getStudentCountByClass: (state) => (classId: string) => {
      return state.students.filter(student => student.classId === classId).length;
    },
    
    // Get average score by class
    getAverageScoreByClass: (state) => (classId: string) => {
      const classStudents = state.students.filter(student => student.classId === classId);
      if (classStudents.length === 0) return 0;
      
      const totalScore = classStudents.reduce((sum, student) => sum + student.score, 0);
      return Math.round(totalScore / classStudents.length);
    }
  },
  
  actions: {
    // Fetch all students (admin function)
    async fetchAllStudents() {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        // const response = await api.get('/students');
        // this.students = response.data;
        
        // For now, we'll just use the sample data
        this.applyFilters();
        this.organizeStudentsByClass();
        this.organizeStudentsByGrade();
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        this.loading = false;
      }
    },
    
    // Fetch students by specified parameters
    async fetchStudents(params: { classId?: string; gradeId?: string; experienceId?: string } = {}) {
      this.loading = true;
      
      // Update filters if provided
      if (params.classId) this.filters.classId = params.classId;
      if (params.gradeId) this.filters.gradeId = params.gradeId;
      if (params.experienceId) this.filters.experienceId = params.experienceId;
      
      try {
        // In a real app, this would be an API call with params
        // const response = await api.get('/students', { params });
        // this.students = response.data;
        
        // For now, apply filters to the sample data
        this.applyFilters();
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        this.loading = false;
      }
    },
    
    // Fetch students by grade (admin function)
    async fetchStudentsByGrade(gradeId: string) {
      this.loading = true;
      this.filters.gradeId = gradeId;
      
      try {
        // In a real app, this would be an API call
        // const response = await api.get(`/grades/${gradeId}/students`);
        // this.studentsByGrade[gradeId] = response.data;
        
        // For now, filter the sample data
        this.studentsByGrade[gradeId] = this.students.filter(
          student => student.gradeId === gradeId
        );
        this.applyFilters();
      } catch (error) {
        console.error('Error fetching students by grade:', error);
      } finally {
        this.loading = false;
      }
    },
    
    // Organize students by class (for efficient lookup)
    organizeStudentsByClass() {
      this.studentsByClass = {};
      
      this.students.forEach(student => {
        if (!this.studentsByClass[student.classId]) {
          this.studentsByClass[student.classId] = [];
        }
        this.studentsByClass[student.classId].push(student);
      });
    },
    
    // Organize students by grade (for efficient lookup)
    organizeStudentsByGrade() {
      this.studentsByGrade = {};
      
      this.students.forEach(student => {
        if (student.gradeId) {
          if (!this.studentsByGrade[student.gradeId]) {
            this.studentsByGrade[student.gradeId] = [];
          }
          this.studentsByGrade[student.gradeId].push(student);
        }
      });
    },
    
    // Assign a student to a class (admin function)
    async assignStudentToClass(studentId: string, classId: string) {
      try {
        // In a real app, this would be an API call
        // await api.post(`/students/${studentId}/assign`, { classId });
        
        // Update local state
        const studentIndex = this.students.findIndex(s => s.id === studentId);
        if (studentIndex !== -1) {
          this.students[studentIndex].classId = classId;
          this.organizeStudentsByClass();
          this.applyFilters();
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error assigning student to class:', error);
        return false;
      }
    },
    
    // Remove a student from a class (admin function)
    async removeStudentFromClass(studentId: string, classId: string) {
      try {
        // In a real app, this would be an API call
        // await api.post(`/students/${studentId}/unassign`, { classId });
        
        // Update local state
        const studentIndex = this.students.findIndex(
          s => s.id === studentId && s.classId === classId
        );
        if (studentIndex !== -1) {
          this.students[studentIndex].classId = '';
          this.organizeStudentsByClass();
          this.applyFilters();
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error removing student from class:', error);
        return false;
      }
    },
    
    // Create a new student (admin function)
    async createStudent(studentData: Partial<StudentPerformance>) {
      try {
        // In a real app, this would be an API call
        // const response = await api.post('/students', studentData);
        // const newStudent = response.data;
        
        // For now, create a new student locally
        const newStudent: StudentPerformance = {
          id: `s${(this.students.length + 1).toString().padStart(3, '0')}`,
          name: studentData.name || '',
          studentId: studentData.studentId || '',
          email: studentData.email || '',
          score: studentData.score || 0,
          attempts: studentData.attempts || 0,
          mistakes: studentData.mistakes || 0,
          time: studentData.time || '0min 0secs',
          completion: studentData.completion || 0,
          badges: studentData.badges || 0,
          classId: studentData.classId || '',
          gradeId: studentData.gradeId || '',
          experienceId: studentData.experienceId || ''
        };
        
        this.students.push(newStudent);
        this.organizeStudentsByClass();
        this.organizeStudentsByGrade();
        this.applyFilters();
        return newStudent;
      } catch (error) {
        console.error('Error creating student:', error);
        return null;
      }
    },
    
    // Update a student (admin function)
    async updateStudent(studentId: string, data: Partial<StudentPerformance>) {
      try {
        // In a real app, this would be an API call
        // await api.put(`/students/${studentId}`, data);
        
        // Update local state
        const studentIndex = this.students.findIndex(s => s.id === studentId);
        if (studentIndex !== -1) {
          this.students[studentIndex] = {
            ...this.students[studentIndex],
            ...data
          };
          this.organizeStudentsByClass();
          this.organizeStudentsByGrade();
          this.applyFilters();
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error updating student:', error);
        return false;
      }
    },
    
    // Delete a student (admin function)
    async deleteStudent(studentId: string) {
      try {
        // In a real app, this would be an API call
        // await api.delete(`/students/${studentId}`);
        
        // Update local state
        this.students = this.students.filter(s => s.id !== studentId);
        this.organizeStudentsByClass();
        this.organizeStudentsByGrade();
        this.applyFilters();
        return true;
      } catch (error) {
        console.error('Error deleting student:', error);
        return false;
      }
    },
    
    // Export students data (admin function)
    exportStudentsData(format: 'csv' | 'pdf') {
      // In a real app, this would either:
      // 1. Make an API call to generate the file on the server
      // 2. Generate the file in the browser using a library
      
      // For now, just log the request
      console.log(`Exporting student data as ${format}...`);
      
      // Simulate file download URL
      const downloadUrl = `/api/exports/students.${format}`;
      
      // In a real app, you might trigger a download:
      // window.open(downloadUrl, '_blank');
      
      return downloadUrl;
    },
    
    // Apply filters to the students data
    applyFilters() {
      let result = [...this.students];
      
      // Apply class filter if set
      if (this.filters.classId) {
        result = result.filter(student => student.classId === this.filters.classId);
      }
      
      // Apply grade filter if set
      if (this.filters.gradeId) {
        result = result.filter(student => student.gradeId === this.filters.gradeId);
      }
      
      // Apply experience filter if set
      if (this.filters.experienceId) {
        result = result.filter(student => student.experienceId === this.filters.experienceId);
      }
      
      // Apply search query if set
      if (this.filters.searchQuery.trim()) {
        const query = this.filters.searchQuery.toLowerCase();
        result = result.filter(student => 
          student.name.toLowerCase().includes(query) || 
          student.studentId.includes(query) ||
          student.email.toLowerCase().includes(query)
        );
      }
      
      // Apply sorting
      result.sort((a, b) => {
        let valA: any = a[this.sortField as keyof StudentPerformance];
        let valB: any = b[this.sortField as keyof StudentPerformance];
        
        if (typeof valA === 'string' && typeof valB === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }
        
        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
      
      this.filteredStudents = result;
    },
    
    // Set sort field and direction
    setSort(field: string) {
      // If clicking the same field, toggle direction
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        // If clicking a new field, set it and default to ascending
        this.sortField = field;
        this.sortDirection = 'asc';
      }
      this.applyFilters();
    },
    
    // Set filters
    setClassFilter(classId: string) {
      this.filters.classId = classId;
      this.applyFilters();
    },
    
    setGradeFilter(gradeId: string) {
      this.filters.gradeId = gradeId;
      this.applyFilters();
    },
    
    setExperienceFilter(experienceId: string) {
      this.filters.experienceId = experienceId;
      this.applyFilters();
    },
    
    setSearchQuery(query: string) {
      this.filters.searchQuery = query;
      this.applyFilters();
    },
    
    // Reset all filters
    resetFilters() {
      this.filters = {
        classId: '',
        gradeId: '',
        experienceId: '',
        searchQuery: ''
      };
      this.applyFilters();
    }
  }
});
