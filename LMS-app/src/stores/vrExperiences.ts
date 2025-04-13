import { defineStore } from 'pinia';
// import api from '../services/api';

export interface VRExperience {
  id: string;
  title: string;
  duration: string;
  avgGlobalScore: number;
  avgClassesScore: number;
  classAssignments: number;
  thumbnail?: string;
  status?: 'active' | 'completed' | 'upcoming';
}

interface VRExperienceStats {
  studentsAssigned: number;
  completionRate: number;
  scoreDistribution: Record<string, number>; // Range buckets like "0-50", "50-59"
}

interface TeacherAssignment {
  teacherName: string;
  teacherId: string;
  assignedClasses: string[];
}

export interface VRExperienceExtended extends VRExperience {
  description: string;
  category: string;
  stats: VRExperienceStats;
  teacherAssignments: TeacherAssignment[];
}

interface VRExperiencesState {
  experiences: VRExperienceExtended[];
  categories: string[];
  currentExperience: VRExperienceExtended | null;
  loading: boolean;
  filters: {
    category: string;
    searchQuery: string;
  };
}

export const useVRExperiencesStore = defineStore('vrExperiences', {
  state: (): VRExperiencesState => ({
    experiences: [
      // Sample extended data for admin interface
      {
        id: 'exp001',
        title: 'Atomic Bonds',
        duration: '8min',
        avgGlobalScore: 92,
        avgClassesScore: 97,
        classAssignments: 3,
        thumbnail: '/thumbnails/atomic-bonds.png',
        status: 'active',
        description: 'Learn about atomic bonds in this immersive VR experience. Students will explore different types of chemical bonds and how they work on an atomic level.',
        category: 'Chemistry',
        stats: {
          studentsAssigned: 72,
          completionRate: 95,
          scoreDistribution: {
            '0-50': 0,
            '50-59': 2,
            '60-69': 5,
            '70-79': 10,
            '80-89': 15,
            '90-100': 40
          }
        },
        teacherAssignments: [
          { 
            teacherName: 'Sarah Silvergold', 
            teacherId: 't001',
            assignedClasses: ['9A', '9B', '9C'] 
          }
        ]
      },
      {
        id: 'exp002',
        title: 'Nobel Gasses',
        duration: '6min',
        avgGlobalScore: 85,
        avgClassesScore: 87,
        classAssignments: 3,
        thumbnail: '/thumbnails/nobel-gasses.png',
        status: 'active',
        description: 'Explore the properties of nobel gasses in this interactive VR environment. Students will learn about the properties of nobel gasses and why they are so stable.',
        category: 'Chemistry',
        stats: {
          studentsAssigned: 68,
          completionRate: 92,
          scoreDistribution: {
            '0-50': 2,
            '50-59': 3,
            '60-69': 8,
            '70-79': 15,
            '80-89': 25,
            '90-100': 15
          }
        },
        teacherAssignments: [
          { 
            teacherName: 'Sarah Silvergold', 
            teacherId: 't001',
            assignedClasses: ['9A', '9B', '9C'] 
          }
        ]
      },
      {
        id: 'exp003',
        title: 'Chemical Reactions I',
        duration: '20min',
        avgGlobalScore: 88,
        avgClassesScore: 89,
        classAssignments: 2,
        thumbnail: '/thumbnails/chemical-reactions.png',
        status: 'active',
        description: 'Watch and interact with various chemical reactions in virtual reality. This experience allows students to safely view and learn about chemical reactions.',
        category: 'Chemistry',
        stats: {
          studentsAssigned: 48,
          completionRate: 90,
          scoreDistribution: {
            '0-50': 1,
            '50-59': 2,
            '60-69': 5,
            '70-79': 10,
            '80-89': 20,
            '90-100': 10
          }
        },
        teacherAssignments: [
          { 
            teacherName: 'Sarah Silvergold', 
            teacherId: 't001',
            assignedClasses: ['9A', '9B'] 
          }
        ]
      },
      {
        id: 'exp004',
        title: 'Gravity VR Experience',
        duration: '15min',
        avgGlobalScore: 81,
        avgClassesScore: 85,
        classAssignments: 2,
        thumbnail: '/thumbnails/gravity.png',
        status: 'active',
        description: 'Experience the effects of gravity in different environments. Students can see how gravity works on Earth, the Moon, and other planets.',
        category: 'Physics',
        stats: {
          studentsAssigned: 62,
          completionRate: 73,
          scoreDistribution: {
            '0-50': 5,
            '50-59': 7,
            '60-69': 10,
            '70-79': 20,
            '80-89': 15,
            '90-100': 5
          }
        },
        teacherAssignments: [
          { 
            teacherName: 'Michael Jones', 
            teacherId: 't002',
            assignedClasses: ['10A'] 
          }
        ]
      },
      {
        id: 'exp005',
        title: 'Atoms VR Experience',
        duration: '10min',
        avgGlobalScore: 76,
        avgClassesScore: 79,
        classAssignments: 1,
        thumbnail: '/thumbnails/atoms.png',
        status: 'active',
        description: 'Zoom in to the atomic level and see the structure of atoms. Students will learn about protons, neutrons, electrons, and how they make up the atom.',
        category: 'Physics',
        stats: {
          studentsAssigned: 26,
          completionRate: 88,
          scoreDistribution: {
            '0-50': 2,
            '50-59': 3,
            '60-69': 5,
            '70-79': 8,
            '80-89': 5,
            '90-100': 3
          }
        },
        teacherAssignments: [
          { 
            teacherName: 'Michael Jones', 
            teacherId: 't002',
            assignedClasses: ['10B'] 
          }
        ]
      },
      {
        id: 'exp006',
        title: 'Acceleration VR Experience',
        duration: '12min',
        avgGlobalScore: 82,
        avgClassesScore: 84,
        classAssignments: 1,
        thumbnail: '/thumbnails/acceleration.png',
        status: 'upcoming',
        description: 'Learn about acceleration in this interactive VR experience. Students will see how forces affect the acceleration of objects.',
        category: 'Physics',
        stats: {
          studentsAssigned: 0,
          completionRate: 0,
          scoreDistribution: {
            '0-50': 0,
            '50-59': 0,
            '60-69': 0,
            '70-79': 0,
            '80-89': 0,
            '90-100': 0
          }
        },
        teacherAssignments: []
      },
      {
        id: 'exp007',
        title: 'Orbits VR Experience',
        duration: '18min',
        avgGlobalScore: 0,
        avgClassesScore: 0,
        classAssignments: 0,
        thumbnail: '/thumbnails/orbits.png',
        status: 'upcoming',
        description: 'Explore planetary orbits and gravitational effects in this immersive experience. Students will learn about the solar system and how gravity keeps planets in orbit.',
        category: 'Physics',
        stats: {
          studentsAssigned: 0,
          completionRate: 0,
          scoreDistribution: {
            '0-50': 0,
            '50-59': 0,
            '60-69': 0,
            '70-79': 0,
            '80-89': 0,
            '90-100': 0
          }
        },
        teacherAssignments: []
      }
    ],
    categories: ['Chemistry', 'Physics', 'Biology', 'Math', 'Medical'],
    currentExperience: null,
    loading: false,
    filters: {
      category: '',
      searchQuery: ''
    }
  }),
  
  getters: {
    // Get experiences by category
    getExperiencesByCategory: (state) => (category: string) => {
      return state.experiences.filter(exp => exp.category === category);
    },
    
    // Get experiences by teacher
    getExperiencesByTeacher: (state) => (teacherId: string) => {
      return state.experiences.filter(exp => 
        exp.teacherAssignments.some(assignment => assignment.teacherId === teacherId)
      );
    },
    
    // Get experiences by class
    getExperiencesByClass: (state) => (classId: string) => {
      return state.experiences.filter(exp => 
        exp.teacherAssignments.some(assignment => 
          assignment.assignedClasses.includes(classId)
        )
      );
    },
    
    // Filtered experiences based on filters
    filteredExperiences: (state) => {
      let result = [...state.experiences];
      
      // Apply category filter
      if (state.filters.category) {
        result = result.filter(exp => exp.category === state.filters.category);
      }
      
      // Apply search query
      if (state.filters.searchQuery.trim()) {
        const query = state.filters.searchQuery.toLowerCase();
        result = result.filter(exp => 
          exp.title.toLowerCase().includes(query) || 
          exp.description.toLowerCase().includes(query)
        );
      }
      
      return result;
    },
    
    // Get active experiences
    activeExperiences: (state) => {
      return state.experiences.filter(exp => exp.status === 'active');
    },
    
    // Get upcoming experiences
    upcomingExperiences: (state) => {
      return state.experiences.filter(exp => exp.status === 'upcoming');
    }
  },
  
  actions: {
    // Fetch all experiences
    async fetchExperiences() {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        // const response = await api.get('/vr-experiences');
        // this.experiences = response.data;
        
        // For now, we'll just use the sample data
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        this.loading = false;
      }
    },
    
    // Fetch a specific experience by ID
    async fetchExperienceById(id: string) {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        // const response = await api.get(`/vr-experiences/${id}`);
        // this.currentExperience = response.data;
        
        // For now, find the experience in the sample data
        this.currentExperience = this.experiences.find(exp => exp.id === id) || null;
      } catch (error) {
        console.error('Error fetching experience:', error);
        this.currentExperience = null;
      } finally {
        this.loading = false;
      }
    },
    
    // Fetch experiences by category
    async fetchExperiencesByCategory(category: string) {
      this.loading = true;
      this.filters.category = category;
      
      try {
        // In a real app, this would be an API call
        // const response = await api.get(`/vr-experiences/category/${category}`);
        // return response.data;
        
        // For now, filter the sample data
        return this.getExperiencesByCategory(category);
      } catch (error) {
        console.error('Error fetching experiences by category:', error);
        return [];
      } finally {
        this.loading = false;
      }
    },
    
    // Create a new experience (admin function)
    async createExperience(experienceData: Partial<VRExperienceExtended>) {
      try {
        // In a real app, this would be an API call
        // const response = await api.post('/vr-experiences', experienceData);
        // const newExperience = response.data;
        
        // For now, create a new experience locally
        const newExperience: VRExperienceExtended = {
          id: `exp${(this.experiences.length + 1).toString().padStart(3, '0')}`,
          title: experienceData.title || '',
          duration: experienceData.duration || '0min',
          avgGlobalScore: experienceData.avgGlobalScore || 0,
          avgClassesScore: experienceData.avgClassesScore || 0,
          classAssignments: experienceData.classAssignments || 0,
          thumbnail: experienceData.thumbnail || '',
          status: experienceData.status || 'upcoming',
          description: experienceData.description || '',
          category: experienceData.category || '',
          stats: experienceData.stats || {
            studentsAssigned: 0,
            completionRate: 0,
            scoreDistribution: {
              '0-50': 0,
              '50-59': 0,
              '60-69': 0,
              '70-79': 0,
              '80-89': 0,
              '90-100': 0
            }
          },
          teacherAssignments: experienceData.teacherAssignments || []
        };
        
        this.experiences.push(newExperience);
        return newExperience;
      } catch (error) {
        console.error('Error creating experience:', error);
        return null;
      }
    },
    
    // Update an experience (admin function)
    async updateExperience(id: string, data: Partial<VRExperienceExtended>) {
      try {
        // In a real app, this would be an API call
        // await api.put(`/vr-experiences/${id}`, data);
        
        // Update local state
        const experienceIndex = this.experiences.findIndex(exp => exp.id === id);
        if (experienceIndex !== -1) {
          this.experiences[experienceIndex] = {
            ...this.experiences[experienceIndex],
            ...data
          };
          
          // Update current experience if it's the one being modified
          if (this.currentExperience && this.currentExperience.id === id) {
            this.currentExperience = this.experiences[experienceIndex];
          }
          
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error updating experience:', error);
        return false;
      }
    },
    
    // Delete an experience (admin function)
    async deleteExperience(id: string) {
      try {
        // In a real app, this would be an API call
        // await api.delete(`/vr-experiences/${id}`);
        
        // Update local state
        this.experiences = this.experiences.filter(exp => exp.id !== id);
        
        // Reset current experience if it's the one being deleted
        if (this.currentExperience && this.currentExperience.id === id) {
          this.currentExperience = null;
        }
        
        return true;
      } catch (error) {
        console.error('Error deleting experience:', error);
        return false;
      }
    },
    
    // Assign an experience to a teacher (admin function)
    async assignExperienceToTeacher(experienceId: string, teacherId: string, teacherName: string) {
      try {
        // In a real app, this would be an API call
        // await api.post(`/vr-experiences/${experienceId}/teachers`, { teacherId });
        
        // Update local state
        const experienceIndex = this.experiences.findIndex(exp => exp.id === experienceId);
        if (experienceIndex !== -1) {
          // Check if teacher is already assigned
          const teacherIndex = this.experiences[experienceIndex].teacherAssignments
            .findIndex(assignment => assignment.teacherId === teacherId);
          
          if (teacherIndex === -1) {
            // Teacher not assigned, add new assignment
            this.experiences[experienceIndex].teacherAssignments.push({
              teacherId,
              teacherName,
              assignedClasses: []
            });
          }
          
          // Update current experience if it's the one being modified
          if (this.currentExperience && this.currentExperience.id === experienceId) {
            this.currentExperience = this.experiences[experienceIndex];
          }
          
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error assigning experience to teacher:', error);
        return false;
      }
    },
    
    // Unassign an experience from a teacher (admin function)
    async unassignExperienceFromTeacher(experienceId: string, teacherId: string) {
      try {
        // In a real app, this would be an API call
        // await api.delete(`/vr-experiences/${experienceId}/teachers/${teacherId}`);
        
        // Update local state
        const experienceIndex = this.experiences.findIndex(exp => exp.id === experienceId);
        if (experienceIndex !== -1) {
          this.experiences[experienceIndex].teacherAssignments = 
            this.experiences[experienceIndex].teacherAssignments
              .filter(assignment => assignment.teacherId !== teacherId);
          
          // Update current experience if it's the one being modified
          if (this.currentExperience && this.currentExperience.id === experienceId) {
            this.currentExperience = this.experiences[experienceIndex];
          }
          
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error unassigning experience from teacher:', error);
        return false;
      }
    },
    
    // Assign a class to a teacher's experience assignment (admin function)
    async assignClassToTeacherExperience(experienceId: string, teacherId: string, classId: string) {
      try {
        // In a real app, this would be an API call
        // await api.post(`/vr-experiences/${experienceId}/teachers/${teacherId}/classes`, { classId });
        
        // Update local state
        const experienceIndex = this.experiences.findIndex(exp => exp.id === experienceId);
        if (experienceIndex !== -1) {
          const teacherAssignmentIndex = this.experiences[experienceIndex].teacherAssignments
            .findIndex(assignment => assignment.teacherId === teacherId);
          
          if (teacherAssignmentIndex !== -1) {
            // Teacher is assigned to this experience
            const assignment = this.experiences[experienceIndex].teacherAssignments[teacherAssignmentIndex];
            
            // Only add the class if it's not already assigned
            if (!assignment.assignedClasses.includes(classId)) {
              assignment.assignedClasses.push(classId);
              
              // Update class assignments count
              this.experiences[experienceIndex].classAssignments = 
                this.experiences[experienceIndex].teacherAssignments.reduce(
                  (total, assignment) => total + assignment.assignedClasses.length, 
                  0
                );
              
              // Update current experience if it's the one being modified
              if (this.currentExperience && this.currentExperience.id === experienceId) {
                this.currentExperience = this.experiences[experienceIndex];
              }
            }
            
            return true;
          }
        }
        return false;
      } catch (error) {
        console.error('Error assigning class to teacher experience:', error);
        return false;
      }
    },
    
    // Get comprehensive stats for an experience (admin function)
    async getExperienceStats(experienceId: string, classId?: string) {
      try {
        // In a real app, this would be an API call
        // const params = classId ? { classId } : {};
        // const response = await api.get(`/vr-experiences/${experienceId}/stats`, { params });
        // return response.data;
        
        // For now, return the stats from the sample data
        const experience = this.experiences.find(exp => exp.id === experienceId);
        if (!experience) {
          throw new Error(`Experience with ID ${experienceId} not found`);
        }
        
        // If classId is provided, we would filter the stats for that class
        // For now, we'll just return the overall stats
        return experience.stats;
      } catch (error) {
        console.error('Error fetching experience stats:', error);
        return null;
      }
    },
    
    // Set filters
    setCategoryFilter(category: string) {
      this.filters.category = category;
    },
    
    setSearchQuery(query: string) {
      this.filters.searchQuery = query;
    },
    
    resetFilters() {
      this.filters = {
        category: '',
        searchQuery: ''
      };
    }
  }
});