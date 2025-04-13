import { defineStore } from 'pinia';

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

interface VRExperiencesState {
  experiences: VRExperience[];
  loading: boolean;
  currentExperience: VRExperience | null;
}

export const useVRExperiencesStore = defineStore('vrExperiences', {
  state: (): VRExperiencesState => ({
    experiences: [
      {
        id: 'exp001',
        title: 'Atomic Bonds',
        duration: '8min',
        avgGlobalScore: 92,
        avgClassesScore: 97,
        classAssignments: 3,
        thumbnail: '/thumbnails/atomic-bonds.png',
        status: 'active'
      },
      {
        id: 'exp002',
        title: 'Nobel Gasses',
        duration: '6min',
        avgGlobalScore: 72,
        avgClassesScore: 87,
        classAssignments: 3,
        thumbnail: '/thumbnails/nobel-gasses.png',
        status: 'active'
      },
      {
        id: 'exp003',
        title: 'Chemical Reactions I',
        duration: '20min',
        avgGlobalScore: 88,
        avgClassesScore: 89,
        classAssignments: 2,
        thumbnail: '/thumbnails/chemical-reactions.png',
        status: 'active'
      },
      {
        id: 'exp004',
        title: 'Atomic Bond Types',
        duration: '15min',
        avgGlobalScore: 81,
        avgClassesScore: 85,
        classAssignments: 2,
        thumbnail: '/thumbnails/atomic-bond-types.png',
        status: 'upcoming'
      },
      {
        id: 'exp005',
        title: 'Chemical Reactions II',
        duration: '25min',
        avgGlobalScore: 76,
        avgClassesScore: 79,
        classAssignments: 1,
        thumbnail: '/thumbnails/chemical-reactions-2.png',
        status: 'upcoming'
      }
    ],
    loading: false,
    currentExperience: null
  }),
  
  actions: {
    fetchExperiences() {
      // This would normally make an API call
      this.loading = true;
      // Simulate API delay
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    
    fetchExperienceById(id: string) {
      this.loading = true;
      // Simulate API delay
      setTimeout(() => {
        this.currentExperience = this.experiences.find(exp => exp.id === id) || null;
        this.loading = false;
      }, 300);
    }
  }
});