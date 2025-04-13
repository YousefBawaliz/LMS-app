import { defineStore } from 'pinia';

export interface StudentPerformance {
  id: string;
  name: string;
  studentId: string;
  score: number;
  attempts: number;
  mistakes: number;
  time: string;
  completion: number;
  badges: number;
  classId: string;
  experienceId: string;
}

interface StudentsState {
  students: StudentPerformance[];
  loading: boolean;
  filteredStudents: StudentPerformance[];
  sortField: string;
  sortDirection: 'asc' | 'desc';
  classFilter: string;
  experienceFilter: string;
  searchQuery: string;
}

export const useStudentsStore = defineStore('students', {
  state: (): StudentsState => ({
    students: [
      // Class 9A, Atomic Bond experience
      {
        id: 's001',
        name: 'John Cena',
        studentId: '1124',
        score: 95,
        attempts: 1,
        mistakes: 2,
        time: '8min 24secs',
        completion: 100,
        badges: 0,
        classId: 'class001',
        experienceId: 'exp001'
      },
      {
        id: 's002',
        name: 'Emily Johnson',
        studentId: '1125',
        score: 88,
        attempts: 2,
        mistakes: 4,
        time: '9min 12secs',
        completion: 100,
        badges: 1,
        classId: 'class001',
        experienceId: 'exp001'
      },
      {
        id: 's003',
        name: 'Michael Smith',
        studentId: '1126',
        score: 92,
        attempts: 1,
        mistakes: 3,
        time: '7min 45secs',
        completion: 100,
        badges: 1,
        classId: 'class001',
        experienceId: 'exp001'
      },
      {
        id: 's004',
        name: 'Sarah Williams',
        studentId: '1127',
        score: 97,
        attempts: 1,
        mistakes: 1,
        time: '8min 02secs',
        completion: 100,
        badges: 2,
        classId: 'class001',
        experienceId: 'exp001'
      },
      {
        id: 's005',
        name: 'David Brown',
        studentId: '1128',
        score: 85,
        attempts: 2,
        mistakes: 5,
        time: '10min 18secs',
        completion: 100,
        badges: 0,
        classId: 'class001',
        experienceId: 'exp001'
      },
      {
        id: 's006',
        name: 'Jessica Davis',
        studentId: '1129',
        score: 91,
        attempts: 1,
        mistakes: 3,
        time: '8min 50secs',
        completion: 100,
        badges: 1,
        classId: 'class001',
        experienceId: 'exp001'
      },
      
      // Different classes and experiences
      {
        id: 's007',
        name: 'Daniel Wilson',
        studentId: '1130',
        score: 78,
        attempts: 3,
        mistakes: 7,
        time: '12min 05secs',
        completion: 90,
        badges: 0,
        classId: 'class002',
        experienceId: 'exp001'
      },
      {
        id: 's008',
        name: 'Olivia Martinez',
        studentId: '1131',
        score: 94,
        attempts: 1,
        mistakes: 2,
        time: '7min 38secs',
        completion: 100,
        badges: 2,
        classId: 'class002',
        experienceId: 'exp001'
      },
      {
        id: 's009',
        name: 'James Taylor',
        studentId: '1132',
        score: 83,
        attempts: 2,
        mistakes: 5,
        time: '9min 42secs',
        completion: 95,
        badges: 0,
        classId: 'class002',
        experienceId: 'exp001'
      },
      {
        id: 's010',
        name: 'Sophia Anderson',
        studentId: '1133',
        score: 90,
        attempts: 1,
        mistakes: 3,
        time: '8min 15secs',
        completion: 100,
        badges: 1,
        classId: 'class002',
        experienceId: 'exp001'
      },
      
      // More students for different experiences
      {
        id: 's011',
        name: 'John Cena',
        studentId: '1124',
        score: 87,
        attempts: 2,
        mistakes: 4,
        time: '5min 55secs',
        completion: 100,
        badges: 0,
        classId: 'class001',
        experienceId: 'exp002'
      },
      {
        id: 's012',
        name: 'Emily Johnson',
        studentId: '1125',
        score: 92,
        attempts: 1,
        mistakes: 2,
        time: '6min 10secs',
        completion: 100,
        badges: 1,
        classId: 'class001',
        experienceId: 'exp002'
      }
    ],
    loading: false,
    filteredStudents: [],
    sortField: 'name',
    sortDirection: 'asc',
    classFilter: 'class001',     // 9A by default
    experienceFilter: 'exp001',  // Atomic Bond by default
    searchQuery: ''
  }),
  
  actions: {
    fetchStudents(params: { classId?: string; experienceId?: string } = {}) {
      this.loading = true;
      // Update filters if provided
      if (params.classId) this.classFilter = params.classId;
      if (params.experienceId) this.experienceFilter = params.experienceId;
      
      // Simulate API delay
      setTimeout(() => {
        this.applyFilters();
        this.loading = false;
      }, 300);
    },
    
    applyFilters() {
      let result = [...this.students];
      
      // Apply class filter if set
      if (this.classFilter) {
        result = result.filter(student => student.classId === this.classFilter);
      }
      
      // Apply experience filter if set
      if (this.experienceFilter) {
        result = result.filter(student => student.experienceId === this.experienceFilter);
      }
      
      // Apply search query if set
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(student => 
          student.name.toLowerCase().includes(query) || 
          student.studentId.includes(query)
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
    
    setClassFilter(classId: string) {
      this.classFilter = classId;
      this.applyFilters();
    },
    
    setExperienceFilter(experienceId: string) {
      this.experienceFilter = experienceId;
      this.applyFilters();
    },
    
    setSearchQuery(query: string) {
      this.searchQuery = query;
      this.applyFilters();
    }
  }
});