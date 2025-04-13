import { defineStore } from 'pinia';

interface User {
  id: string;
  name: string;
  type: 'student' | 'teacher' | 'admin';
  avatar?: string;
}

interface AdminUser extends User {
  permissions: string[];  // Admin-specific permissions
}

interface AuthState {
  user: User | AdminUser | null;
  authenticated: boolean;
  notificationCount: number;
  userType: 'student' | 'teacher' | 'admin';
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: {
      id: 'a001',
      name: 'Khalid Abu Eid',
      type: 'admin',
      avatar: '/avatars/admin.png',
      permissions: ['manage_teachers', 'manage_students', 'manage_experiences', 'view_stats']
    } as AdminUser,
    authenticated: true,
    notificationCount: 2,
    userType: 'admin'
  }),
  
  getters: {
    isAdmin: (state) => state.userType === 'admin',
    hasPermission: (state) => (permission: string) => {
      if (state.userType !== 'admin') return false;
      const adminUser = state.user as AdminUser;
      return adminUser.permissions.includes(permission);
    }
  },
  
  actions: {
    login(credentials: { username: string; password: string }) {
      // This would normally make an API call
      this.authenticated = true;
      this.user = {
        id: 'a001',
        name: 'Khalid Abu Eid',
        type: 'admin',
        permissions: ['manage_teachers', 'manage_students', 'manage_experiences', 'view_stats']
      } as AdminUser;
      this.userType = 'admin';
    },
    
    logout() {
      this.authenticated = false;
      this.user = null;
      this.userType = 'student'; // Reset to default
    },
    
    updateNotificationCount(count: number) {
      this.notificationCount = count;
    },
    
    markNotificationsAsRead() {
      this.notificationCount = 0;
    },
    
    checkPermission(permission: string): boolean {
      if (this.userType !== 'admin') return false;
      const adminUser = this.user as AdminUser;
      return adminUser.permissions.includes(permission);
    }
  }
});