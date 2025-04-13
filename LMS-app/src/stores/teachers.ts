import { defineStore } from 'pinia';
// import api from '../services/api';

interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  assignedClasses: string[];
  assignedExperiences: string[];
  stats: {
    assignedClasses: number;
    numberOfStudents: number;
    assignedExperiences: number;
    averageStudentsScore: number;
    averageStudentsCompletion: number;
    averageTimePerExperience: string;
  };
  isActive: boolean;
}

interface TeachersState {
  teachers: Teacher[];
  activeTeachers: Teacher[];
  deactivatedTeachers: Teacher[];
  currentTeacher: Teacher | null;
  loading: boolean;
  searchQuery: string;
}

export const useTeachersStore = defineStore('teachers', {
  state: (): TeachersState => ({
    teachers: [
      // Sample data - would normally come from API
      {
        id: 't001',
        name: 'Sarah Silvergold',
        email: 'Sarah.Silver@sst.uni',
        subject: 'Chemistry',
        assignedClasses: ['9A', '9B', '9C', '9D', '9E', '9F'],
        assignedExperiences: ['Periodic Table', 'Chemical Bonds', 'Electrons and Orbits', 'Noble Gasses', 'Metals'],
        stats: {
          assignedClasses: 6,
          numberOfStudents: 142,
          assignedExperiences: 7,
          averageStudentsScore: 87,
          averageStudentsCompletion: 92,
          averageTimePerExperience: '7 minutes'
        },
        isActive: true
      },
      {
        id: 't002',
        name: 'Michael Jones',
        email: 'Michael.Jones@sst.uni',
        subject: 'Physics',
        assignedClasses: ['8A', '8B', '8C'],
        assignedExperiences: ['Gravity', 'Motion', 'Electricity'],
        stats: {
          assignedClasses: 3,
          numberOfStudents: 72,
          assignedExperiences: 5,
          averageStudentsScore: 82,
          averageStudentsCompletion: 88,
          averageTimePerExperience: '8 minutes'
        },
        isActive: true
      },
      {
        id: 't003',
        name: 'Matt Stoopido',
        email: 'Matt.Stoopido@sst.uni',
        subject: 'Biology',
        assignedClasses: ['7A', '7B'],
        assignedExperiences: ['Cell Structure', 'DNA'],
        stats: {
          assignedClasses: 2,
          numberOfStudents: 48,
          assignedExperiences: 4,
          averageStudentsScore: 85,
          averageStudentsCompletion: 90,
          averageTimePerExperience: '6 minutes'
        },
        isActive: true
      },
      {
        id: 't004',
        name: 'Miranda Fanta',
        email: 'Miranda.Fanta@sst.uni',
        subject: 'Chemistry',
        assignedClasses: ['10A', '10B'],
        assignedExperiences: ['Advanced Chemical Reactions', 'Organic Chemistry'],
        stats: {
          assignedClasses: 2,
          numberOfStudents: 46,
          assignedExperiences: 3,
          averageStudentsScore: 88,
          averageStudentsCompletion: 93,
          averageTimePerExperience: '9 minutes'
        },
        isActive: true
      },
      {
        id: 't005',
        name: 'Slavic Armament',
        email: 'Slavic.Armament@sst.uni',
        subject: 'Math',
        assignedClasses: ['11A'],
        assignedExperiences: ['Calculus', 'Trigonometry'],
        stats: {
          assignedClasses: 1,
          numberOfStudents: 24,
          assignedExperiences: 2,
          averageStudentsScore: 79,
          averageStudentsCompletion: 85,
          averageTimePerExperience: '10 minutes'
        },
        isActive: true
      },
      // Deactivated teachers
      {
        id: 't006',
        name: 'Penny McSeelit',
        email: 'Penny.McSeelit@sst.uni',
        subject: 'Biology',
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
        isActive: false
      },
      {
        id: 't007',
        name: 'Steve Blackface',
        email: 'Steve.Blackface@sst.uni',
        subject: 'Physics',
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
        isActive: false
      },
      {
        id: 't008',
        name: 'Tania Reddaert',
        email: 'Tania.Reddaert@sst.uni',
        subject: 'Math',
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
        isActive: false
      }
    ],
    activeTeachers: [], // Will be populated in the init action
    deactivatedTeachers: [], // Will be populated in the init action
    currentTeacher: null,
    loading: false,
    searchQuery: ''
  }),
  
  getters: {
    // Get teachers by subject
    getTeachersBySubject: (state) => (subject: string) => {
      return state.teachers.filter(
        teacher => teacher.subject === subject && teacher.isActive
      );
    },
    
    // Get teachers by class
    getTeachersByClass: (state) => (classId: string) => {
      return state.teachers.filter(
        teacher => teacher.assignedClasses.includes(classId) && teacher.isActive
      );
    },
    
    // Get teachers by experience
    getTeachersByExperience: (state) => (experienceId: string) => {
      return state.teachers.filter(
        teacher => teacher.assignedExperiences.includes(experienceId) && teacher.isActive
      );
    },
    
    // Filtered teachers based on search query
    filteredTeachers: (state) => {
      if (!state.searchQuery.trim()) return state.activeTeachers;
      
      const query = state.searchQuery.toLowerCase();
      return state.activeTeachers.filter(teacher => 
        teacher.name.toLowerCase().includes(query) || 
        teacher.email.toLowerCase().includes(query) ||
        teacher.subject.toLowerCase().includes(query)
      );
    },
    
    // Filtered deactivated teachers based on search query
    filteredDeactivatedTeachers: (state) => {
      if (!state.searchQuery.trim()) return state.deactivatedTeachers;
      
      const query = state.searchQuery.toLowerCase();
      return state.deactivatedTeachers.filter(teacher => 
        teacher.name.toLowerCase().includes(query) || 
        teacher.email.toLowerCase().includes(query) ||
        teacher.subject.toLowerCase().includes(query)
      );
    }
  },
  
  actions: {
    // Initialize the store (separate active and deactivated teachers)
    init() {
      this.activeTeachers = this.teachers.filter(teacher => teacher.isActive);
      this.deactivatedTeachers = this.teachers.filter(teacher => !teacher.isActive);
    },
    
    // Fetch all teachers
    async fetchTeachers() {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        // const response = await api.get('/teachers');
        // this.teachers = response.data;
        
        // For now, we'll just use the sample data
        this.init();
      } catch (error) {
        console.error('Error fetching teachers:', error);
      } finally {
        this.loading = false;
      }
    },
    
    // Fetch a specific teacher by ID
    async fetchTeacherById(id: string) {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        // const response = await api.get(`/teachers/${id}`);
        // this.currentTeacher = response.data;
        
        // For now, find the teacher in the sample data
        this.currentTeacher = this.teachers.find(teacher => teacher.id === id) || null;
      } catch (error) {
        console.error('Error fetching teacher:', error);
        this.currentTeacher = null;
      } finally {
        this.loading = false;
      }
    },
    
    // Assign a class to a teacher
    async assignClass(teacherId: string, classId: string) {
      try {
        // In a real app, this would be an API call
        // await api.post(`/teachers/${teacherId}/classes`, { classId });
        
        // Update local state
        const teacherIndex = this.teachers.findIndex(t => t.id === teacherId);
        if (teacherIndex !== -1) {
          // Only add the class if it's not already assigned
          if (!this.teachers[teacherIndex].assignedClasses.includes(classId)) {
            this.teachers[teacherIndex].assignedClasses.push(classId);
            this.teachers[teacherIndex].stats.assignedClasses = this.teachers[teacherIndex].assignedClasses.length;
            
            // Update active/deactivated lists
            this.init();
            
            // Update current teacher if it's the one being modified
            if (this.currentTeacher && this.currentTeacher.id === teacherId) {
              this.currentTeacher = this.teachers[teacherIndex];
            }
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error assigning class to teacher:', error);
        return false;
      }
    },
    
    // Unassign a class from a teacher
    async unassignClass(teacherId: string, classId: string) {
      try {
        // In a real app, this would be an API call
        // await api.delete(`/teachers/${teacherId}/classes/${classId}`);
        
        // Update local state
        const teacherIndex = this.teachers.findIndex(t => t.id === teacherId);
        if (teacherIndex !== -1) {
          this.teachers[teacherIndex].assignedClasses = 
            this.teachers[teacherIndex].assignedClasses.filter(id => id !== classId);
          this.teachers[teacherIndex].stats.assignedClasses = 
            this.teachers[teacherIndex].assignedClasses.length;
          
          // Update active/deactivated lists
          this.init();
          
          // Update current teacher if it's the one being modified
          if (this.currentTeacher && this.currentTeacher.id === teacherId) {
            this.currentTeacher = this.teachers[teacherIndex];
          }
          
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error unassigning class from teacher:', error);
        return false;
      }
    },
    
    // Assign a VR experience to a teacher
    async assignExperience(teacherId: string, experienceId: string) {
      try {
        // In a real app, this would be an API call
        // await api.post(`/teachers/${teacherId}/experiences`, { experienceId });
        
        // Update local state
        const teacherIndex = this.teachers.findIndex(t => t.id === teacherId);
        if (teacherIndex !== -1) {
          // Only add the experience if it's not already assigned
          if (!this.teachers[teacherIndex].assignedExperiences.includes(experienceId)) {
            this.teachers[teacherIndex].assignedExperiences.push(experienceId);
            this.teachers[teacherIndex].stats.assignedExperiences = 
              this.teachers[teacherIndex].assignedExperiences.length;
            
            // Update active/deactivated lists
            this.init();
            
            // Update current teacher if it's the one being modified
            if (this.currentTeacher && this.currentTeacher.id === teacherId) {
              this.currentTeacher = this.teachers[teacherIndex];
            }
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error assigning experience to teacher:', error);
        return false;
      }
    },
    
    // Unassign a VR experience from a teacher
    async unassignExperience(teacherId: string, experienceId: string) {
      try {
        // In a real app, this would be an API call
        // await api.delete(`/teachers/${teacherId}/experiences/${experienceId}`);
        
        // Update local state
        const teacherIndex = this.teachers.findIndex(t => t.id === teacherId);
        if (teacherIndex !== -1) {
          this.teachers[teacherIndex].assignedExperiences = 
            this.teachers[teacherIndex].assignedExperiences.filter(id => id !== experienceId);
          this.teachers[teacherIndex].stats.assignedExperiences = 
            this.teachers[teacherIndex].assignedExperiences.length;
          
          // Update active/deactivated lists
          this.init();
          
          // Update current teacher if it's the one being modified
          if (this.currentTeacher && this.currentTeacher.id === teacherId) {
            this.currentTeacher = this.teachers[teacherIndex];
          }
          
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error unassigning experience from teacher:', error);
        return false;
      }
    },
    
    // Create a new teacher (admin function)
    async createTeacher(teacherData: Partial<Teacher>) {
      try {
        // In a real app, this would be an API call
        // const response = await api.post('/teachers', teacherData);
        // const newTeacher = response.data;
        
        // For now, create a new teacher locally
        const newTeacher: Teacher = {
          id: `t${(this.teachers.length + 1).toString().padStart(3, '0')}`,
          name: teacherData.name || '',
          email: teacherData.email || '',
          subject: teacherData.subject || '',
          assignedClasses: teacherData.assignedClasses || [],
          assignedExperiences: teacherData.assignedExperiences || [],
          stats: teacherData.stats || {
            assignedClasses: 0,
            numberOfStudents: 0,
            assignedExperiences: 0,
            averageStudentsScore: 0,
            averageStudentsCompletion: 0,
            averageTimePerExperience: '0 minutes'
          },
          isActive: teacherData.isActive !== undefined ? teacherData.isActive : true
        };
        
        this.teachers.push(newTeacher);
        
        // Update active/deactivated lists
        this.init();
        
        return newTeacher;
      } catch (error) {
        console.error('Error creating teacher:', error);
        return null;
      }
    },
    
    // Update a teacher (admin function)
    async updateTeacher(teacherId: string, data: Partial<Teacher>) {
      try {
        // In a real app, this would be an API call
        // await api.put(`/teachers/${teacherId}`, data);
        
        // Update local state
        const teacherIndex = this.teachers.findIndex(t => t.id === teacherId);
        if (teacherIndex !== -1) {
          this.teachers[teacherIndex] = {
            ...this.teachers[teacherIndex],
            ...data
          };
          
          // Update active/deactivated lists
          this.init();
          
          // Update current teacher if it's the one being modified
          if (this.currentTeacher && this.currentTeacher.id === teacherId) {
            this.currentTeacher = this.teachers[teacherIndex];
          }
          
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error updating teacher:', error);
        return false;
      }
    },
    
    // Deactivate a teacher (admin function)
    async deactivateTeacher(teacherId: string) {
      try {
        // In a real app, this would be an API call
        // await api.put(`/teachers/${teacherId}/deactivate`);
        
        // Update local state
        const teacherIndex = this.teachers.findIndex(t => t.id === teacherId);
        if (teacherIndex !== -1) {
          this.teachers[teacherIndex].isActive = false;
          
          // Clear assignments when deactivating
          this.teachers[teacherIndex].assignedClasses = [];
          this.teachers[teacherIndex].assignedExperiences = [];
          this.teachers[teacherIndex].stats = {
            assignedClasses: 0,
            numberOfStudents: 0,
            assignedExperiences: 0,
            averageStudentsScore: 0,
            averageStudentsCompletion: 0,
            averageTimePerExperience: '0 minutes'
          };
          
          // Update active/deactivated lists
          this.init();
          
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error deactivating teacher:', error);
        return false;
      }
    },
    
    // Activate a teacher (admin function)
    async activateTeacher(teacherId: string) {
      try {
        // In a real app, this would be an API call
        // await api.put(`/teachers/${teacherId}/activate`);
        
        // Update local state
        const teacherIndex = this.teachers.findIndex(t => t.id === teacherId);
        if (teacherIndex !== -1) {
          this.teachers[teacherIndex].isActive = true;
          
          // Update active/deactivated lists
          this.init();
          
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error activating teacher:', error);
        return false;
      }
    },
    
    // Set search query
    setSearchQuery(query: string) {
      this.searchQuery = query;
    }
  }
});