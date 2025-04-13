import { defineStore } from 'pinia';

interface User {
  id: string;
  name: string;
  type: 'student' | 'teacher' | 'admin';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  authenticated: boolean;
  notificationCount: number;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: {
      id: 't001',
      name: 'Khalid Abu Eid',
      type: 'teacher',
      avatar: '/avatars/teacher.png'
    },
    authenticated: true,
    notificationCount: 2
  }),
  
  actions: {
    login(credentials: { username: string; password: string }) {
      // This would normally make an API call
      this.authenticated = true;
      this.user = {
        id: 't001',
        name: 'Khalid Abu Eid',
        type: 'teacher'
      };
    },
    
    logout() {
      this.authenticated = false;
      this.user = null;
    }
  }
});