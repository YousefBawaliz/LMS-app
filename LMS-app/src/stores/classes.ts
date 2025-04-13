import { defineStore } from 'pinia';
// import api from '../services/api';

export interface ClassExperience {
  id: string;
  title: string;
  completionRate?: number;  // Make completionRate optional
  upcomingDate?: string;
}

export interface Class {
  id: string;
  name: string;
  studentCount: number;
  subject: string;
  avgScore: number;
  completionRate: number;
  completedExperiences: ClassExperience[];
  upcomingExperiences: ClassExperience[];
}

export interface ClassExtended extends Class {
  grade: string;
  teacher: string | null;
  teacherId: string | null;
}

interface ClassesState {
  classes: ClassExtended[];
  classesByGrade: Record<string, ClassExtended[]>;
  classesByTeacher: Record<string, ClassExtended[]>;
  currentClass: ClassExtended | null;
  loading: boolean;
  searchQuery: string;
}

export const useClassesStore = defineStore('classes', {
  state: (): ClassesState => ({
    classes: [
      // Sample data extended for admin interface
      {
        id: 'class001',
        name: '9A',
        studentCount: 24,
        subject: 'Chemistry',
        avgScore: 77,
        completionRate: 92,
        completedExperiences: [
          { id: 'exp001', title: 'Atomic Bonds', completionRate: 98 },
          { id: 'exp002', title: 'Nobel Gasses', completionRate: 81 },
          { id: 'exp003', title: 'Chemical reactions I', completionRate: 91 }
        ],
        upcomingExperiences: [
          { id: 'exp006', title: 'Atomic Bonds 2', upcomingDate: 'Aug 12th' }
        ],
        grade: '9',
        teacher: 'Sarah Silvergold',
        teacherId: 't001'
      },
      {
        id: 'class002',
        name: '9B',
        studentCount: 26,
        subject: 'Chemistry',
        avgScore: 79,
        completionRate: 90,
        completedExperiences: [
          { id: 'exp001', title: 'Atomic Bonds', completionRate: 94 },
          { id: 'exp002', title: 'Nobel Gasses', completionRate: 82 }
        ],
        upcomingExperiences: [
          { id: 'exp003', title: 'Chemical reactions I', upcomingDate: 'Aug 10th' }
        ],
        grade: '9',
        teacher: 'Sarah Silvergold',
        teacherId: 't001'
      },
      {
        id: 'class003',
        name: '9C',
        studentCount: 25,
        subject: 'Chemistry',
        avgScore: 81,
        completionRate: 94,
        completedExperiences: [
          { id: 'exp001', title: 'Atomic Bonds', completionRate: 96 },
          { id: 'exp002', title: 'Nobel Gasses', completionRate: 89 },
          { id: 'exp003', title: 'Chemical reactions I', completionRate: 93 }
        ],
        upcomingExperiences: [],
        grade: '9',
        teacher: 'Sarah Silvergold',
        teacherId: 't001'
      },
      {
        id: 'class004',
        name: '9D',
        studentCount: 27,
        subject: 'Chemistry',
        avgScore: 75,
        completionRate: 88,
        completedExperiences: [
          { id: 'exp001', title: 'Atomic Bonds', completionRate: 90 }
        ],
        upcomingExperiences: [
          { id: 'exp002', title: 'Nobel Gasses', upcomingDate: 'Aug 15th' }
        ],
        grade: '9',
        teacher: 'Sarah Silvergold',
        teacherId: 't001'
      },
      {
        id: 'class005',
        name: '9E',
        studentCount: 25,
        subject: 'Chemistry',
        avgScore: 79,
        completionRate: 91,
        completedExperiences: [
          { id: 'exp001', title: 'Atomic Bonds', completionRate: 93 }
        ],
        upcomingExperiences: [
          { id: 'exp002', title: 'Nobel Gasses', upcomingDate: 'Aug 18th' }
        ],
        grade: '9',
        teacher: 'Sarah Silvergold',
        teacherId: 't001'
      },
      {
        id: 'class006',
        name: '9F',
        studentCount: 25,
        subject: 'Chemistry',
        avgScore: 78,
        completionRate: 90,
        completedExperiences: [
          { id: 'exp001', title: 'Atomic Bonds', completionRate: 92 }
        ],
        upcomingExperiences: [
          { id: 'exp002', title: 'Nobel Gasses', upcomingDate: 'Aug 20th' }
        ],
        grade: '9',
        teacher: 'Sarah Silvergold',
        teacherId: 't001'
      },
      {
        id: 'class007',
        name: '10A',
        studentCount: 28,
        subject: 'Physics',
        avgScore: 82,
        completionRate: 95,
        completedExperiences: [
          { id: 'exp004', title: 'Gravity VR Experience', completionRate: 96 }
        ],
        upcomingExperiences: [
          { id: 'exp006', title: 'Acceleration VR Experience', upcomingDate: 'Aug 22nd' }
        ],
        grade: '10',
        teacher: 'Michael Jones',
        teacherId: 't002'
      },
      {
        id: 'class008',
        name: '10B',
        studentCount: 27,
        subject: 'Physics',
        avgScore: 79,
        completionRate: 92,
        completedExperiences: [
          { id: 'exp005', title: 'Atoms VR Experience', completionRate: 93 }
        ],
        upcomingExperiences: [
          { id: 'exp007', title: 'Orbits VR Experience', upcomingDate: 'Aug 25th' }
        ],
        grade: '10',
        teacher: 'Michael Jones',
        teacherId: 't002'
      }
    ],
    classesByGrade: {},  // Will be populated in init action
    classesByTeacher: {},  // Will be populated in init action
    currentClass: null,
    loading: false,
    searchQuery: ''
  }),
  
  getters: {
    // Get classes filtered by search query
    filteredClasses: (state) => {
      if (!state.searchQuery.trim()) return state.classes;
      
      const query = state.searchQuery.toLowerCase();
      return state.classes.filter(cls => 
        cls.name.toLowerCase().includes(query) || 
        cls.subject.toLowerCase().includes(query) ||
        (cls.teacher && cls.teacher.toLowerCase().includes(query))
      );
    },
    
    // Get classes by grade
    getClassesByGrade: (state) => (grade: string) => {
      return state.classesByGrade[grade] || [];
    },
    
    // Get classes by teacher
    getClassesByTeacher: (state) => (teacherId: string) => {
      return state.classesByTeacher[teacherId] || [];
    }
  },
  
  actions: {
    // Initialize store - organize classes by grade and teacher
    init() {
      // Organize by grade
      this.classesByGrade = {};
      this.classes.forEach(cls => {
        if (!this.classesByGrade[cls.grade]) {
          this.classesByGrade[cls.grade] = [];
        }
        this.classesByGrade[cls.grade].push(cls);
      });
      
      // Organize by teacher
      this.classesByTeacher = {};
      this.classes.forEach(cls => {
        if (cls.teacherId) {
          if (!this.classesByTeacher[cls.teacherId]) {
            this.classesByTeacher[cls.teacherId] = [];
          }
          this.classesByTeacher[cls.teacherId].push(cls);
        }
      });
    },
    
    // Fetch all classes
    async fetchClasses() {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        // const response = await api.get('/classes');
        // this.classes = response.data;
        
        // Initialize data structures
        this.init();
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        this.loading = false;
      }
    },
    
    // Fetch a specific class by ID
    async fetchClassById(id: string) {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        // const response = await api.get(`/classes/${id}`);
        // this.currentClass = response.data;
        
        // For now, find the class in the sample data
        this.currentClass = this.classes.find(cls => cls.id === id) || null;
      } catch (error) {
        console.error('Error fetching class:', error);
        this.currentClass = null;
      } finally {
        this.loading = false;
      }
    },
    
    // Fetch classes by grade
    async fetchClassesByGrade(grade: string) {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        // const response = await api.get(`/grades/${grade}/classes`);
        // this.classesByGrade[grade] = response.data;
        
        // For now, filter the sample data
        this.classesByGrade[grade] = this.classes.filter(cls => cls.grade === grade);
        return this.classesByGrade[grade];
      } catch (error) {
        console.error('Error fetching classes by grade:', error);
        return [];
      } finally {
        this.loading = false;
      }
    },
    
    // Fetch classes by teacher
    async fetchClassesByTeacher(teacherId: string) {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        // const response = await api.get(`/teachers/${teacherId}/classes`);
        // this.classesByTeacher[teacherId] = response.data;
        
        // For now, filter the sample data
        this.classesByTeacher[teacherId] = this.classes.filter(cls => cls.teacherId === teacherId);
        return this.classesByTeacher[teacherId];
      } catch (error) {
        console.error('Error fetching classes by teacher:', error);
        return [];
      } finally {
        this.loading = false;
      }
    },
    
    // Create a new class (admin function)
    async createClass(classData: Partial<ClassExtended>) {
      try {
        // In a real app, this would be an API call
        // const response = await api.post('/classes', classData);
        // const newClass = response.data;
        
        // For now, create a new class locally
        const newClass: ClassExtended = {
          id: `class${(this.classes.length + 1).toString().padStart(3, '0')}`,
          name: classData.name || '',
          studentCount: classData.studentCount || 0,
          subject: classData.subject || '',
          avgScore: classData.avgScore || 0,
          completionRate: classData.completionRate || 0,
          completedExperiences: classData.completedExperiences || [],
          upcomingExperiences: classData.upcomingExperiences || [],
          grade: classData.grade || '',
          teacher: classData.teacher || null,
          teacherId: classData.teacherId || null
        };
        
        this.classes.push(newClass);
        
        // Update organizaiton
        this.init();
        
        return newClass;
      } catch (error) {
        console.error('Error creating class:', error);
        return null;
      }
    },
    
    // Update a class (admin function)
    async updateClass(classId: string, data: Partial<ClassExtended>) {
      try {
        // In a real app, this would be an API call
        // await api.put(`/classes/${classId}`, data);
        
        // Update local state
        const classIndex = this.classes.findIndex(cls => cls.id === classId);
        if (classIndex !== -1) {
          this.classes[classIndex] = {
            ...this.classes[classIndex],
            ...data
          };
          
          // Update organization
          this.init();
          
          // Update current class if it's the one being modified
          if (this.currentClass && this.currentClass.id === classId) {
            this.currentClass = this.classes[classIndex];
          }
          
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error updating class:', error);
        return false;
      }
    },
    
    // Delete a class (admin function)
    async deleteClass(classId: string) {
      try {
        // In a real app, this would be an API call
        // await api.delete(`/classes/${classId}`);
        
        // Update local state
        this.classes = this.classes.filter(cls => cls.id !== classId);
        
        // Update organization
        this.init();
        
        // Reset current class if it's the one being deleted
        if (this.currentClass && this.currentClass.id === classId) {
          this.currentClass = null;
        }
        
        return true;
      } catch (error) {
        console.error('Error deleting class:', error);
        return false;
      }
    },
    
    // Assign a teacher to a class (admin function)
    async assignTeacher(classId: string, teacherId: string, teacherName: string) {
      try {
        // In a real app, this would be an API call
        // await api.put(`/classes/${classId}/teacher`, { teacherId });
        
        // Update local state
        const classIndex = this.classes.findIndex(cls => cls.id === classId);
        if (classIndex !== -1) {
          this.classes[classIndex].teacherId = teacherId;
          this.classes[classIndex].teacher = teacherName;
          
          // Update organization
          this.init();
          
          // Update current class if it's the one being modified
          if (this.currentClass && this.currentClass.id === classId) {
            this.currentClass = this.classes[classIndex];
          }
          
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error assigning teacher to class:', error);
        return false;
      }
    },
    
    // Unassign a teacher from a class (admin function)
    async unassignTeacher(classId: string) {
      try {
        // In a real app, this would be an API call
        // await api.delete(`/classes/${classId}/teacher`);
        
        // Update local state
        const classIndex = this.classes.findIndex(cls => cls.id === classId);
        if (classIndex !== -1) {
          this.classes[classIndex].teacherId = null;
          this.classes[classIndex].teacher = null;
          
          // Update organization
          this.init();
          
          // Update current class if it's the one being modified
          if (this.currentClass && this.currentClass.id === classId) {
            this.currentClass = this.classes[classIndex];
          }
          
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error unassigning teacher from class:', error);
        return false;
      }
    },
    
    // Set search query
    setSearchQuery(query: string) {
      this.searchQuery = query;
    }
  }
});