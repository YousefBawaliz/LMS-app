import { defineStore } from 'pinia';

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

interface ClassesState {
  classes: Class[];
  loading: boolean;
  currentClass: Class | null;
}

export const useClassesStore = defineStore('classes', {
  state: (): ClassesState => ({
    classes: [
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
        ]
      },
      {
        id: 'class002',
        name: '9B',
        studentCount: 26,
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
        ]
      },
      {
        id: 'class003',
        name: '9C',
        studentCount: 26,
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
        ]
      }
    ],
    loading: false,
    currentClass: null
  }),
  
  actions: {
    fetchClasses() {
      this.loading = true;
      // Simulate API delay
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    
    fetchClassById(id: string) {
      this.loading = true;
      // Simulate API delay
      setTimeout(() => {
        this.currentClass = this.classes.find(cls => cls.id === id) || null;
        this.loading = false;
      }, 300);
    }
  }
});
